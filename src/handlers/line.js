export const line = async (eventEmitter, line) => {
  try {
    line = line.trim();
    let [command, ...args] = line.split(' ');

    if (/"|'/g.test(args)) {
      args = args.join(' ').split(/["'] | ["']/).map((arg) => arg.replace(/"|'/g, ''));
    }

    const isValidCommand =
        /^(cd|cat|add|rm|os|hash)$/.test(command) && args.length === 1 ||
        /^(rn|cp|mv|compress|decompress)$/.test(command) && args.length === 2 ||
        /^(up|ls)$/.test(line);

    if (isValidCommand) {
      eventEmitter.emit(command, args);
    } else if (/^\.exit$/.test(command)) {
      this.close();
    } else {
      console.error('Invalid input');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
