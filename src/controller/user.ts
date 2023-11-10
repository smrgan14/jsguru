import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bCrypt from 'bcrypt';
import { errorResponse, ResponseBuilder } from '../utils/response';
import { statuses } from '../config/statuses';
import { UserRepository } from '../repositories/user';
import { IUser } from '../model/user';

export class UserController {
  public static async addUser(req: Request, response: Response) {
    try {
      req.body.uuid = uuidv4();
      const { password } = req.body;
      const hashedPassword = await bCrypt.hash(password, 10);
      req.body.password = hashedPassword;

      await UserRepository.addUser(req.body);

      return new ResponseBuilder<any>()
        .setStatus(true)
        .setData({ message: 'User succesfully added!' })
        .setResponse(response)
        .setResponseStatus(statuses.created)
        .build();
    } catch (error: Error | any) {
      if (error.code === 11000) {
        return new ResponseBuilder<any>()
          .setData({ message: 'User with this email already exist' })
          .setResponse(response)
          .setResponseStatus(statuses.invalid)
          .build();
      }
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }

  public static async login(
    req: Request,
    response: Response,
  ) {
    try {
      const { email, password } = req.body;
      const user: IUser | any = await UserRepository.findUserByEmail(email);

      if (!user) {
        return new ResponseBuilder<any>()
          .setStatus(true)
          .setData({ message: 'User with this data does not exist, please try again' })
          .setResponse(response)
          .setResponseStatus(statuses.not_found)
          .build();
      }

      const token = await UserRepository.login(email, password);

      return new ResponseBuilder<object>()
        .setStatus(true)
        .setData(token)
        .setResponse(response)
        .setResponseStatus(statuses.success)
        .build();
    } catch (error) {
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }
}
