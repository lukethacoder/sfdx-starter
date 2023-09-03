import { LightningElement, api } from 'lwc'

import { timeout } from 'c/utils'

export default class HelloWorld extends LightningElement {
  @api
  get text() {
    return this._text
  }
  set text(value) {
    this.handleSetValue(value)
  }

  _text

  handleSetValue = async (value) => {
    await timeout(0)
    this._text = value
  }
}
