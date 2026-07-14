const COLOR_MAP = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

export const print = (message: string, color: keyof typeof COLOR_MAP) => {
  console.log(`${COLOR_MAP[color]}${message}\x1b[0m`)
}
