import { readFileSync, writeFileSync } from 'fs'
import bytes from 'bytes'
import XLSX, { read, utils, WorkBook, write } from 'xlsx'

import { ENUM_FILE_TYPE } from '@/app/constants/app.file.constant'

export type IHelperFileExcelRows = Record<string, string | number>

export type IHelperFileRows = Record<string, string | number | Date>

export interface IHelperFileWriteExcelOptions {
  password?: string
  type?: ENUM_FILE_TYPE
}

export interface IHelperFileCreateExcelWorkbookOptions {
  sheetName?: string
}

export interface IHelperFileReadExcelOptions {
  sheet?: string | number
  password?: string
}

export class File {
  static createExcelWorkbook(
    rows: IHelperFileRows[],
    options?: IHelperFileCreateExcelWorkbookOptions,
  ): WorkBook {
    // headers
    const headers = Object.keys(rows[0])

    // worksheet
    const worksheet = utils.json_to_sheet(rows)

    // workbook
    const workbook = utils.book_new()

    utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' })
    utils.book_append_sheet(
      workbook,
      worksheet,
      options?.sheetName ?? 'Sheet 1',
    )

    return workbook
  }

  static writeExcelToBuffer(
    workbook: WorkBook,
    options?: IHelperFileWriteExcelOptions,
  ): Buffer {
    // create buffer
    const buff: Buffer = write(workbook, {
      type: 'buffer',
      bookType: options?.type ?? ENUM_FILE_TYPE.CSV,
      password: options?.password,
    })

    return buff
  }

  static readExcelFromBuffer(
    file: Buffer,
    options?: IHelperFileReadExcelOptions,
  ): IHelperFileRows[][] {
    // workbook
    const workbook = read(file, {
      type: 'buffer',
      password: options?.password,
      sheets: options?.sheet,
    })

    // worksheet
    const worksheetsName: string[] = workbook.SheetNames
    const sheets: IHelperFileRows[][] = []
    for (const worksheetName of worksheetsName) {
      const worksheet = workbook.Sheets[worksheetName]

      // rows
      const rows: IHelperFileRows[] = utils.sheet_to_json(worksheet)
      sheets.push(rows)
    }

    return sheets
  }

  static writeExcel(
    rows: IHelperFileExcelRows[],
    options?: Record<string, any>,
  ): Buffer {
    // headers
    const headers = Object.keys(rows[0])

    // worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows)

    // workbook
    const workbook = XLSX.utils.book_new()

    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' })
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      options && options.sheetName ? options.sheetName : 'Sheet 1',
    )

    // create buffer
    const buff: Buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    })

    return buff
  }

  static readExcel(file: Buffer): IHelperFileExcelRows[] {
    // workbook
    const workbook = XLSX.read(file)

    // worksheet
    const worksheetName = workbook.SheetNames
    const worksheet = workbook.Sheets[worksheetName[0]]

    // rows
    const rows: IHelperFileExcelRows[] = XLSX.utils.sheet_to_json(worksheet)

    return rows
  }

  static convertToBytes(megabytes: string): number {
    return bytes(megabytes)
  }
  static createJson(path: string, data: Record<string, any>[]): boolean {
    const sData = JSON.stringify(data)
    writeFileSync(path, sData)

    return true
  }
  static readJson(path: string): Record<string, any>[] {
    const data: string = readFileSync(path, 'utf8')
    return JSON.parse(data)
  }
}
