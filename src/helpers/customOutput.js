import { Writable } from 'node:stream'

export function customOutput() {
  return new Writable({
    decodeStrings: false,
    write(chunk, _, callback) {
      console.log(chunk)
      callback()
    },
  })
}
