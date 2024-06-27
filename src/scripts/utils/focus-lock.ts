let focusableElements: HTMLElement[] = []
let focusedElement: HTMLElement = null

/**
 * An array of CSS selectors used to identify focusable elements.
 */
const selectors: string[] = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
]

/**
 * Locks the focus within a specified element and its focusable children.
 * @param { HTMLElement } element - The element to lock the focus within.
 * @param { boolean } startFocus - Optional. Determines whether to focus the first focusable element within the locked element. Defaults to `true`.
 */
function lockFocus(element: HTMLElement, startFocus: boolean = true): void {
  if (focusedElement !== null) {
    unlockFocus(false)
  }

  if (!element) {
    return
  }

  focusedElement = document.activeElement as HTMLElement
  focusableElements = Array.from(element.querySelectorAll(selectors.join(',')))

  if (focusableElements.length === 0) {
    return
  }

  if (startFocus) {
    focusableElements[0].focus()
  }

  document.addEventListener('keydown', trapFocus)
}

/**
 * Unlocks the focus and returns it to the previously focused element.
 * @param { boolean } returnFocus - Optional. Determines whether to return the focus to the previously focused element. Defaults to `true`.
 */
function unlockFocus(returnFocus: boolean = true): void {
  if (returnFocus && focusedElement) {
    focusedElement.focus()
  }

  focusedElement = null
  focusableElements = []
  document.removeEventListener('keydown', trapFocus)
}

/**
 * Handles the `keydown` event and moves the focus between the first and last focusable elements within the locked element
 * @param { KeyboardEvent } event - The `keydown` event.
 */
function trapFocus(event: KeyboardEvent): void {
  let isTabPressed = event.key === 'Tab'

  if (!isTabPressed) {
    return
  }

  if (event.shiftKey && document.activeElement === focusableElements[0]) {
    event.preventDefault()
    focusableElements[focusableElements.length - 1].focus()
    return
  }

  if (
    !event.shiftKey &&
    document.activeElement === focusableElements[focusableElements.length - 1]
  ) {
    event.preventDefault()
    focusableElements[0].focus()
  }
}

export { lockFocus, unlockFocus }
