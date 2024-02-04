import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'

export const decompress = async ([filePath, destinationPath,]) => {
  try {

    if (!(await isDirectory(destinationPath))) console.error("it's not a directory")
    if (!(await isFile(filePath))) console.error("it's not a file")

    const { name, ext } = parse(resolve(filePath))

    if (!ext.includes('.br')) console.error('invalid file extension')

    destinationPath = resolve(destinationPath, name)

    const readableStream = createReadStream(filePath)
    const writableStream = createWriteStream(destinationPath)
    const brotliDecompress = createBrotliDecompress()
    await pipeline(readableStream, brotliDecompress, writableStream)
    displayCurrentDirectory()
  } catch (error) {
    throw new Error('Operation failed')
  }
}
