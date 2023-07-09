import React from 'react'
import { SPACING } from '../../theme/theme'
import styled from "styled-components";

const SpacingView = styled.div<{ x: number }>`
  height: ${(p) => p.x * SPACING}px;
  width: ${(p) => p.x * SPACING}px;
`
type Props = { x: number }
const Spacer = ({ x }: Props) => {
  return <SpacingView x={x} />
}

export default Spacer
