import express, { Request, Response } from 'express'
import authRoute from './routes/auth.router'
import mainRouter from './routes/index'
const app = express()

app.use(express.json())

app.get('/rice-store', (req: Request, res: Response) => {
  res.send('Wellcome to my Rice Store!')
})

app.use('/api', mainRouter)

export default app
