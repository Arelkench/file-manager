import { open } from 'fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export const add = async ([newFileName]) => {
    const filePath = resolve(cwd(), newFileName);
    try {
        const fileHandle = await open(filePath, 'w');
        displayCurrentDirectory();
        await fileHandle.close();
    } catch (error) {
        console.error('Operation failed');
    }
};
