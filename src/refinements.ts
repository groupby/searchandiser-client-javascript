import { constructors, theon, validators, BaseConstructor, Builder, BUILDER } from 'groupby-client-core';
import Search from './search';

namespace Refinements {
  export interface Constructor extends BaseConstructor<Request, Api, RequestBuilder> { }

  export interface Api extends theon.Request, Constructor { }

  export interface Request {
    navigationName?: string;
    originalQuery?: Search.Request;
  }

  export class RequestBuilder extends Builder<Request> {
    navigationName(navigationName: string) {
      return this.set('navigationName', navigationName);
    }

    originalQuery(request: Search.Request) {
      return this.set('originalQuery', request);
    }
  }

  export function applyValidators(client: theon.entities.Client) {
    return client
      // tslint:disable-next-line:max-line-length
      .validator(validators.bodyValidator('navigationName', (navigationName) => !!navigationName, 'must provide navigationName'));
  }

  export const api = applyValidators(theon()
    .action('refinements')
    .basePath('/refinements')
    .useConstructor(constructors.queryConstructor((navigationName) => ({ navigationName }))));
  // .use(setFromStore('clientKey', 'originalQuery.clientKey'));

  api[BUILDER] = RequestBuilder;
}

export default Refinements;
