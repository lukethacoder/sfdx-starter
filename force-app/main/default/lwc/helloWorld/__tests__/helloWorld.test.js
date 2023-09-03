import { createElement } from 'lwc'

import { timeout } from 'c/utils'

import LwcComponent from '../helloWorld'

it('@api text populates DOM', async () => {
  const element = createElement('lwc-component', { is: LwcComponent })
  document.body.appendChild(element)

  // Assert
  const text = element.shadowRoot.querySelector('p')

  expect(text.textContent).toBe('Hello ')

  await timeout()

  element.text = 'World'
  await timeout()

  expect(text.textContent).toBe('Hello World')
})
