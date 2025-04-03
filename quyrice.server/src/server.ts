import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'
dotenv.config()

const server = async () => {
  const PORT = process.env.PORT || 1901

  try {
    connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

server()
