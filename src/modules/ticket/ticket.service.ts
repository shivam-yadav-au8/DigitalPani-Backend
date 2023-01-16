import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, User } from '../../common/interfaces/user';
import { Model } from 'mongoose';
import { ticket } from '../../common/helpers/responses/error.helper';
import { ticket_success } from '../../common/helpers/responses/success.helper';
@Injectable()
export class TicketService {
  constructor(
    @InjectModel('Ticket') private userTicket: Model<Ticket>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async createTicket(ticketDTO) {
    const { assignee } = ticketDTO;
    if (assignee === 'unassigned') {
      const result = await this.searchByTicketCount();
      const l = Object.values(result).length;
      const key: any = Object.entries(result[l - 1]);
      const id: string = key[0][1].trim();
      const assignee_new = await this.userModel.findOne({ assignee_id: id });
      ticketDTO.asignee_id = id;
      ticketDTO.assignee = assignee_new.name;
      const firstDay = new Date();
      const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
      ticketDTO.end_date = nextWeek;
      const createdTicket = new this.userTicket(ticketDTO);
      try {
        await createdTicket.save();
        return ticket_success.ticket_created;
      } catch (err) {
        return ticket.failed_to_create_ticket;
      }
    } else {
      const createdTicket = new this.userTicket(ticketDTO);
      await createdTicket.save();
      try {
        await createdTicket.save();
        return ticket_success.ticket_created;
      } catch (err) {
        return ticket.failed_to_create_ticket;
      }
    }
  }
  async auto_assign() {
    const firstDay = new Date();
    const currentDay = new Date(firstDay.getTime() + 24 * 60 * 60 * 1000);
    const missedTask = await this.userTicket.findOne({
      end_date: { $gt: currentDay },
    });
    const idd = missedTask._id.valueOf();
    const result = await this.searchByTicketCount();
    const l = Object.values(result).length;
    const key: any = Object.entries(result[l - 1]);
    const id: string = key[0][1].trim();
    const assignee_new = await this.userModel.findOne({ assignee_id: id });
    console.log(assignee_new._id);
    const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    const new_ticket = await this.userTicket.findByIdAndUpdate(idd, {
      assignee_id: assignee_new._id.valueOf(),
      assignee: assignee_new.name,
      end_date: nextWeek,
    });
    if (new_ticket) {
      return ticket_success.ticket_created;
    }
    return ticket.failed_to_create_ticket;
  }
  async deleteTicket(ticket) {
    const { ticket_id } = ticket;
    console.log(ticket_id);
    return await this.userTicket
      .findByIdAndRemove(ticket_id)
      .then(() => {
        return ticket_success.ticket_deleted;
      })
      .catch((err) => {
        console.log(err);
        return ticket.failed_to_delete_ticket;
      });
  }
  async getTicket(id) {
    console.log(id);
    const tickets = await this.userTicket.find({
      $or: [{ reporter_id: { $eq: id } }, { asignee_id: { $eq: id } }],
    });
    if (tickets) {
      return tickets;
    }
    return ticket.failed_to_get_ticket;
  }
  async updateTicket(updateData) {
    const { progress, priority, id } = updateData;
    console.log(updateData);
    const response = await this.userTicket.findOneAndUpdate(
      { _id: id },
      { $set: { progress: progress, priority: priority } },
    );
    if (response) {
      return response;
    }
    return ticket.failed_to_update_ticket;
  }
  async searchByTicketCount() {
    const user = await this.userTicket.aggregate([
      {
        $sortByCount: '$assignee_id',
      },
    ]);
    if (user) {
      return user;
    } else {
      return { failed: 'failed' };
    }
  }
}
