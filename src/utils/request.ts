import { Request, Response } from 'express'

export interface IRequest extends Request {
  user?: any
  [key: string]: any
}

export interface IResponse extends Response {
  [key: string]: any
}

export function GetClientIPFromRequest(req: IRequest) {
  // try to get ip from x-forwarded-for
  const ips_str =
    req.clientIP ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.ip ||
    (req.connection.remoteAddress as string)
  const realIP = Array.isArray(ips_str) ? ips_str.join(',') : ips_str

  // try to get ip from x-real-ip
  if (realIP) {
    return realIP
  }

  return null
}
