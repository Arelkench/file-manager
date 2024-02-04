import { cpus, EOL, userInfo } from 'node:os'
import { arch } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export const os = async ([param]) => {
  try {
    if (!param) console.error('Parameter is not specified');

    const { username, homedir } = userInfo();
    const cpusInfo = cpus().map(({ model, speed }) => ({
      model,
      speed: `${speed / 1000}GHz`,
    }));

    const osInfo = {
      '--EOL': JSON.stringify(EOL),
      '--cpus': cpusInfo,
      '--homedir': homedir,
      '--username': username,
      '--architecture': arch,
    };

    if (!osInfo[param]) console.error('No such parameter');

    console.table(osInfo[param]);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
