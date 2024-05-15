import _ from 'lodash'

export interface IHelperArrayRemove<T> {
  removed: T[]
  arrays: T[]
}

export class ArrayUtil {
  static getCombinations<T>(
    list: T[][],
    start = 0,
    result: T[][] = [],
    current: T[] = [],
  ): T[][] {
    if (start === list.length) result.push(current)
    else
      list[start].forEach((item) =>
        this.getCombinations(list, start + 1, result, [...current, item]),
      )

    return result
  }

  static getLeftByIndex<T>(array: T[], index: number): T {
    return _.nth(array, index)
  }

  static getRightByIndex<T>(array: T[], index: number): T {
    return _.nth(array, -Math.abs(index))
  }

  static getLeftByLength<T>(array: T[], length: number): T[] {
    return _.take(array, length)
  }

  static getRightByLength<T>(array: T[], length: number): T[] {
    return _.takeRight(array, length)
  }

  static getLast<T>(array: T[]): T {
    return _.last(array)
  }

  static getFirst<T>(array: T[]): T {
    return _.head(array)
  }

  static getFirstIndexByValue<T>(array: T[], value: T): number {
    return _.indexOf(array, value)
  }

  static getLastIndexByValue<T>(array: T[], value: T): number {
    return _.lastIndexOf(array, value)
  }

  static removeByValue<T>(array: T[], value: T): IHelperArrayRemove<T> {
    const removed = _.remove(array, function (n) {
      return n === value
    })

    return { removed, arrays: array }
  }

  static removeLeftByLength<T>(array: T[], length: number): T[] {
    return _.drop(array, length)
  }

  static removeRightByLength<T>(array: Array<T>, length: number): T[] {
    return _.dropRight(array, length)
  }

  static joinToString<T>(array: Array<T>, delimiter: string): string {
    return _.join(array, delimiter)
  }

  static reverse<T>(array: T[]): T[] {
    return _.reverse(array)
  }

  static unique<T>(array: T[]): T[] {
    return _.uniq(array)
  }

  static shuffle<T>(array: T[]): T[] {
    return _.shuffle(array)
  }

  static merge<T>(a: T[], b: T[]): T[] {
    return _.concat(a, b)
  }

  static mergeUnique<T>(a: T[], b: T[]): T[] {
    return _.union(a, b)
  }

  static filterIncludeByValue<T>(array: T[], value: T): T[] {
    return _.filter(array, (arr) => arr === value)
  }

  static filterNotIncludeByValue<T>(array: T[], value: T): T[] {
    return _.without(array, value)
  }

  static filterNotIncludeUniqueByArray<T>(a: T[], b: T[]): T[] {
    return _.xor(a, b)
  }

  static filterIncludeUniqueByArray<T>(a: T[], b: T[]): T[] {
    return _.intersection(a, b)
  }

  static equals<T>(a: T[], b: T[]): boolean {
    return _.isEqual(a, b)
  }

  static notEquals<T>(a: T[], b: T[]): boolean {
    return !_.isEqual(a, b)
  }

  static in<T>(a: T[], b: T[]): boolean {
    return _.intersection(a, b).length > 0
  }

  static notIn<T>(a: T[], b: T[]): boolean {
    return _.intersection(a, b).length == 0
  }

  static includes<T>(a: T[], b: T): boolean {
    return _.includes(a, b)
  }

  static chunk<T>(a: T[], size: number): T[][] {
    return _.chunk<T>(a, size)
  }
}
