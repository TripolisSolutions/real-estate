export function formatDate(d) {
  const date = new Date(d)
  return `${date.getDate()}/${ date.getMonth() + 1 }/${date.getFullYear()}`
}

export function formatDateTime(d) {
  const date = new Date(d)
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${ date.getMonth() + 1 }/${date.getFullYear()}`
}