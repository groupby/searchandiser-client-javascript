import { test } from 'groupby-client-core';
import rootApi from '../../src';
import { validation } from '../_suite';

const api = rootApi.searchandiser.cors.refinements;

describe('cors refinements action', () => {
  describe('validation', () => {
    validation(api);

    test.itShouldPassValidation(api, { navigationName: 'brand' });
  });
});
