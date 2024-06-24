import { lockFocus, unlockFocus } from 'src/scripts/utils/focus-lock'

function initDropdown(): void {
  const dropdowns = document.querySelectorAll('[data-dropdown]')
  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector('[data-dropdown-btn]')
    dropdownToggle.addEventListener('click', onDropdownToggleClick)
  })
}

function onDropdownToggleClick(event: MouseEvent): void {
  const dropdownToggle = event.target as HTMLElement
  const dropdown = dropdownToggle.closest('[data-dropdown]')
  const dropdownContent = dropdown.querySelector(
    '[data-dropdown-content]'
  ) as HTMLElement
  const isDropdownActive = dropdownContent.classList.contains('is-active')

  closeDropdowns()

  if (!isDropdownActive) {
    openDropdown(dropdownContent)
  }
}

function closeDropdowns(): void {
  const dropdownMenus = document.querySelectorAll('[data-dropdown-content]')
  dropdownMenus.forEach((dropdownMenu) => {
    dropdownMenu.classList.remove('is-active')

    const closeToggles = dropdownMenu.querySelectorAll('[data-dropdown-close]')
    closeToggles.forEach((closeToggle) => {
      closeToggle.addEventListener('click', onCloseClick)
    })
  })

  unlockFocus()
}

function openDropdown(dropdownContent: HTMLElement): void {
  dropdownContent.classList.add('is-active')
  lockFocus(dropdownContent)

  const closeToggles = dropdownContent.querySelectorAll('[data-dropdown-close]')
  closeToggles.forEach((closeToggle) => {
    closeToggle.addEventListener('click', onCloseClick)
  })
}

function onCloseClick(): void {
  closeDropdowns()
}

export { initDropdown }
