import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const error = (error) => {
  if (error) {
    console.error('Operation failed')
  } else {
    displayCurrentDirectory()
  }
}
