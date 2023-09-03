import { LightningElement, wire } from 'lwc'

import apex_method from '@salesforce/apex/Apex.method'

export default class WireMethod extends LightningElement {
  @wire(apex_method, { value: 'test' })
  value
}
