import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { statuses } from '../config/statuses';
import { ResponseBuilder, errorResponse } from '../utils/response';

export class AuthRoutes {
  public static async protectRoutes(
    req: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.headers.authorization;
      const bearerToken = token?.split('Bearer ')[1];

      if (bearerToken) {
        jwt.verify(bearerToken, env.jwt.secret as string, (error, decoded) => {
          if (error) {
            return new ResponseBuilder<any>()
              .setStatus(false)
              .setData({ message: error.message })
              .setResponse(response)
              .setResponseStatus(statuses.forbidden)
              .build();
          }
          (<any>req).decoded = decoded;
          return next();
        });
      } else {
        return new ResponseBuilder<any>()
          .setStatus(false)
          .setData({ message: 'Invalid token' })
          .setResponse(response)
          .setResponseStatus(statuses.not_found)
          .build();
      }
    } catch (error) {
      return errorResponse(response, statuses.server_error, [error as Error]);
    }

    return null;
  }
}
