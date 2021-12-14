import { useEffect, useMemo } from 'react'
import throttle from 'lodash/throttle'
import useVisibility from 'hooks/useVisibility'
import { FOOTER_ID } from 'widgets/Footer'

const UPDATE_DELAY = 200

const useFooterReached = (): boolean => {
  const { visible, show, hide } = useVisibility(true)

  const changeScrollPosition = useMemo(() => throttle(() => {
    if (!document.getElementById(FOOTER_ID)) { return }
    
    const moreThenFooter = 
      window.screen.height + window.scrollY
      >
      document.body.scrollHeight - document.getElementById(FOOTER_ID)!.scrollHeight

    if (moreThenFooter) {
      hide()
    } else {
      show()
    }
  }, UPDATE_DELAY), [show, hide])


  useEffect(() => {
    document.addEventListener('scroll', changeScrollPosition)
    return (): void => {
      if (document) document.removeEventListener('scroll', changeScrollPosition)
    }
  }, [])

  return visible
}

export default useFooterReached
