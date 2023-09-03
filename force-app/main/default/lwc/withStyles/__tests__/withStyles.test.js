import { createElement } from 'lwc'

import { IS_NATIVE_SHADOW } from '../../../../../../testUtils'
import LwcComponent from '../withStyles'

it('component has expected styles', () => {
  const element = createElement('lwc-component', { is: LwcComponent })
  document.body.appendChild(element)

  const styleEl = IS_NATIVE_SHADOW ? element.shadowRoot : document.head
  const css = styleEl.querySelector('style').textContent

  if (IS_NATIVE_SHADOW) {
    expect(css).toEqual('p {color: burlywood;}')
  } else {
    expect(css).toContain('p[lwc-')
  }
})
