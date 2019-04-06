export const __guard__ = (value, transform) =>
  typeof value !== 'undefined' && value !== null ? transform(value) : undefined
