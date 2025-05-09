import User from '../models/entities/auth/user.entity'
import bcrypt from 'bcrypt'

interface CreateUserInput {
  name: string
  email: string
  password: string
}
interface User {
  name: string
  email: string
  password: string
}

export const createUser = async (
  name: CreateUserInput['name'],
  email: CreateUserInput['email'],
  password: CreateUserInput['password']
): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    return newUser
  } catch (error) {
    throw new Error('Error creating user')
  }
}
