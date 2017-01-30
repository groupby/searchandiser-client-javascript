import { expect } from 'chai';
import { test } from 'groupby-client-core';
import rootApi from '../src';
import Refinements from '../src/refinements';
import { middleware, validation } from './_suite';

const api = rootApi.searchandiser.refinements;

describe('refinements action', () => {
  it('should accept a navigationName', (done) => {
    api('brand')
      .end((err, res) => {
        expect(res.req.ctx.body).to.eql({ navigationName: 'brand' });
        done();
      });
  });

  it('should accept a query object', (done) => {
    const query = {
      navigationName: 'color',
      originalQuery: { a: 'b' }
    };
    api(query)
      .end((err, res) => {
        expect(res.req.ctx.body).to.eq(query);
        done();
      });
  });

  it('should have a builder', () => {
    expect(api.Builder).to.be.ok;
    expect(api.Builder).to.eq(Refinements.RequestBuilder);
  });

  test.itShouldAcceptBuilder(api, new api.Builder()
    .navigationName('brand')
    .originalQuery({ query: 'boots' }),
    {
      navigationName: 'brand',
      originalQuery: { query: 'boots' }
    });

  describe('builder', () => {
    describe('navigationName()', () => {
      test.itShouldSet(api.Builder, 'navigationName', 'brand', { navigationName: 'brand' });
    });

    describe('originalQuery()', () => {
      test.itShouldSet(api.Builder, 'originalQuery', { query: 'b' }, { originalQuery: { query: 'b' } });
    });
  });

  describe('middleware', () => {
    middleware(rootApi, 'refinements');

    it.skip('should set clientKey from root store', (done) => {
      const clientKey = 'myClientKey';
      rootApi.getStore().map = { clientKey };

      rootApi.searchandiser.search().send({})
        .end((err, res) => {
          expect(res.req.body).to.eql({ originalQuery: { clientKey } });
          done();
        });
    });
  });

  describe('validation', () => {
    validation(api);

    test.itShouldFailValidation(api, {}, 'body validation error: must provide navigationName');

    // tslint:disable:max-line-length
    test.itShouldFailValidation(api, { navigationName: 'brand' }, 'body validation error: must provide originalQuery');

    test.itShouldFailValidation(api, { navigationName: 'brand', originalQuery: {} }, 'body validation error: must provide valid clientKey');
    // tslint:enable:max-line-length

    test.itShouldPassValidation(api, { navigationName: 'brand', originalQuery: { clientKey: 'AAA' } });
  });
});
