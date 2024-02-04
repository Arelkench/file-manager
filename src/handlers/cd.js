import { chdir } from 'node:process';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export const cd = async ([dirPath]) => {
  try {
    chdir(dirPath);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
