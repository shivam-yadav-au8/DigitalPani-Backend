import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSearchDTO } from 'src/common/dto/user-search';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('all')
  async acceptTerms(@Body() User: UserSearchDTO) {
    const user = await this.userService.getAllUserData(User);
    return user;
  }
}
