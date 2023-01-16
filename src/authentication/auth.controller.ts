import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  Headers,
} from '@nestjs/common';
import {
  RegisterDTO,
  TicketDTO,
  DepartmentDTO,
  UpdateTicketDTO,
  CheckRegisterDTO,
} from '../authentication/dto/register.dto';
import { UserService } from '../modules/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO, ResetPasswordDTO } from '../authentication/dto/login.dto';
import { registration_success } from '../common/helpers/responses/success.helper';
import { not_authorised } from '../common/helpers/responses/error.helper';
import {
  redis_set,
  redis_exp,
  redis_exists,
  redis_del,
  redis_get,
} from '../redis';
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    setInterval(() => {
      this.autoAssign();
    }, 1000*60*60);
  }
  async autoAssign() {
    return await this.userService.auto_assign();
  }
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO, @Res() res) {
    const { user, error } = await this.userService.create(registerDTO);
    if (error) {
      return res.status(200).send({
        response: error,
      });
    }
    const response = registration_success.succ_reg;
    return res.status(201).send({
      user,
      response,
    });
  }

  @Post('create_ticket')
  async create_ticket(
    @Headers() headers,
    @Body() ticketDTO: TicketDTO,
    @Res() res,
  ) {
    const validate = await this.authService.validateToken(headers);
    if (validate) {
      const response = await this.userService.createTicket(ticketDTO);
      return res.status(200).send({
        response,
      });
    } else {
      return res
        .status(200)
        .send({ respons: not_authorised.not_authorised_user });
    }
  }
  @Get('get_user_by_department')
  async get_user_by_department(@Headers() headers, @Res() res) {
    const validate = await this.authService.validateToken(headers);
    if (validate) {
      const response = await this.userService.searchByDepartment();
      return res.status(200).send({
        response: response,
      });
    } else {
      return res
        .status(200)
        .send({ respons: not_authorised.not_authorised_user });
    }
  }
  @Post('register_verify')
  async register_verify(
    @Headers() headers,
    @Body() checkRegister: CheckRegisterDTO,
    @Res() res,
  ) {
    console.log(checkRegister);
    const validate = await this.authService.validateToken(headers);
    if (validate) {
      const user = await this.userService.check_register(checkRegister);
      return res.status(200).send({
        response: user,
      });
    } else {
      return res
        .status(200)
        .send({ respons: not_authorised.not_authorised_user });
    }
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res() res) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user['email'],
    };
    const token = await this.authService.signPayload(payload);
    if (user.user) {
      return res.status(200).send({
        user_data: user,
        token,
      });
    } else {
      return res.status(200).send({
        user_data: user,
      });
    }
  }
  @Delete('delete_ticket')
  async delete_ticket(@Headers() headers, @Body() ticket_id, @Res() res) {
    const validate = await this.authService.validateToken(headers);
    if (validate) {
      console.log(ticket_id);
      const ticket = await this.userService.delete_ticket(ticket_id);
      return res.status(200).send({
        ticket,
      });
    } else {
      return res
        .status(200)
        .send({ respons: not_authorised.not_authorised_user });
    }
  }

  @Post('get_ticket')
  async get_ticket(
    @Headers() headers,
    @Body() reporterOrAsigneeId,
    @Res() res,
  ) {
    const validate = await this.authService.validateToken(headers);
    if (validate) {
      const { id } = reporterOrAsigneeId;
      const tickets = await this.userService.get_tickets(id);
      return res.status(200).send({ tickets });
    } else {
      return res
        .status(200)
        .send({ respons: not_authorised.not_authorised_user });
    }
  }
  @Post('update_ticket')
  async update_ticket(
    @Headers() headers,
    @Body() updateTicketDTO: UpdateTicketDTO,
    @Res() res,
  ) {
    const tickets = await this.userService.update_ticket(updateTicketDTO);
    return res.status(200).send({ tickets });
  }
  @Patch('reset_password')
  async reset_password(@Body() resetPasswordDTO: ResetPasswordDTO, @Res() res) {
    const user = await this.userService.resetPassword(resetPasswordDTO);
    return res.status(200).send({
      response: user,
    });
  }
}
