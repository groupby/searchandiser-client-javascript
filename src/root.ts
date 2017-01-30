import { theon } from 'groupby-client-core';

const BASE_PATH = '/api/v1/search';

const api = theon()
  .collection('searchandiser')
  .basePath(BASE_PATH)
  .useConstructor(rootConsructor)
  .validator((req, res, next) => next(req.body ? undefined : new Error('request validation error: must provide body'))); // tslint:disable-line:max-line-length

export default api;

function rootConsructor(this: theon.Request, customerId?: string, clientKey?: string) {
  if (customerId) {
    this.getRoot().getStore().set('customerId', customerId);
  }
  if (clientKey) {
    this.getRoot().getStore().set('clientKey', clientKey);
  }
}
