import { theon } from 'groupby-client-core';
import Refinements from './refinements';
import Search from './search';

namespace Cors {
  export interface Constructor {
    (https?: boolean): Api & theon.Request;
  }

  export interface Api extends theon.Request, Constructor {
    search: Search.Api;
    refinements: Refinements.Api;
  }

  export const api = theon()
    .collection('cors')
    .useConstructor(corsConstructor);

  api.action(Refinements.api);
  api.action(Search.api);
}

export default Cors;

function corsConstructor(this: theon.Request, https?: boolean) {
  if (https) {
    this.getRoot().getStore().set('https', true);
  }
}
