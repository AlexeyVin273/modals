// import { initModals } from './modules/modals/init-modals._ts'
import { initModals } from './modules/modals/modals'
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
