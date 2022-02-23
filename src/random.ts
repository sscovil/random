export const hex: string[] = '0123456789ABCDEF'.split('')

export function color(): string {
  let value = '#'
  for (let i = 0; i < 6; i++) {
    value += pick(hex)
  }
  return value
}

export function distribute(
  length: number,
  value: number,
  min: number = 0,
  max: number = 0
): number[] {
  if (length <= 1) {
    return [Math.max(value, min)]
  }

  const result = new Array(length)

  if (value <= length * min) {
    return result.fill(min)
  }

  if (max && value > length * max) {
    return result.fill(max)
  }

  for (let i = 0; i < length; i++) {
    const spaceRemaining = length - i
    const isLast = spaceRemaining === 1
    let minRandom = min
    let maxRandom = value - min * spaceRemaining

    if (max) {
      minRandom = Math.floor(value / spaceRemaining)
      maxRandom = Math.min(max + 1, maxRandom)
    }

    result[i] = isLast ? value : integer(minRandom, maxRandom)
    value -= result[i]
  }

  return result
}

export function pick(arr: any[]): any {
  if (!Array.isArray(arr) || !arr.length) {
    return null
  }
  return arr[integer(0, arr.length - 1)]
}

export function integer(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

export function sample(arr: any[], size: number): any[] {
  if (
    !Array.isArray(arr) ||
    !arr.length ||
    !Number.isFinite(size) ||
    size < 1
  ) {
    return []
  }

  const shuffled = arr.slice(0)
  let i = arr.length

  while (i--) {
    const index = Math.floor((i + 1) * Math.random())
    const temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }

  return shuffled.slice(0, size)
}
