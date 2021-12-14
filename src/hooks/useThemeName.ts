import { useMemo } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { white } from 'core/theme/colors'

type TThemeColor = 'light' | 'dark'

const useThemeName = (): TThemeColor => {
  const theme = useTheme()

  const name: TThemeColor = useMemo(() => {
    if (theme.palette.text.primary === white) { return 'dark' }
    return 'light'
  }, [theme.palette.primary.main])

  return name
}

export default useThemeName
