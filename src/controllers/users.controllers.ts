import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import databaseService from '~/services/database.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

export const loginController = async (req: any, res: Response) => {
  const { user } = req
  const { _id } = user
  const result = await usersService.login(_id.toString())
  return res.status(200).json({
    message: 'Success',
    result
  })
}

export const logoutController = async (req: any, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.status(200).json(result)
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  return res.status(200).json({
    message: 'Success',
    result
  })
}

export const verifyEmailController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  if (!user.email_verify_token) {
    return res.json({ message: USERS_MESSAGES.EMAIL_VERIFIED })
  }

  const result = await usersService.verifyEmail(user_id)

  return res.json({
    message: USERS_MESSAGES.VERIFY_EMAIL_SUCCESS,
    result
  })
}

export const resendVerifiedEmailController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_VERIFIED
    })
  }

  const result = await usersService.resendVerifyEmail(user_id)

  return res.json({
    message: USERS_MESSAGES.VERIFY_EMAIL_SUCCESS,
    result
  })
}
