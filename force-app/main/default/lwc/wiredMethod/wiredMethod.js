import { LightningElement, wire } from 'lwc'

import getAccountsList from '@salesforce/apex/AccountController.getAccounts'

export default class WireMethod extends LightningElement {
  @wire(getAccountsList, {
    parentAccountName: 'test',
  })
  wiredGetAccountsList(response) {
    const { error, data } = response
    if (data) {
      this.value = data[0].Id
    } else if (error) {
      console.error('Error fetching accounts ', error)
      this.errorMessage = 'Unable to fetch accounts'
    }
  }
}
