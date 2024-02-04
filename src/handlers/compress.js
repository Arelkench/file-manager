import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import isDirectory from '../helpers/isDirectory.js';
import isFile from '../helpers/isFile.js';

export const compress = async ([filePath, destinationPath]) => {
  try {

    if (!(await isDirectory(destinationPath))) console.error("it's not a directory");
    if (!(await isFile(filePath))) console.error("it's not a file");

    filePath = resolve(filePath)
    const { base } = parse(filePath);
    const fileName = `${base}.br`;
    destinationPath = resolve(destinationPath, fileName);

    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(destinationPath);
    const brotliCompress = createBrotliCompress();
    await pipeline(readableStream, brotliCompress, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};

