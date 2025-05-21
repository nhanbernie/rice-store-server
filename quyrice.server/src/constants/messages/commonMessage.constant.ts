export const AUTH_FORM_MESSAGES = {
  ERROR: {
    EMF001: 'Invalid email format',
    EMF002: 'Email is required',
    EMF003: 'Password must be at least 12 characters',
    EMF004: 'Password is required',
    EMF005: 'Username must be at least 3 characters',
    EMF006: 'Username is required',
    EMF007: 'Passwords must match',
    EMF008: 'Confirm password is required',
    EMF009: 'Password must contain uppercase letters, numbers, and special characters',
    EMF010: 'Verification code must be 6 digits',
    EMF011: 'Invalid verification code format',
    EMF012: 'Verification code is required',
    EMF013: 'Old password is required',
    EMF014: 'New password is required',
    EMF015: 'New password must be different from current password',
    EMF016: 'Confirm password is required',
    EMF017: 'Passwords must match',
    EMF018: 'Your name is required',
    EMF019: 'Your message is required',
    EMF020: 'Email and password are required',
    EMF021: 'Invalid email or password'
  },
  SUCCESS: {
    SUF001: 'login successfully',
  }
}

export const { ERROR } = AUTH_FORM_MESSAGES
export const { SUCCESS } = AUTH_FORM_MESSAGES