export const encodeSafe = (str: string) => {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export const decodeSafe = (str: string) => {
  return Buffer.from(str, 'base64')
    .toString('utf-8')
    .replace(/\-/g, '+')
    .replace(/\_/g, '/')
}
