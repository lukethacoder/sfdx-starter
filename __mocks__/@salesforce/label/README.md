# @salesforce/label

Each label should have its own file with a default export of the label value:

## Mock file

```js
// ./__mocks__/@salesforce/label/c.Save.js
export default 'Save'
```

## Usage

```js
// In your LWC components
import Save from '@salesforce/label/c.Save'
```
