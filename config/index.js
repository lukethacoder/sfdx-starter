import App from 'base/app'

import { createElement } from 'lwc'

document
  .getElementById('main')
  .appendChild(createElement('base-app', { is: App }))
