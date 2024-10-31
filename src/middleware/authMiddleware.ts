import { Request, Response, NextFunction } from 'express'
import { verifyIdToken } from '../config/firebaseAdmin'
import { User } from '../types/User'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | User
    }
  }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized: No token provided' })
    return
  }

  const idToken = authHeader.split(' ')[1]
  if (!idToken) {
    res.status(401).json({ message: 'Unauthorized: No token provided' })
    return
  }

  try {
    const decodedToken = await verifyIdToken(idToken)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}
