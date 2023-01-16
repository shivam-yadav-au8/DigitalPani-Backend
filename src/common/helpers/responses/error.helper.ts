export const registration_error = {
  fail_reg: {
    status: 400,
    msg: 'User already registered',
    msg_code: 101,
  },
  not_found_user: {
    status: 400,
    msg: 'User doesnt exist',
    msg_code: 102,
  },
};
export const login_error = {
  invalid_cred: {
    status: 401,
    msg: 'Invalid creds',
    msg_code: 103,
  },
};
export const reset_password_error = {
  reset_password_error: {
    status: 400,
    msg: 'Error occured while updating password',
    msg_code: 119,
  },
  user_not_registered: {
    status: 400,
    msg: 'No user found with these credentials',
    msg_code: 120,
  },
};
export const ticket = {
  failed_to_create_ticket: {
    status: 400,
    msg: 'Failed to create ticket',
    msg_code: 120,
  },
  failed_to_delete_ticket: {
    status: 400,
    msg: 'Failed to delete the ticket',
    msg_code: 121,
  },
  failed_to_get_ticket: {
    status: 400,
    msg: 'No tickets exist',
    msg_code: 123,
  },
  failed_to_update_ticket: {
    status: 400,
    msg: 'Failed to update ticket',
    msg_code: 124,
  },
};
export const user_by_department = {
  failed_to_get_user: {
    status: 400,
    msg: 'No user exist in the current department',
    masg_code: 122,
  },
};
export const not_authorised = {
  not_authorised_user: {
    status: 400,
    msg: 'Not_authorised',
    masg_code: 123,
  },
};