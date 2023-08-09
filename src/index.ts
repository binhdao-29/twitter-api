import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import userRoute from './routes/users.routes'
import databaseService from './services/database.services'
import { config } from 'dotenv'

config()

const app = express()
app.use(express.json())

databaseService.connect()

app.use('/users', userRoute)

app.use(defaultErrorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`)
})
