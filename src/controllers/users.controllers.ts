import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'

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
