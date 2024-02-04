import { EventEmitter } from 'node:events';
import { homedir } from 'node:os';
import { argv, chdir, exit, stdin, stdout } from 'node:process';
import * as readline from 'readline';
import * as handlers from './handlers/index.js';
import displayCurrentDirectory from './helpers/displayCurrentDirectory.js';

chdir(homedir());

const args = Object.fromEntries(
  argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=');
    return [key, value];
  })
);

const username = args['--username'] || 'stranger';

console.log(`Welcome to the File Manager, ${username}!`);
displayCurrentDirectory();

const eventEmitter = new EventEmitter().setMaxListeners(0);

for (const [eventName, handler] of Object.entries(handlers)) {
  eventEmitter.on(eventName, handler);
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('line', handlers.line.bind(rl, eventEmitter))
  .on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
    setTimeout(() => exit(0), 100);
  });
