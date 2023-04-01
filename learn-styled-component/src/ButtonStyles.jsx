import styled from 'styled-components'

export const PrimaryButton = styled.button`
  border: 1px solid grey;
  font-size: 15px;
  padding: 5px;
  border-color: ${ (props) => props.borderRed ? 'red' : '' };

  span {
    display: inline-block;
  }
  @media (max-width: 767px) {
    background-color: red;
  }
`
export const YellowButton = styled(PrimaryButton)`
  color: yellow;
  background-color: black;
`
export const LinkComponent = ({ className, children, href, borderRed }) => (
  <PrimaryButton as="a" borderRed={borderRed} className={className + ' my-button'} href={href}>
    {children}
  </PrimaryButton>
)

export const LinkComponent2 = ({ className, children, href, borderRed }) => (
  <PrimaryButton as="a" borderRed={borderRed} className={className} href={href}>
    {children}
  </PrimaryButton>
)
export const LinkComponent22 = styled(LinkComponent2)`
  color: red;
`
