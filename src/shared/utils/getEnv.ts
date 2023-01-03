export const getEnv = () => {

    return {
        // ...import.meta.env
        VITE_APP_MODE: import.meta.env.VITE_APP_MODE,
        VITE_API_AUTH_URL: import.meta.env.VITE_API_AUTH_URL,
    }
}

