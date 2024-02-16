// https://developer.salesforce.com/docs/platform/lwc/guide/reference-create-record.html
const createRecord = async (config) => {
  console.debug('(mock) createRecord ', config)

  // TODO: custom logic here to suit your needs
  // if (config?.apiName === 'Account') {}

  return {
    data: undefined,
    error: undefined,
  }
}
export default createRecord
