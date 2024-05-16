import { Response } from 'express'

import { HttpService } from '@nestjs/axios'
import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IRequest } from '@/utils/request'

import { HttpInterceptorAction } from './dto/http-interceptor.dto'

@Injectable()
export class HttpInterceptorService {
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.HTTP_INTERCEPTOR_TIMEOUT =
      this.configService.get<number>('request.timeout')
    this.HTTP_INTERCEPTOR_URL = this.configService.get<string>('request.url')
  }

  private readonly logger = new Logger(HttpInterceptorService.name)
  private readonly HTTP_INTERCEPTOR_URL: string
  private readonly HTTP_INTERCEPTOR_TIMEOUT: number = 3000

  async processPreInterceptor(context: ExecutionContext, requestId: string) {
    const requestData = this.buildRequestData(context, requestId)
    return this.sendRequestToInterceptor(requestData)
  }

  async processPostInterceptor(
    context: ExecutionContext,
    requestId: string,
    data: any,
  ) {
    const response: Response = context.switchToHttp().getResponse()
    const responseData = this.buildResponseData(response, requestId, data)
    return this.sendRequestToInterceptor(responseData)
  }
  buildRequestData(context: ExecutionContext, requestId: string): any {
    const request: IRequest = context.switchToHttp().getRequest()
    return {
      url: request.url,
      method: request.method,
      headers: request.headers,
      user: request.user,
      params: request.params,
      query: request.query,
      body: request.body,
      id: requestId,
      controller: context.getClass().name,
      handler: context.getHandler().name,
      state: 'pre',
    }
  }
  buildResponseData(response: Response, requestId: string, data: any): any {
    return {
      id: requestId,
      headers: response.getHeaders(),
      data: data,
      state: 'post',
    }
  }

  async sendRequestToInterceptor(data: any) {
    if (!this.HTTP_INTERCEPTOR_URL) {
      return { action: HttpInterceptorAction.ALLOW }
    }
    try {
      const response = await this.httpService.axiosRef.post(
        this.HTTP_INTERCEPTOR_URL,
        data,
        { timeout: this.HTTP_INTERCEPTOR_TIMEOUT },
      )
      if (!response.data) {
        return {
          action: HttpInterceptorAction.ALLOW,
        }
      }
      if (!response.data.action) {
        return {
          action: HttpInterceptorAction.ALLOW,
        }
      }
      return response.data
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        this.logger.error('Request timeout!')
      } else {
        this.logger.error(error)
      }
      return { action: HttpInterceptorAction.ALLOW }
    }
  }
}
