export const registration_success = {
  succ_reg: {
    status: 201,
    msg: 'User registered Successfully',
    msg_code: 0o1,
  },
};
export const login_success = {
  succ_login: {
    status: 200,
    msg: 'User successfully logged In',
    msg_code: 0o2,
  },
};
export const email_verified_success = {
  email_verified: {
    status: 200,
    msg: 'Successfully verified email',
    msg_code: 0o3,
  },
  email_otp_created: {
    status: 201,
    msg: 'Successfully sent OTP to the email address',
    msg_code: 0o4,
  },
  email_otp_verified: {
    status: 200,
    msg: 'Email verified through OTP',
    msg_code: 0o5,
  },
};
export const reset_password_success = {
  reset_password_success: {
    status: 200,
    msg: 'Successfully updated password',
    msg_code: 0o11,
  },
};
export const ticket_success = {
  ticket_created: {
    status: 200,
    msg: 'Ticket created successfully',
    msg_code: 0o12,
  },
  ticket_deleted: {
    status: 200,
    msg: 'Ticket deleted successfully',
    msg_code: 0o13,
  },
};
