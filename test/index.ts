import 'mocha';
import './cors';
import './refinements';
import './root';
import './search';

import rootApi from '../src';

rootApi.interceptor((req, res, next) => next('intercept'));
