import { LightningElement, api, wire } from 'lwc'

import communityId from '@salesforce/community/Id'

import getAccountsList from '@salesforce/apex/AccountController.getAccounts'

export default class JestTestingExample extends LightningElement {
  @api parentAccountName = 'Soda Strategic'

  errorMessage
  value = 'initial'
  accounts = []

  @wire(getAccountsList, {
    parentAccountName: '$parentAccountName',
    communityId: communityId,
  })
  wiredGetAccountsList(response) {
    const { error, data } = response
    if (data) {
      this.accounts = data
    } else if (error) {
      console.error('Error fetching accounts ', error)
      this.errorMessage = 'Unable to fetch accounts'
    }
  }

  handleClickButton = () => {
    this.value = 'new-value'
  }
}
