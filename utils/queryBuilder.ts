// utils/queryBuilder.ts

type QueryValue = string | number | boolean | null | undefined

export interface QueryOptions {
  [key: string]: QueryValue | QueryValue[]
}

export function buildQueryString(options: QueryOptions): string {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(options)) {
    if (value === null || value === undefined) continue

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== null && v !== undefined) {
          params.append(key, String(v))
        }
      })
    } else {
      params.set(key, String(value))
    }
  }

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export function buildUrl(baseUrl: string, options: QueryOptions): string {
  return `${baseUrl}${buildQueryString(options)}`
}