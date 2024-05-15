import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export enum ENUM_DATE_DIFF {
  MILIS = 'milis',
  SECONDS = 'seconds',
  HOURS = 'hours',
  DAYS = 'days',
  MINUTES = 'minutes',
}

export enum ENUM_DATE_FORMAT {
  DATE = 'YYYY-MM-DD',
  FRIENDLY_DATE = 'MMM, DD YYYY',
  FRIENDLY_DATE_TIME = 'MMM, DD YYYY HH:MM:SS',
  YEAR_MONTH = 'YYYY-MM',
  MONTH_DATE = 'MM-DD',
  ONLY_YEAR = 'YYYY',
  ONLY_MONTH = 'MM',
  ONLY_DATE = 'DD',
  ISO_DATE = 'YYYY-MM-DDTHH:MM:SSZ',
}

// Helper Date
export interface IDateOptionsDiff {
  format?: ENUM_DATE_DIFF
}

export interface IDateOptionsCreate {
  date?: string | number | Date
}

export interface IDateOptionsFormat {
  format?: ENUM_DATE_FORMAT | string
}

export interface IDateOptionsForward {
  fromDate?: Date
}

export type IDateOptionsBackward = IDateOptionsForward

export interface IDateOptionsMonth {
  year?: number
}

export class DateUtil {
  static calculateAge(dateOfBirth: Date): number {
    return dayjs().diff(dateOfBirth, 'years')
  }

  static diff(
    dateOne: Date,
    dateTwo: Date,
    options?: IDateOptionsDiff,
  ): number {
    const mDateOne = dayjs(dateOne)
    const mDateTwo = dayjs(dateTwo)
    const diff = dayjs.duration(mDateTwo.diff(mDateOne))

    if (options && options.format === ENUM_DATE_DIFF.MILIS) {
      return diff.asMilliseconds()
    } else if (options && options.format === ENUM_DATE_DIFF.SECONDS) {
      return diff.asSeconds()
    } else if (options && options.format === ENUM_DATE_DIFF.HOURS) {
      return diff.asHours()
    } else if (options && options.format === ENUM_DATE_DIFF.MINUTES) {
      return diff.asMinutes()
    } else {
      return diff.asDays()
    }
  }

  static check(date: string | Date | number): boolean {
    return dayjs(date).isValid()
  }

  static checkTimestamp(timestamp: number): boolean {
    return dayjs(timestamp).isValid()
  }

  static create(options?: IDateOptionsCreate): Date {
    return dayjs(options && options.date ? options.date : undefined).toDate()
  }

  static timestamp(options?: IDateOptionsCreate): number {
    return dayjs(options && options.date ? options.date : undefined).valueOf()
  }

  static format(date: Date, options?: IDateOptionsFormat): string {
    return dayjs(date).format(
      options && options.format ? options.format : ENUM_DATE_FORMAT.DATE,
    )
  }

  static forwardInMilliseconds(
    milliseconds: number,
    options?: IDateOptionsForward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .add(milliseconds, 'ms')
      .toDate()
  }

  static backwardInMilliseconds(
    milliseconds: number,
    options?: IDateOptionsBackward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .subtract(milliseconds, 'ms')
      .toDate()
  }

  static forwardInSeconds(
    seconds: number,
    options?: IDateOptionsForward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .add(seconds, 's')
      .toDate()
  }

  static backwardInSeconds(
    seconds: number,
    options?: IDateOptionsBackward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .subtract(seconds, 's')
      .toDate()
  }

  static forwardInMinutes(
    minutes: number,
    options?: IDateOptionsForward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .add(minutes, 'm')
      .toDate()
  }

  static backwardInMinutes(
    minutes: number,
    options?: IDateOptionsBackward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .subtract(minutes, 'm')
      .toDate()
  }

  static forwardInDays(days: number, options?: IDateOptionsForward): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .add(days, 'd')
      .toDate()
  }

  static backwardInDays(days: number, options?: IDateOptionsBackward): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .subtract(days, 'd')
      .toDate()
  }

  static forwardInMonths(months: number, options?: IDateOptionsForward): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .add(months, 'M')
      .toDate()
  }

  static backwardInMonths(
    months: number,
    options?: IDateOptionsBackward,
  ): Date {
    return dayjs(options && options.fromDate ? options.fromDate : undefined)
      .subtract(months, 'M')
      .toDate()
  }

  static endOfMonth(month: number, options?: IDateOptionsMonth): Date {
    const year = options && options.year ? options.year : dayjs().year()
    return dayjs()
      .year(year)
      .month(month - 1)
      .endOf('month')
      .toDate()
  }

  static startOfMonth(month: number, options?: IDateOptionsMonth): Date {
    const year = options && options.year ? options.year : dayjs().year()
    return dayjs()
      .year(year)
      .month(month - 1)
      .startOf('month')
      .toDate()
  }

  static endOfYear(year: number): Date {
    return dayjs().year(year).endOf('year').toDate()
  }

  static startOfYear(year: number): Date {
    return dayjs().year(year).startOf('year').toDate()
  }

  static endOfDay(date?: Date): Date {
    return dayjs(date).endOf('day').toDate()
  }

  static startOfDay(date?: Date): Date {
    return dayjs(date).startOf('day').toDate()
  }
}
