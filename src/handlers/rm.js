import { unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const rm = async ([filePath]) => {
  try {
    await unlink(resolve(filePath))
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
}
