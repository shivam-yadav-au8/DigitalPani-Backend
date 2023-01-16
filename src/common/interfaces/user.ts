import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  role: string;
  department: string;
  password: string;
}

export interface Ticket extends Document {
  reporter: string;
  reporter_id: string;
  asignee: string;
  asignee_id: string;
  title: string;
  email: string;
  role: string;
  department: string;
  description: string;
  priority: string;
  start_date: Date;
  end_date: Date;
}