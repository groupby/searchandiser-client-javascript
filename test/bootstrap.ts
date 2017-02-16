import rootApi from '../src';

rootApi.interceptor((req, res, next) => next('intercept'));
