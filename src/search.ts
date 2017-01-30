import { constructors, theon, BaseConstructor, Builder, BUILDER } from 'groupby-client-core';

namespace Search {
  export interface Constructor extends BaseConstructor<Request, Api, RequestBuilder> { }

  export interface Api extends theon.Request, Constructor { }

  export interface Request {
    // authentication
    customerId?: string;
    clientKey?: string;

    // query parameters
    query?: string;
    // refinements?: SelectedRefinement[];

    // query configuration
    fields?: string[];
    orFields?: string[];
    includedNavigations?: string[];
    excludedNavigations?: string[];
    // sort?: Sort[];
    // customUrlParams?: CustomUrlParam[];
    // restrictNavigation?: RestrictNavigation;
    // biasing?: Biasing;
    // matchStrategy?: MatchStrategy;

    // configuration
    userId?: string;
    language?: string;
    collection?: string;
    area?: string;
    biasingProfile?: string;

    // paging
    skip?: number;
    pageSize?: number;

    // format
    returnBinary?: boolean;
    pruneRefinements?: boolean;
    disableAutocorrection?: boolean;
    wildcardSearchEnabled?: boolean;
  }

  export class RequestBuilder extends Builder<Request> {
    // query
    query(query: string) {
      return this.set('query', query);
    }

    // configuration
    userId(userId: string) {
      return this.set('userId', userId);
    }
    language(language: string) {
      return this.set('language', language);
    }
    collection(collection: string) {
      return this.set('collection', collection);
    }
    area(area: string) {
      return this.set('area', area);
    }

    // paging
    skip(skip: number) {
      return this.set('skip', skip);
    }
    pageSize(pageSize: number) {
      return this.set('pageSize', pageSize);
    }

    // format
    enableWildcardSearch() {
      return this.set('wildcardSearchEnabled', true);
    }
    pruneRefinements() {
      return this.set('pruneRefinements', true);
    }
    disableAutocorrection() {
      return this.set('disableAutocorrection', true);
    }
  }

  export const api = theon()
    .action('search')
    .useConstructor(constructors.queryConstructor((query) => ({ query })));

  api[BUILDER] = RequestBuilder;
}

export default Search;
