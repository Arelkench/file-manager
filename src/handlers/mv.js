import { createReadStream, createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'

export const mv = async ([filePath, newDirPath]) => {
  try {
    if (!(await isDirectory(newDirPath))) console.error('invalid path_to_new_directory')

    const { base } = parse(resolve(filePath));
    newDirPath = resolve(newDirPath, base);
    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(newDirPath);
    await pipeline(readableStream, writableStream);
    await unlink(filePath);
    displayCurrentDirectory();
  } catch (error) {
    throw new Error('Operation failed');
  }
}
