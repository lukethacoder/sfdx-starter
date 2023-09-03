import { createElement } from 'lwc'

import apex_method from '@salesforce/apex/Apex.method'

import { timeout } from 'c/utils'

import WiredMethod from '../wiredMethod'

jest.mock(
  '@salesforce/apex/Apex.method',
  () => {
    const {
      createApexTestWireAdapter,
    } = require('@salesforce/wire-service-jest-util')
    return {
      default: createApexTestWireAdapter(jest.fn()),
    }
  },
  { virtual: true }
)

it('set response from @wire method', async () => {
  const element = createElement('lwc-component', {
    is: WiredMethod,
  })
  document.body.appendChild(element)

  expect(element.shadowRoot.querySelector('p').textContent).toBe('')

  apex_method.emit('test')
  await timeout()

  expect(element.shadowRoot.querySelector('p').textContent).toBe('test')
})
