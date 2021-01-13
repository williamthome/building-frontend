declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test' | 'debug'
      API_URL: string
    }
  }
}

// This file has no import/export statements,
// then by adding an empty export statement convert it into a module
export {}
