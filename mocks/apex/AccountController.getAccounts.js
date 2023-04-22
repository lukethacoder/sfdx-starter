/**
 * https://lwc.dev/guide/wire_adapter#wire-adapters
 */
export default class getAccounts {
  connected = false
  parentAccountName

  constructor(dataCallback) {
    this.dataCallback = dataCallback
  }

  connect() {
    this.connected = true
    this.provideAccountName(this.parentAccountName)
  }

  disconnect() {
    this.connected = false
  }

  update(config) {
    if (this.parentAccountName !== config.parentAccountName) {
      this.parentAccountName = config.parentAccountName
      this.provideAccountName(this.parentAccountName)
    }
  }

  provideAccountName() {
    if (this.connected && this.parentAccountName !== undefined) {
      this.dataCallback({
        data: [{ Id: 'ACCOUNT_ID', Name: `${this.parentAccountName} Child` }],
        error: undefined,
      })
    }
  }
}
