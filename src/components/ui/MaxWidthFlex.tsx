import styled from 'styled-components'
import { MaxWidthContainer } from './MaxWidthContainer'

export const MaxWidthFlex = styled(MaxWidthContainer)<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.column ? 'column' : 'row')};
`