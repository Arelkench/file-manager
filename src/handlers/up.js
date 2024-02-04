import { chdir } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const up = async ()=> {
  try {
    chdir('..')
    displayCurrentDirectory()
  } catch (error) {
    throw new Error('Operation failed')
  }
}
