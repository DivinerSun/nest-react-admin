/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_HTTP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
