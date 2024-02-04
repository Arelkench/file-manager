import { createReadStream } from 'fs';
import { resolve } from 'path';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import { pipeline } from 'stream/promises';
import { customOutput } from '../helpers/customOutput.js';

export const cat = async ([filePath]) => {
  try {
    const readableStream = createReadStream(resolve(filePath), { encoding: 'utf8' });
    await pipeline(readableStream, customOutput());
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};


