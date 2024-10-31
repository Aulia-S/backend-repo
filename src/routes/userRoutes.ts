import { Router } from 'express'
import { fetchUserData, updateUserData } from '../controllers/userController'
import { checkAuth } from '../middleware/authMiddleware'

const router = Router()

router.get('/fetch-user-data', checkAuth, fetchUserData)
router.put('/update-user-data', checkAuth, updateUserData)

export default router
