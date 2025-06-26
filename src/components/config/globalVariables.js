export const dateFormat = window.FORMATS.dateFormat

export const $t = (key) => {
  return window.TRANSLATIONS[key] || key
}