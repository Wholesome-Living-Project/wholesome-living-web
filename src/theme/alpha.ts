import { transparentize } from 'polished'

/**
 * Color component that represents the degree of transparency (or opacity) of a color.
 * Works with reanimated as well.
 */
export const alpha = (al: number, color: string) => {
  'worklet'
  return transparentize(1 - al, color)
}
