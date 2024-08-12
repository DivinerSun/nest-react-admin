/// <reference types="vite/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly REACT_APP_HTTP_URL: string
  }
}
