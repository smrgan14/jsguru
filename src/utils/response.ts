import { Response } from 'express';
import { statuses } from '../config/statuses';

export interface IJSONError {
  code?: number | string;
  message?: string;
  name?: string;
}

export interface IJSONMetaResponse {
  limit?: number;
  skip?: number;
  offset?: number;
  fields?: string;
  sort?: string;
  search?: string;
  total?: number;
}

export interface IJSONBuilder<T> {
  setData(data: T): this;
  setStatus(status: boolean): this;
  setMeta(...metaEntry: IJSONMetaResponse[]): this;
  setError(errors: IJSONError[]): this;
  build(): Response;
  setResponse(response: Response): this;
  setResponseStatus(status: number): this;
}

// tslint:disable
export class JSONResponse<T> {
  private status: boolean;

  private result?: T;

  private meta?: IJSONMetaResponse;

  private errors?: IJSONError[];

  constructor() {
    this.status = true;
    this.meta = {};
  }
}

export class ResponseBuilder<T> implements IJSONBuilder<T> {
  private responseObject: JSONResponse<T>;

  private response!: Response;

  constructor() {
    this.responseObject = new JSONResponse<T>();
  }

  public setData(data: T) {
    Object.assign(this.responseObject, {
      result: data,
    });

    return this;
  }

  public setStatus(status: boolean) {
    Object.assign(this.responseObject, {
      status,
    });

    return this;
  }

  public setMeta(...metaEntry: IJSONMetaResponse[]) {
    Object.assign(this.responseObject, {
      meta: Object.assign({}, ...this.clearEntry(metaEntry)),
    });
    return this;
  }

  public setError(errors: IJSONError[]) {
    Object.assign(this.responseObject, {
      errors,
    });

    return this;
  }

  public setResponse(response: Response) {
    this.response = response;

    return this;
  }

  public setResponseStatus(status: number) {
    this.response.status(status);

    return this;
  }

  public build() {
    return this.response.json(this.responseObject);
  }

  private clearEntry(metaData: IJSONMetaResponse[]) {
    return metaData.map((meta) => {
      Object.keys(meta).forEach((key) => {
        // @ts-ignore
        if (typeof meta[key] === 'undefined') {
          // @ts-ignore
          delete meta[key];
        }
      });

      return meta;
    });
  }
}

export function errorResponse(
  response: Response,
  status: number = statuses.success, // eslint-disable-line
  errors: Error[],
): Response {
  const errorResult: IJSONError[] = [];

  errors.map((error: Error) => {
    if ('name' in error) {
      errorResult.push({
        code: error.name.toUpperCase(),
        message: error.message,
      });
    } else {
      errorResult.push(error);
    }

    return errorResult;
  });

  return new ResponseBuilder<any>()
    .setStatus(false)
    .setResponse(response)
    .setResponseStatus(status)
    .setError(errorResult)
    .build();
}
