import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { errorResponse, ResponseBuilder } from '../utils/response';
import { statuses } from '../config/statuses';
import { ProductRepository } from '../repositories/product';
import { IProduct } from '../model/product';

export class ProductController {
  public static async addProduct(
    req: Request,
    response: Response,
  ) {
    try {
      req.body.uuid = uuidv4();
      await ProductRepository.addProduct(req.body);

      return new ResponseBuilder<any>()
        .setStatus(true)
        .setData({ message: 'Product succesfully added!' })
        .setResponse(response)
        .setResponseStatus(statuses.created)
        .build();
    } catch (error: Error | any) {
      if (error.code === 11000) {
        return new ResponseBuilder<any>()
          .setData({ message: 'Product with this name already exist' })
          .setResponse(response)
          .setResponseStatus(statuses.invalid)
          .build();
      }
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }

  public static async getProducts(
    req: Request,
    response: Response,
  ) {
    try {
      const products: IProduct[] = await ProductRepository.getProducts();

      if (products.length === 0) {
        return new ResponseBuilder<any>()
          .setStatus(true)
          .setData([])
          .setResponse(response)
          .setResponseStatus(statuses.not_found)
          .build();
      }

      return new ResponseBuilder<IProduct[]>()
        .setStatus(true)
        .setData(products)
        .setResponse(response)
        .setResponseStatus(statuses.success)
        .build();
    } catch (error) {
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }

  public static async getProductByUuid(
    req: Request,
    response: Response,
  ) {
    try {
      const { uuid } = req.params;
      const product: IProduct | null = await ProductRepository.getProductByUuid(uuid);

      if (!product) {
        return new ResponseBuilder<any>()
          .setStatus(true)
          .setData({ message: 'Product with this uuid does not exist, please try again' })
          .setResponse(response)
          .setResponseStatus(statuses.not_found)
          .build();
      }

      return new ResponseBuilder<IProduct>()
        .setStatus(true)
        .setData(product)
        .setResponse(response)
        .setResponseStatus(statuses.success)
        .build();
    } catch (error) {
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }

  public static async deleteProduct(
    req: Request,
    response: Response,
  ) {
    try {
      const { uuid } = req.params;

      const product: IProduct | null = await ProductRepository.getProductByUuid(uuid);

      if (!product) {
        return new ResponseBuilder<any>()
          .setStatus(true)
          .setData({ message: 'Product with this uuid does not exist, please try again' })
          .setResponse(response)
          .setResponseStatus(statuses.not_found)
          .build();
      }

      await ProductRepository.deleteProduct(uuid);

      return new ResponseBuilder<any>()
        .setStatus(true)
        .setData({ message: 'Product successfully removed' })
        .setResponse(response)
        .setResponseStatus(statuses.not_found)
        .build();
    } catch (error) {
      return errorResponse(response, statuses.server_error, [error as Error]);
    }
  }
}
