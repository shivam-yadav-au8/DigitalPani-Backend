import * as mongoose from 'mongoose';
import { HookNextFunction } from 'src/common/interfaces/hookNextFunction.interface';
export const TicketSchema = new mongoose.Schema({
  reporter: { type: String, required: true },
  reporter_id: { type: String, required: true },
  assignee: { type: String, unique: true, required: true },
  assignee_id: { type: String, required: false },
  department: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, default: 'medium', required: true },
  progress: {
    type: String,
    default: 'incomplete',
    required: true,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

TicketSchema.pre('save', async function (next: HookNextFunction) {
  return next();
});
