import { cwd } from 'node:process'
import {colorize} from "./colorize.js";

export default function displayCurrentDirectory() {
    console.info(colorize.blue(`Your current directory is ${cwd()}`))
}
