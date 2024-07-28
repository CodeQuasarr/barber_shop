interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_TITLE: string
    readonly VITE_BASE_URL: string
    // Ajoutez d'autres variables d'environnement ici
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
