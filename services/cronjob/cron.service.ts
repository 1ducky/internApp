export const cronJobService = {
    cronAuth
}

function cronAuth(authHeader: string | null) {
    const cronSecret = process.env.CRON_SECRET?.trim();
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
        return false
    }
    return true
}