const colorize = {
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    pink: (text) => `\x1b[35m${text}\x1b[0m`,
};

export { colorize };
