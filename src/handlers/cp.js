import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const cp = async ([filePath, dirPath]) => {
  try {
    const { base } = parse(resolve(filePath))
    dirPath = resolve(dirPath, base)
    const readableStream = createReadStream(filePath)
    const writableStream = createWriteStream(dirPath)
    await pipeline(readableStream, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    console.error('Operation failed')
  }
};
