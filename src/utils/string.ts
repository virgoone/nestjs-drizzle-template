import * as nanoid from 'nanoid'

import { faker } from '@faker-js/faker'

// Helper String
export interface IHelperStringRandomOptions {
  upperCase?: boolean
  safe?: boolean
  prefix?: string
}

export class StringUtil {
  static checkEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  static randomReference(length: number, prefix?: string): string {
    const timestamp = `${new Date().getTime()}`
    const randomString: string = this.random(length, {
      safe: true,
      upperCase: true,
    })

    return prefix
      ? `${prefix}-${timestamp}${randomString}`
      : `${timestamp}${randomString}`
  }

  static random(length: number, options?: IHelperStringRandomOptions): string {
    const rString = options?.safe
      ? faker.internet.password({
          length,
          memorable: true,
          pattern: /[A-Z]/,
          prefix: options?.prefix,
        })
      : faker.internet.password({
          length,
          memorable: false,
          pattern: /\w/,
          prefix: options?.prefix,
        })

    return options?.upperCase ? rString.toUpperCase() : rString
  }

  static generateInviteCode(length?: number) {
    const nano = nanoid.customAlphabet(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      length || 7,
    )
    return nano()
  }

  static censor(value: string): string {
    value = value.replaceAll(' ', '')
    const length = value.length
    if (length <= 3) {
      return value
    }

    const end = Math.ceil(length * 0.7)
    const censorString = '*'.repeat(end > 10 ? 10 : end)
    const visibleString = value.substring(end, length)
    return `${censorString}${visibleString}`
  }

  static checkPasswordWeak(password: string, length?: number): boolean {
    const regex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z]).{${length ?? 8},}$`)

    return regex.test(password)
  }

  static checkPasswordMedium(password: string, length?: number): boolean {
    const regex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{${length ?? 8},}$`,
    )

    return regex.test(password)
  }

  static checkPasswordStrong(password: string, length?: number): boolean {
    const regex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${
        length ?? 8
      },}$`,
    )

    return regex.test(password)
  }

  static checkSafeString(text: string): boolean {
    const regex = new RegExp('^[A-Za-z0-9_-]+$')
    return regex.test(text)
  }

  static formatCurrency(num: number): string {
    const curr = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return curr.format(num)
  }
}

export const censor = (value: string): string => {
  const length = value.length
  if (length === 1) {
    return value
  }

  const end = length > 4 ? length - 4 : 1
  const censorString = '*'.repeat(end > 10 ? 10 : end)
  const visibleString = value.substring(end, length)
  return `${censorString}${visibleString}`
}

export const checkStringOrNumber = (text: string): boolean => {
  const regex = new RegExp(/^[\w.-]+$/)

  return regex.test(text)
}

export const convertStringToNumberOrBooleanIfPossible = (
  text: string,
): string | number | boolean => {
  let convertValue: string | boolean | number = text

  const regexNumber = /^-?\d+$/
  if (text === 'true' || text === 'false') {
    convertValue = text === 'true'
  } else if (regexNumber.test(text)) {
    convertValue = Number(text)
  }

  return convertValue
}
