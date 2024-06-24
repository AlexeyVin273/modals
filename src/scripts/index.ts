import { initModals } from './modules/modals/init-modals'
import { mobileVhFix } from './utils/mobile-vh-fix'
import { initDropdown } from './modules/dropdown/dropdown'

mobileVhFix()
document.addEventListener(
  'DOMContentLoaded',
  () => {
    initModals()
    initDropdown()
  },
  true
)
