import { FlattenSimpleInterpolation } from 'styled-components'
import {
  EXTRA_LARGE_DEVICES_BREAK_POINT,
  LARGE_DEVICES_BREAK_POINT,
  MEDIUM_DEVICES_BREAK_POINT,
  SMALL_DEVICES_BREAK_POINT,
} from '../../theme/makeTheme'

export enum __MEDIA_QUERY_BREAK_POINT {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE',
}

const breaks = {
  [__MEDIA_QUERY_BREAK_POINT.SMALL]: SMALL_DEVICES_BREAK_POINT,
  [__MEDIA_QUERY_BREAK_POINT.MEDIUM]: MEDIUM_DEVICES_BREAK_POINT,
  [__MEDIA_QUERY_BREAK_POINT.LARGE]: LARGE_DEVICES_BREAK_POINT,
  [__MEDIA_QUERY_BREAK_POINT.EXTRA_LARGE]: EXTRA_LARGE_DEVICES_BREAK_POINT,
}

export const makeQuery = (key?: keyof typeof breaks, custom?: string | number) => {
  return (style: TemplateStringsArray | FlattenSimpleInterpolation | string) =>
    `@media only screen and (min-width: ${key ? breaks[key] : custom}px) { ${style} }`
}
