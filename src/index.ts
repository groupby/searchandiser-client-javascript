import { clone, middleware, renderAll, theon, validators } from 'groupby-client-core';
import Cors from './cors';
import Refinements from './refinements';
import client from './root';
import Search from './search';

client.collection(Cors.api);
// tslint:disable:max-line-length
Refinements.applyValidators(client.action(clone(Refinements.api)))
  // .useEntity(middleware.setFromStore('clientKey', 'originalQuery.clientKey'))
  .validator(validators.bodyValidator('originalQuery', (originalQuery) => !!originalQuery, 'must provide originalQuery'))
  .validator(validators.bodyValidator('originalQuery.clientKey', (clientKey) => !!clientKey, 'must provide valid clientKey'));
client.action(clone(Search.api))
  // .useEntity(middleware.setFromStore('clientKey'))
  .validator(validators.bodyValidator('clientKey', (clientKey) => !!clientKey, 'must provide valid clientKey'));
// tslint:enable:max-line-length

export default renderAll<{ searchandiser: Api } & theon.Request>(client);

export { client };

export interface Constructor {
  (customerId?: string, clientKey?: string): Api;
}

export interface Api extends theon.Request, Constructor {
  cors: Cors.Api;
  search: Search.Api;
  refinements: Refinements.Api;
}
