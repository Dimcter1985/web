import { useCallback, useState } from 'react'

export interface IUseVisibility {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  show: () => void
  hide: () => void
  toggle: () => void
}

const useVisibility = (initial = false): IUseVisibility => {
  const [visible, setVisible] = useState(initial)

  const hide = useCallback(() => { setVisible(false) }, [])
  const show = useCallback(() => { setVisible(true) }, [])
  const toggle = useCallback(() => { setVisible((v) => !v) }, [])

  return {
    visible,
    setVisible,
    show,
    hide,
    toggle,
  }
}

export default useVisibility
