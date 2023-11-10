import {
  Document, Model, Schema, model,
} from 'mongoose';
import { UserRepository } from '../repositories/user';

export interface IUser extends Document {
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string
}

export interface IUserMethods {
  addUser(user: IUser): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema({
  uuid: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, { versionKey: false });

UserSchema.static('addUser', async (user: IUser) => {
  await UserRepository.addUser(user);
});

UserSchema.static('login', async (email: string, password: string) => {
  await UserRepository.login(email, password);
});

type UserModelSchemaType = Model<IUser> & IUserMethods;
export const UserModelSchema: UserModelSchemaType = model<IUser, IUserMethods>('user', UserSchema, 'user') as UserModelSchemaType;
