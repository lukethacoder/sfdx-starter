/**
 * Handle all getRecord requests here. If not mocked,
 * return { data: undefined, error: undefined }
 *
 * @param {Function} dataCallback Method to call to act as the callback for the getRecord method
 * @param {object} config Config passed to the getRecord method
 */
const getRecordHandler = (dataCallback, config) => {
  // TODO: custom logic here to suit your needs
  if (config?.recordId === 'luke-test') {
    dataCallback({
      data: {
        apiName: 'Account',
        childRelationships: {},
        fields: {
          Id: {
            displayValue: null,
            value: '0011m0000000000000',
          },
          Name: {
            displayValue: null,
            value: 'Test Account',
          },
        },
        id: '0011m0000000000000',
      },
      error: undefined,
    })
  } else if (config?.recordId === 'error') {
    dataCallback({
      data: undefined,
      error: {
        status: 500,
        body: {
          exceptionType: 'Generic getRecord Error (mock)',
          isUserDefinedException: true,
          message: 'Specify a valid "recordId".',
          stackTrace: '(System Code)\nClass.getRecord',
        },
        headers: {},
        ok: false,
        statusText: 'Server Error',
        errorType: 'fetchResponse',
      },
    })
    // TODO: can add more logic here to determine what your mocks respond with
  } else {
    dataCallback({
      data: undefined,
      error: undefined,
    })
  }
}

export default getRecordHandler
