import express, { Request, Response } from 'express'
import authRoute from './routes/auth.router'
const app = express()

app.use(express.json())

app.get('/rice-store', (req: Request, res: Response) => {
  res.send('Wellcome to my Rice Store!')
})

app.use('/api/auth', authRoute)
export default app
