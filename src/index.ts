import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import userRoute from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()
app.use(express.json())

databaseService.connect()

app.use('/users', userRoute)

app.use(defaultErrorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`)
})
