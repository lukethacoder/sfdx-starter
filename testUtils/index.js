import { createElement } from 'lwc'

// check if we are running with nativeShadow enabled or not
export const IS_NATIVE_SHADOW = global['lwc-jest'].nativeShadow

// Helper method to initialize the LWC component in the DOM
export function componentSetup(componentName, component, initialProps = {}) {
  const element = createElement(componentName, {
    is: component,
  })

  Object.keys(initialProps).forEach((property) => {
    element[property] = initialProps[property]
  })

  document.body.appendChild(element)
  return element
}
