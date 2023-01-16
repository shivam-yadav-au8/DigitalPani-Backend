import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.schema';
import { TicketSchema } from '../../models/ticket.schema';
import { UserController } from './user.controller';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Ticket', schema: TicketSchema },
    ]),
    TicketModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
