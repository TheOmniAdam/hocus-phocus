type OrbitPresentation = 'grounded' | 'floating'

export function normalizeIndex(index: number, count: number): number {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('Orbit must contain at least one pod')
  }

  return ((index % count) + count) % count
}

export function getRelativePosition(
  podIndex: number,
  focusedIndex: number,
  count: number
): number {
  return normalizeIndex(podIndex - focusedIndex, count)
}

export function getOrbitAngle(
  podIndex: number,
  focusedIndex: number,
  count: number
): number {
  return (getRelativePosition(podIndex, focusedIndex, count) * 2 * Math.PI) / count
}

export function getShortestRotation(
  fromIndex: number,
  toIndex: number,
  count: number
): number {
  const forward = normalizeIndex(toIndex - fromIndex, count)
  const backward = forward - count

  if (forward === 0) return 0

  return forward <= Math.abs(backward)
    ? forward
    : backward
}