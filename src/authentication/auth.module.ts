import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from 'src/modules/user/user.controller';
import { TicketModule } from '../modules/ticket/ticket.module';

@Module({
  imports: [UserModule, TicketModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController, UserController],
  exports: [AuthService],
})
export class AuthModule {}
