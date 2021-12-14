import useVisibility from 'hooks/useVisibility'

export interface IUseProfileMobileMenu {
  profileMobileMenuVisible: boolean
  toggleProfileMobileMenu(): void
  showProfileMobileMenu(): void
  hideProfileMobileMenu(): void
}

const useProfileMobileMenu = (): IUseProfileMobileMenu => {
  
  const { visible, show, hide, toggle } = useVisibility()

  return {
    profileMobileMenuVisible: visible,
    showProfileMobileMenu: show,
    hideProfileMobileMenu: hide,
    toggleProfileMobileMenu: toggle,
  }
}

export default useProfileMobileMenu
