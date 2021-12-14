export default function trimFormValues<T extends unknown>(values: Record<string, any>): T {
  Object.keys(values).forEach(key => {
    const value = values[key]
    values[key] = typeof value === 'string' ? value.trim() : value
  })
  return values as T
}