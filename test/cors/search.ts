import { test } from 'groupby-client-core';
import rootApi from '../../src';
import { validation } from '../_suite';

const api = rootApi.searchandiser.cors.search;

describe('cors search action', () => {
  describe('validation', () => {
    validation(api);

    test.itShouldPassValidation(api, {});
  });
});
