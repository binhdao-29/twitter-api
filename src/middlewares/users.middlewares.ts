import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const loginValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
    },
    isEmail: true,
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({ email: value })
        if (user === null) {
          throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
        }

        req.user = user
        return true
      }
    }
  },
  password: {
    isString: {
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING
    },
    isLength: {
      options: { min: 6, max: 50 }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0
      }
    },
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  }
})

export const registerValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.NAME_MUST_BE_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim: true
  },
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
    },
    isEmail: true,
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await usersService.checkEmailExists(value)
        if (isExistEmail) {
          throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
        }
        return true
      }
    }
  },
  password: {
    isString: {
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING
    },
    isLength: {
      options: { min: 6, max: 50 }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0
      }
    },
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  },
  confirm_password: {
    isString: {
      errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRING
    },
    isLength: {
      options: { min: 6, max: 50 }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0
      }
    },
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED,
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match')
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
