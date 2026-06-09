// utils/dateRange.ts

/**
 * Utils 1: Get start and end of a specific HOUR
 * Default: current hour
 */
export function getHourRange(date: Date = new Date()): { start: Date; end: Date } {
    const start = new Date(date);
    start.setMinutes(0, 0, 0);

    const end = new Date(date);
    end.setMinutes(59, 59, 999);

    return { start, end };
}

/**
 * Utils 2: Get start and end of a specific DAY
 * Default: today
 */
export function getDayRange(date: Date = new Date()): { start: Date; end: Date } {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

/**
 * Utils 3: Get range from a date going back N days
 * @param date    - tanggal akhir (default: today)
 * @param days    - berapa hari mundur
 */
export function getDateRangeByDays(days: number, date: Date = new Date()): { start: Date; end: Date } {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const start = new Date(date);
    start.setDate(start.getDate() - days);
    start.setHours(0, 0, 0, 0);

    return { start, end };
}