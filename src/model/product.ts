import {
  Document, Model, Schema, model,
} from 'mongoose';
import { ProductRepository } from '../repositories/product';

export interface IProduct extends Document {
  name: string,
  description: string,
  price: number,
  quantity: number,
}

export interface IProductMethods {
  addProduct(product: IProduct): Promise<void>;
  getProducts(): Promise<IProduct>;
  getProductByUuid(uuid: string): Promise<IProduct>;
  deleteProduct(uuid: string): Promise<void>;
}

const ProductSchema = new Schema({
  uuid: {
    type: String,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

ProductSchema.static('addProduct', async (product: IProduct) => {
  await ProductRepository.addProduct(product);
});

ProductSchema.static('getProducts', async () => {
  await ProductRepository.getProducts();
});

ProductSchema.static('getProductByUuid', async (uuid: string) => {
  await ProductRepository.getProductByUuid(uuid);
});

ProductSchema.static('deleteProduct', async (uuid: string) => {
  await ProductRepository.deleteProduct(uuid);
});

type ProductModelSchemaType = Model<IProduct> & IProductMethods;
export const ProductModelSchema: ProductModelSchemaType = model<IProduct, IProductMethods>('product', ProductSchema, 'product') as ProductModelSchemaType;
