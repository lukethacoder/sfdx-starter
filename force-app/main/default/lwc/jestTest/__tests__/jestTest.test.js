import communityId from '../../../../../../__mocks__/lwc/@salesforce/community/Id'
import { createElement } from 'lwc'

// Apex methods
import getAccountsList from '@salesforce/apex/AccountController.getAccounts'

import LwcComponent from 'c/jestTest'
import { timeout } from 'c/utils'

import { componentSetup } from '../../../../../../testUtils'

/* Component Setup */
const setup = () => {
  const element = createElement('lwc-component', {
    is: LwcComponent,
  })
  document.body.appendChild(element)
  return element
}

/* Apex Method Mocks */
jest.mock(
  '@salesforce/apex/AccountController.getAccounts',
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

const WIRE_INPUT_DEFAULT = {
  parentAccountName: 'Soda Strategic',
  communityId,
}

const TEST_ACCOUNTS = [
  {
    Id: 'soda-strategic',
    Name: 'Soda Strategic',
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

  it('test componentSetup with initialProps', async () => {
    const element = componentSetup('lwc-component', LwcComponent, {
      parentAccountName: 'Deloitte Digital',
    })

    expect(element.parentAccountName).toBe('Deloitte Digital')
  })

  it('gets called with a default configuration', async () => {
    setup()

    // Wait for any asynchronous DOM updates
    await timeout()

    // Check if the default object is passed as parameter
    expect(getAccountsList.getLastConfig()).toEqual(WIRE_INPUT_DEFAULT)
  })

  it('updates the wire parameter based on user input', async () => {
    const element = setup()

    // simulate element change
    element.parentAccountName = 'Google'

    // Wait for any asynchronous DOM updates
    await timeout()

    // Validate parameters of mocked Apex call
    expect(getAccountsList.getLastConfig()).toEqual({
      parentAccountName: 'Google',
      communityId,
    })
  })

  it('check DOM is updated with items', async () => {
    const element = setup()

    // Emit data from @wire
    getAccountsList.emit(TEST_ACCOUNTS)

    // Wait for any asynchronous DOM updates
    await timeout()

    // check the list has been rendered to the page
    const liEl = element.shadowRoot.querySelector('li')
    expect(liEl.textContent).toBe(TEST_ACCOUNTS[0].Name)
  })

  it('@wire: catch error response', async () => {
    const element = setup()

    // throw error from @wire
    getAccountsList.error()

    // Wait for any asynchronous DOM updates
    await timeout()

    // check the error has been displayed to the user
    const errorEl = element.shadowRoot.querySelector('[data-error]')
    expect(errorEl.textContent).toBe('Unable to fetch accounts')
  })

  it('value change on button click', async () => {
    const element = setup()

    // Assert
    const text = element.shadowRoot.querySelector('h1')
    expect(text.textContent).toBe('initial')

    const button = element.shadowRoot.querySelector('button')
    button.click()

    await timeout()

    expect(text.textContent).toBe('new-value')
  })
})
