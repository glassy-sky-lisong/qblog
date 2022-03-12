export const categoryToString = (arrs: Array<string>): string => {
  if(arrs.length > 0) {
    return arrs.reduce((pre, item) => pre === '' ? pre + item : pre + ',' + item)
  } else {
    return ''
  }
}
