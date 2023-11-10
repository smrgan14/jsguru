import bCrypt from 'bcrypt';
import { IUser, UserModelSchema } from '../model/user';
import { isAuthenticated } from '../middleware/security';
import { Context, Logger } from '../utils/logger';

const logger = new Logger(Context.USER);

export class UserRepository {
  public static async addUser(user: IUser) {
    try {
      await UserModelSchema.create(user);
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }
      throw error;
    }
  }

  public static async findUserByEmail(email: string) {
    try {
      const user: IUser | null = await UserModelSchema.findOne({ email });

      if (!user) return { message: 'User with this email does not exist in app, please try again' };

      return user;
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }
      throw error;
    }
  }

  public static async login(email: string, password: string) {
    try {
      const user: IUser | null = await UserModelSchema.findOne({ email });

      if (!user) return { message: 'Incorrect user data, please try again' };

      const isCheck: boolean = await bCrypt.compare(password, user!.password);

      if (!isCheck) return { message: 'Incorrect user password, please try again' };

      const userData = {
        uuid: user!.uuid,
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
      };

      const token = isAuthenticated({ uuid: userData.uuid });

      return {
        userData,
        token,
      };
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }

      throw error;
    }
  }
}
