import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { enc, SHA256 } from 'crypto-js'

export class HashUtil {
  static randomSalt(length: number): string {
    return genSaltSync(length)
  }

  static bcrypt(passwordString: string, salt: string): string {
    return hashSync(passwordString, salt)
  }

  static bcryptCompare(
    passwordString: string,
    passwordHashed: string,
  ): boolean {
    return compareSync(passwordString, passwordHashed)
  }

  static sha256(string: string): string {
    return SHA256(string).toString(enc.Hex)
  }

  static sha256Compare(hashOne: string, hashTwo: string): boolean {
    return hashOne === hashTwo
  }
}
