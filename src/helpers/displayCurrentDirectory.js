import { cwd } from 'node:process'

export default function displayCurrentDirectory() {
    console.info(`Your current directory is ${cwd()}`)
}
