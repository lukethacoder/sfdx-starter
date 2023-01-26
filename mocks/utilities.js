import { createElement } from 'lwc'

// Helper function to wait until the microtask queue is empty. This is needed for promise
// timing when calling imperative Apex.
export async function flushPromises() {
  return Promise.resolve()
}

// Helper method to initialize the LWC component in the DOM
export function componentSetup(componentName, component) {
  const element = createElement(componentName, {
    is: component,
  })
  document.body.appendChild(element)
  return element
}
