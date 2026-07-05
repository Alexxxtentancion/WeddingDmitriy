/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YANDEX_MAPS_KEY: string
  readonly VITE_GOOGLE_SCRIPT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
