import { Container } from 'axelra-styled-bootstrap-grid'
import styled from 'styled-components'

type MaxWidthContainerProps = {
  disablePadding?: boolean
  fullHeight?: boolean
  left?: boolean
  right?: boolean
}

export const MaxWidthContainer = styled(Container)<MaxWidthContainerProps>`
  height: ${(p) => (p.fullHeight ? '100%' : 'auto')};
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    max-width: ${(p) => p.theme.breakPoints.sm}px;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.md}px) {
    max-width: ${(p) => p.theme.breakPoints.md}px;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.lg}px) {
    max-width: ${(p) => p.theme.breakPoints.lg}px;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.xl}px) {
    max-width: ${(p) => p.theme.breakPoints.xl}px;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.xxl}px) {
    max-width: ${(p) => p.theme.breakPoints.xxl}px;
  }
`
