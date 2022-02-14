

/**
 *  timea before timeb
 * @param a
 * @param b
 * @constructor
 */
export const ABoforeB = (a: string, b: string): number => {
  const temp = new Date(a).getTime() - new Date(a).getTime()

  if (temp > 0) {
    return 1
  } else if (temp < 0) {
    return -1
  } else {
    return 0
  }
}

