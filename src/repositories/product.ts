import { ProductModelSchema, IProduct } from '../model/product';
import { Context, Logger } from '../utils/logger';

const logger = new Logger(Context.PRODUCT);

export class ProductRepository {
  public static async addProduct(product: IProduct) {
    try {
      await ProductModelSchema.create(product);
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }

      throw error;
    }
  }

  public static async getProducts() {
    try {
      return await ProductModelSchema.find();
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }

      throw error;
    }
  }

  public static async getProductByUuid(uuid: string) {
    try {
      return await ProductModelSchema.findOne({ uuid });
    } catch (error) {
      if (error instanceof (Error)) {
        logger.error(
          error.message,
        );
      }

      throw error;
    }
  }

  public static async deleteProduct(uuid: string) {
    try {
      await ProductModelSchema.findOneAndDelete({ uuid });
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
