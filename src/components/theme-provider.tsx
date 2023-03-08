'use client'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import extendTheme from '@citric/core/dist/extend-theme'

interface Props {
  children: React.ReactElement
}

const theme = extendTheme({
  component: {
    Container: {
      overwrite: {
        maxWidth: '1300px',
      },
    },
  },
})

const ThemeProvider = ({ children }: Props) => {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}

export default ThemeProvider
