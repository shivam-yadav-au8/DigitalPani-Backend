import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketSchema } from '../../models/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ticket',
        schema: TicketSchema,
      },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
