export const logger = {
    info: (message: string, causeRoot?: string) => console.log(`[INFO ][${new Date().toISOString()}]: ${message}`, causeRoot ? `| cause root: ${causeRoot}` : ''),
    error: (message: string, causeRoot?: string) => console.error(`[ERROR] [${new Date().toISOString()}]: ${message}`, causeRoot ? `| cause root: ${causeRoot}` : ''),
    warn: (message: string, causeRoot?: string) => console.warn(`[WARN ] [${new Date().toISOString()}]: ${message}`, causeRoot ? `| cause root: ${causeRoot}` : ''),
    debug: (message: string, causeRoot?: string) => console.debug(`[DEBUG] [${new Date().toISOString()}]: ${message}`, causeRoot ? `| cause root: ${causeRoot}` : ''),
}