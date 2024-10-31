import { Request, Response } from 'express'
import { auth } from '../config/firebaseAdmin'
import { User } from '../types/User'
import { error } from 'console'

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const uid = req?.user?.uid
    const userRecord = await auth.getUser(uid)

    const userData: User = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
    }

    res.json({ message: 'User data fetched successfully', user: userData })
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: 'Failed to fetch user data', error: errorMessage })
  }
}

export const updateUserData = async (req: Request, res: Response) => {
  const { displayName } = req.body

  if (!displayName) {
    res.status(422).json({
      message: 'Unprocessible content',
      errors: {
        displayName: 'Name is required',
      },
    })
    return
  }

  try {
    const uid = req?.user?.uid

    const updatedUserRecord = await auth.updateUser(uid, {
      displayName,
    })

    const updatedUser: User = {
      uid: updatedUserRecord.uid,
      email: updatedUserRecord.email,
      displayName: updatedUserRecord.displayName,
      photoURL: updatedUserRecord.photoURL,
    }

    res.json({ message: 'User data updated successfully', user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user data' })
  }
}
