import { createElement } from 'lwc'
import LwcComponent from 'c/jestTest'

// Jest Utilities
import {
  componentSetup,
  flushPromises,
} from '../../../../../../mocks/utilities'
import communityIdMock from '../../../../../../mocks/lwc/@salesforce/community/Id'

// Apex methods
import getAccountsList from '@salesforce/apex/AccountController.getAccounts'

/* Component Setup */
const LWC_COMPONENT = 'c-jest-testing-example'
const setup = () => componentSetup(LWC_COMPONENT, LwcComponent)

/* Apex Method Mocks */
jest.mock(
  '@salesforce/apex/AccountController.getAccounts',
  () => {
    const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest')
    return {
      default: createApexTestWireAdapter(jest.fn()),
    }
  },
  { virtual: true }
)

const WIRE_INPUT_DEFAULT = {
  parentAccountName: 'Soda Strategic',
  communityId: communityIdMock,
}

const TEST_ACCOUNTS = [
  {
    id: 'soda-strategic',
    name: 'Soda Strategic',
  },
]

/* Jest Tests */
describe('c-jest-test', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild)
    }
    // Prevent data saved on mocks from leaking between tests
    jest.clearAllMocks()
  })

  it('gets called with a default configuration', async () => {
    setup()

    // Wait for any asynchronous DOM updates
    await flushPromises()

    // Check if the default object is passed as parameter
    expect(getAccountsList.getLastConfig()).toEqual(WIRE_INPUT_DEFAULT)
  })

  it('updates the wire parameter based on user input', async () => {
    const element = setup()

    // simulate element change
    element.parentAccountName = 'Google'

    // Wait for any asynchronous DOM updates
    await flushPromises()

    // Validate parameters of mocked Apex call
    expect(getAccountsList.getLastConfig()).toEqual({
      parentAccountName: 'Google',
      communityId: communityIdMock,
    })
  })

  it('check DOM is updated with items', async () => {
    const element = setup()

    // Emit data from @wire
    getAccountsList.emit(TEST_ACCOUNTS)

    // Wait for any asynchronous DOM updates
    await flushPromises()

    // Return a promise to wait for any asynchronous DOM updates. Jest
    // will automatically wait for the Promise chain to complete before
    // ending the test and fail the test if the promise rejects.
    return Promise.resolve().then(() => {
      // check the list has been rendered to the page
      const liEl = element.shadowRoot.querySelector('li')
      expect(liEl.textContent).toBe(TEST_ACCOUNTS[0].id)
    })
  })

  it('value change on button click', () => {
    const element = setup()

    // Assert
    const text = element.shadowRoot.querySelector('h1')
    expect(text.textContent).toBe('initial')

    const button = element.shadowRoot.querySelector('button')
    button.click()

    return Promise.resolve().then(() => {
      expect(text.textContent).toBe('new-value')
    })
  })
})
