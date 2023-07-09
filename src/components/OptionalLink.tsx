import Link from 'next/link'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
`

type Props = { href?: string } & PropsWithChildren
const OptionalLink = ({ href, children }: Props) => {
  return href ? <StyledLink href={href}>{children}</StyledLink> : <>{children}</>
}

export default OptionalLink
