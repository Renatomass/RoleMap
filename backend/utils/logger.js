const enabled = process.env.NODE_ENV !== 'production';

module.exports = {
  log: (...args) => {
    if (enabled) console.log(...args);
  },
  error: (...args) => {
    if (enabled) console.error(...args);
  },
};