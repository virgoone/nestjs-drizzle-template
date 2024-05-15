import { pbkdf2Sync, randomBytes } from 'crypto'

export const createSalt = (): string => {
  return randomBytes(16).toString('base64')
}
export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) return ''

  const base64Salt = Buffer.from(salt).toString('base64')

  return pbkdf2Sync(password, base64Salt, 10000, 64, 'sha1').toString('base64')
}

const RANDOM_STRING =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

// 32 位 local id
export function makeRandomLocalId() {
  const { length } = RANDOM_STRING
  let id = ''

  for (let i = 0; i < 16; i++) {
    id += RANDOM_STRING.charAt(Math.floor(Math.random() * length))
  }

  return `vk${id}`
}

export const checkPasswordWeak = (
  password: string,
  length?: number,
): boolean => {
  const regex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z]).{${length || 8},}$`)

  return regex.test(password)
}

export const checkPasswordMedium = (
  password: string,
  length?: number,
): boolean => {
  const regex = new RegExp(
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{${length || 8},}$`,
  )

  return regex.test(password)
}

export const checkPasswordStrong = (
  password: string,
  length?: number,
): boolean => {
  const regex = new RegExp(
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${
      length || 8
    },}$`,
  )

  return regex.test(password)
}
