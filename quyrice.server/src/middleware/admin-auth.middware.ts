import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/entities/auth/user.entity'

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]
  let decoded: any

  if (!token) {
    res.sendStatus(401)
    return
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string)
  } catch (err) {
    res.sendStatus(403)
    return
  }

  const idUser = decoded?.idUser as string

  try {
    const user = await User.findById(idUser)

    if (!user) {
      res.sendStatus(404)
      return
    }
    next()
  } catch (err) {
    res.sendStatus(500)
    return
  }
}
