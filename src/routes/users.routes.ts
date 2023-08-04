import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'

const userRoute = Router()

userRoute.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
userRoute.post('/register', validate(registerValidator), wrapRequestHandler(registerController))

export default userRoute
