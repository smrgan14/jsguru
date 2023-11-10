import { Request, Response, NextFunction } from 'express';
import { IUser, UserModelSchema } from '../../model/user';
import { statuses } from '../../config/statuses';
import { ResponseBuilder } from '../../utils/response';

const Joi = require('joi');

const createUserValidationSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ][\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ -]+$/)
    .min(3)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.pattern.base': 'The First name is of type string and can contain the character -',
    }),
  lastName: Joi.string()
    .regex(/^[\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ][\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ -]+$/)
    .min(3)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.pattern.base': 'The Last name is of type string and can contain the character -',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9!ćĆčČžŽšŠđĐ@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]*$/)
    .min(6)
    .max(30)
    .required(),
  phone: Joi.string()
    .regex(/^[0-9+][0-9 -.+/]+$/)
    .min(8)
    .max(40)
    .trim()
    .allow('')
    .messages({
      'string.pattern.base': 'Phone number: numbers (0-9) are allowed and signs (-.+/).',
    }),
});

const userLoginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required(),
  password: Joi.string().required(),
});

export class FormValidation {
  public static validateUserForm = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const validationSchema = createUserValidationSchema;
    const { error } = validationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return new ResponseBuilder<any>()
        .setStatus(false)
        .setData({ message: error.details })
        .setResponse(response)
        .setResponseStatus(statuses.forbidden)
        .build();
    }

    return next();
  };

  public static validateLoginForm = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;

    const { error } = userLoginValidation.validate(req.body, { abortEarly: false });

    if (error) {
      return new ResponseBuilder<any>()
        .setStatus(false)
        .setData({ message: error.details })
        .setResponse(response)
        .setResponseStatus(statuses.forbidden)
        .build();
    }

    const user: IUser | null = await UserModelSchema.findOne({ email });

    if (!user) {
      return new ResponseBuilder<any>()
        .setStatus(false)
        .setData({ message: 'User with this email does not exist, please try again' })
        .setResponse(response)
        .setResponseStatus(statuses.forbidden)
        .build();
    }

    return next();
  };
}
