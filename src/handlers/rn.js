import { rename } from 'node:fs/promises'
import { resolve, parse } from 'node:path'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const rn = async ([filePath, newFileName]) => {
  try {
    if (/[\/\\]/g.test(newFileName)) console.error('invalid new_file_name')

    const { dir } = parse(resolve(filePath))
    const pathFromFile = resolve(dir, newFileName)
    await rename(filePath, pathFromFile)
    displayCurrentDirectory()
  } catch (error) {
    throw new Error('Operation failed')
  }
}
