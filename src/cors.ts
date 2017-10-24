import { theon, CUSTOMERID_TOKEN } from 'groupby-client-core';
import Refinements from './refinements';
import Search from './search';

const CORS = 'cors';

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
  this.getRoot().ctx.opts.rootUrl = this.getRoot().ctx.opts.rootUrl
    .replace(CUSTOMERID_TOKEN, `${CUSTOMERID_TOKEN}-${CORS}`);
  // this.getRoot().ctx.opts.rootUrl = this.getRoot().ctx.opts.rootUrl
  //   .replace(/:\/\/(\S*?).groupbycloud\.com/, `://$1-${CORS}.groupbycloud.com`);
}
