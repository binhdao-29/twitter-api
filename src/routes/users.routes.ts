import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  loginValidator,
  accessTokenValidator,
  registerValidator,
  refreshTokenValidator,
  emailVerifyTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'

const userRoute = Router()

userRoute.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
userRoute.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
userRoute.post(
  '/logout',
  validate(accessTokenValidator),
  validate(refreshTokenValidator),
  wrapRequestHandler(logoutController)
)
userRoute.post('/verify-email', validate(emailVerifyTokenValidator), wrapRequestHandler(verifyEmailController))

export default userRoute
