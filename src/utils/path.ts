export const isPath = (p: string) => {
  if (/^(\/(\b)+)+(\?\w)?/.test(p) || /^\/(\b)+/.test(p)) {
    return true
  } else {
    return false
  }
}
