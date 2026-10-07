export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
  timestamp: Date;
}

class Logger {
  private level: LogLevel;
  private entries: LogEntry[] = [];

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  debug(message: string, context?: string, data?: unknown) {
    this.log(LogLevel.DEBUG, message, context, data);
  }

  info(message: string, context?: string, data?: unknown) {
    this.log(LogLevel.INFO, message, context, data);
  }

  warn(message: string, context?: string, data?: unknown) {
    this.log(LogLevel.WARN, message, context, data);
  }

  error(message: string, context?: string, data?: unknown) {
    this.log(LogLevel.ERROR, message, context, data);
  }

  private log(level: LogLevel, message: string, context?: string, data?: unknown) {
    if (level < this.level) return;

    const entry: LogEntry = {
      level,
      message,
      context,
      data,
      timestamp: new Date(),
    };

    this.entries.push(entry);

    if (typeof console !== 'undefined') {
      const prefix = context ? `[${context}]` : '';
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(`${prefix} ${message}`, data);
          break;
        case LogLevel.INFO:
          console.info(`${prefix} ${message}`, data);
          break;
        case LogLevel.WARN:
          console.warn(`${prefix} ${message}`, data);
          break;
        case LogLevel.ERROR:
          console.error(`${prefix} ${message}`, data);
          break;
      }
    }
  }

  getEntries(): LogEntry[] {
    return [...this.entries];
  }

  clearEntries() {
    this.entries = [];
  }
}

export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
);
