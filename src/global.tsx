import { css, Global } from '@emotion/react'

const GlobalStyles = () => {
  return (
    <Global styles={css`
      body {
        width: 100%
      }
    `} />
  )
}

export default GlobalStyles;
