export interface IJwtPayload {
  uuid: string,
}

export interface IUser {
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
}

export interface IProduct {
  uuid: string,
  name: string,
  description: string,
  price: number,
  quantity: number
}
