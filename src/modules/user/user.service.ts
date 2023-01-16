import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../common/interfaces/user';
import {
  RegisterDTO,
  CheckRegisterDTO,
} from '../../authentication/dto/register.dto';
import { LoginDTO, ResetPasswordDTO } from '../../authentication/dto/login.dto';
import { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';
import { UserSearchDTO } from 'src/common/dto/user-search';
import {
  login_error,
  registration_error,
  reset_password_error,
  user_by_department,
} from '../../common/helpers/responses/error.helper';
import {
  login_success,
  reset_password_success,
} from 'src/common/helpers/responses/success.helper';
import {
  redis_exists,
  redis_del,
  redis_get,
  redis_exp,
  redis_set,
} from '../../redis';
import { TicketService } from '../ticket/ticket.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private ticketServie: TicketService,
  ) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({
      $or: [{ email: { $eq: email } }],
    });
    if (user) {
      return { user: null, error: registration_error.fail_reg };
    } else {
      const registeredTime = new Date();
      RegisterDTO.created_at = registeredTime;
      const createdUser = new this.userModel(RegisterDTO);
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    }
  }
  async createTicket(ticketDTO) {
    return await this.ticketServie.createTicket(ticketDTO);
  }
  async searchByDepartment() {
    const user = await this.userModel.aggregate([
      {
        $group: {
          _id: '$department',
          data: { $push: { name: '$name', role: '$role', id: '$_id' } },
        },
      },
    ]);
    if (user) {
      return user;
    } else {
      return user_by_department;
    }
  }
  async auto_assign() {
    return await this.ticketServie.auto_assign();
  }
  async resetPassword(ResetPasswordDTO: ResetPasswordDTO) {
    const { email, phone_no, password } = ResetPasswordDTO;
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(password, salt);
    const new_password = hashed;
    const user = await this.userModel.findOneAndUpdate(
      { $or: [{ email: { $eq: email } }, { phone_no: { $eq: phone_no } }] },
      { $set: { password: new_password } },
    );
    if (user) {
      return reset_password_success.reset_password_success;
    }
    return reset_password_error.reset_password_error;
  }
  async check_register(payload: CheckRegisterDTO) {
    const { phone_no, email } = payload;
    const user = await this.userModel.findOne({
      $or: [{ email: { $eq: email } }, { phone_no: { $eq: phone_no } }],
    });
    if (user) {
      return registration_error.fail_reg;
    } else {
      return registration_error.not_found_user;
    }
  }
  async findByPayload(payload: JWTPayload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({
      $or: [{ email: { $eq: email } }],
    });
    if (!user) {
      return { response: registration_error.not_found_user };
    } else {
      const check = await bcrypt.compareSync(password, user.password);
      if (check) {
        return {
          user: this.sanitizeUser(user),
          response: login_success.succ_login,
        };
      } else {
        return { response: login_error.invalid_cred };
      }
    }
  }

  async getAllUserData(User: UserSearchDTO) {
    const { email } = User;
    const userData = await this.userModel.findOne({ email });
    return userData;
  }
  async delete_ticket(ticket_id) {
    return await this.ticketServie.deleteTicket(ticket_id);
  }
  async get_tickets(id) {
    return await this.ticketServie.getTicket(id);
  }
  async update_ticket(updateData) {
    return await this.ticketServie.updateTicket(updateData);
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
