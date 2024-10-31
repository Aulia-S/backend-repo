import express from 'express'
import { VercelRequest, VercelResponse } from '@vercel/node'
import userRoutes from '../src/routes/userRoutes'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(userRoutes)

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res)
}
