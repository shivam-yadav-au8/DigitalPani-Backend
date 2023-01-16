export interface RegisterDTO {
  name: string;
  email: string;
  role: string;
  department: string;
  password: string;
  created_at: Date;
}
export interface TicketDTO {
  reporter: string;
  reporter_id: string;
  asignee: string;
  asignee_id: string;
  title: string;
  department: string;
  description: string;
  priority: string;
  progress: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}
export interface UpdateTicketDTO {
  progress: string;
  priority: string;
  id: string;
}
export interface RegisterVerifyDTO {
  email: string;
  password: string;
}

export interface DepartmentDTO {
  department: string;
}
export interface CheckRegisterDTO {
  email: string;
  phone_no: string;
}
