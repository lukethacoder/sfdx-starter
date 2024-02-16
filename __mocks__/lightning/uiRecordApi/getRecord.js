// https://developer.salesforce.com/docs/platform/lwc/guide/reference-wire-adapters-record.html
import getRecordHandler from './getRecordHandler'

// NOTE: getRecord should be called via @wire
export default class getRecord {
  connected = false
  cachedConfig = {}

  constructor(dataCallback) {
    this.dataCallback = dataCallback
  }

  connect() {
    this.connected = true
    this.runMethod(this.cachedConfig)
  }

  disconnect() {
    this.connected = false
  }

  update(config) {
    // check if the config has changed, if not, no need to re-run the method
    if (Object.keys(config).filter((key) => this.isDiff(config, key))) {
      this.runMethod(config)
      this.cachedConfig = config
    }
  }

  isDiff = (config, key) => this.cachedConfig[key] !== config[key]

  runMethod(config) {
    const { connected } = this

    if (connected) {
      getRecordHandler(this.dataCallback, config)
    }
  }
}
