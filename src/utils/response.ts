import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

export class ResponseUtil<T = any> {
  public code: number
  public error: string

  public data: T

  static ok<T>(data: T, code: number = 0) {
    return new ResponseUtil(data, null, code)
  }

  static error(error: string, code = 10400) {
    return new ResponseUtil(null, error, code)
  }

  static build<T = any>(data: T, error: string, code?: number) {
    return new ResponseUtil(data, error, code)
  }

  constructor(data: T, error: string, code?: number) {
    const _code = data && !code ? 0 : code || 10400
    this.data = data
    this.error = error
    this.code = _code
  }

  valueOf() {
    return this.toJSON()
  }

  toJSON() {
    return {
      error: this.error,
      code: this.code,
      data: this.data,
    }
  }
  toString() {
    return JSON.stringify(this.toJSON())
  }
}

export const ApiResponseString = () =>
  applyDecorators(
    ApiExtraModels(ResponseUtil),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseUtil) },
          {
            properties: {
              data: { type: 'string' },
            },
          },
        ],
      },
    }),
  )

export const ApiResponseObject = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseUtil, dataDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseUtil) },
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  )

export const ApiResponseArray = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseUtil, dataDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseUtil) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export const ApiResponsePagination = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseUtil, dataDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseUtil) },
          {
            properties: {
              data: {
                type: 'object',
                properties: {
                  list: {
                    type: 'array',
                    items: { $ref: getSchemaPath(dataDto) },
                  },
                  total: { type: 'number' },
                  page: { type: 'number' },
                  pageSize: { type: 'number' },
                },
              },
            },
          },
        ],
      },
    }),
  )
