import Joi from 'joi'

interface UserData {
  name: string
  email: string
  password: string
}

export const validateUser = (data: UserData) => {
  const schema = Joi.object({
    // Name should not contain numbers, special characters, and must be up to 255 characters
    name: Joi.string()
      .pattern(/^[a-zA-Z\s]{1,255}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Name can only contain letters and spaces, and must not include numbers or special characters.',
        'string.max': 'Name cannot exceed 255 characters.'
      }),

    // Valid email format
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format.',
      'string.empty': 'Email cannot be empty.'
    }),

    // Password must be at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Password must be at least 8 characters long, including at least 1 uppercase letter, 1 number, and 1 special character.',
        'string.empty': 'Password cannot be empty.'
      })
  })

  return schema.validate(data)
}
