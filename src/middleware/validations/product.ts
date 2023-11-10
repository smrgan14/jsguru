import { Request, Response, NextFunction } from 'express';
import { statuses } from '../../config/statuses';
import { ResponseBuilder } from '../../utils/response';

const Joi = require('joi');

const productValidation = Joi.object({
  name: Joi.string()
    .regex(/^[\u00C0-\u017Fa-zA-Z0-9ćĆčČžŽšŠđĐ& ][\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ& 0-9]+$/)
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.pattern.base': 'Product name is of type string',
    }),
  description: Joi.string()
    .allow('')
    .regex(/^[\u00C0-\u017Fa-zA-Z0-9ćĆčČžŽšŠđĐ,%/() ][\u00C0-\u017Fa-zA-ZćĆčČžŽšŠđĐ,%/() 0-9]+$/)
    .min(3)
    .max(1000)
    .trim()
    .messages({
      'string.pattern.base': 'Description is of type string',
    }),
  price: Joi.number()
    .min(0.1)
    .required()
    .messages({
      'string.pattern.base': 'Min price of product is 0.1',
    }),
  quantity: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.base': 'Product quantity must be a number',
      'number.min': 'Min number of product quantity is 1',
      'any.required': 'Product quantity is required',
    }),
});

export class FormValidation {
  public static validateProductForm = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const validationSchema = productValidation;
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
}
