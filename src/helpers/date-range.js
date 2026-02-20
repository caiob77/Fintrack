const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/

const parseDateOnly = (value) => {
  const stringValue = String(value ?? '').trim()
  if (!DATE_ONLY_REGEX.test(stringValue)) return null

  const parsed = new Date(`${stringValue}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

const formatDateOnly = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const subtractDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const sanitizeDateRange = (from, to, maxDaysBack = 60, maxDaysForward = 30) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const minFrom = subtractDays(today, maxDaysBack)
  const maxTo = addDays(today, maxDaysForward)

  let safeTo = parseDateOnly(to) ?? maxTo
  if (safeTo > maxTo) safeTo = maxTo

  let safeFrom = parseDateOnly(from) ?? minFrom
  if (safeFrom < minFrom) safeFrom = minFrom
  if (safeFrom > safeTo) safeFrom = subtractDays(safeTo, 1)

  return {
    from: formatDateOnly(safeFrom),
    to: formatDateOnly(safeTo),
  }
}
