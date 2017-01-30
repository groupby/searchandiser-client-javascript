import { expect } from 'chai';
import { test } from 'groupby-client-core';
import rootApi from '../src';
import Search from '../src/search';
import { middleware, validation } from './_suite';

const api = rootApi.searchandiser.search;

describe('search action', () => {
  it('should accept a query string', (done) => {
    api('teddy bear')
      .end((err, res) => {
        expect(res.req.ctx.body).to.eql({ query: 'teddy bear' });
        done();
      });
  });

  it('should accept a query object', (done) => {
    const query = {
      query: 'teddy bear',
      area: 'dev'
    };

    api(query)
      .end((err, res) => {
        expect(res.req.ctx.body).to.eq(query);
        done();
      });
  });

  it('should have a builder', () => {
    expect(api.Builder).to.be.ok;
    expect(api.Builder).to.eq(Search.RequestBuilder);
  });

  test.itShouldAcceptBuilder(api, new api.Builder()
    .query('red shoes')
    .area('MyArea'),
    {
      query: 'red shoes',
      area: 'MyArea'
    });

  describe('builder', () => {
    describe('query()', () => {
      test.itShouldSet(api.Builder, 'query', 'red boots', { query: 'red boots' });
    });

    describe('userId()', () => {
      test.itShouldSet(api.Builder, 'userId', '1337', { userId: '1337' });
    });

    describe('language()', () => {
      test.itShouldSet(api.Builder, 'language', 'lang_en', { language: 'lang_en' });
    });

    describe('collection()', () => {
      test.itShouldSet(api.Builder, 'collection', 'mycollection', { collection: 'mycollection' });
    });

    describe('area()', () => {
      test.itShouldSet(api.Builder, 'area', 'MyArea', { area: 'MyArea' });
    });

    describe('skip()', () => {
      test.itShouldSet(api.Builder, 'skip', 22, { skip: 22 });
    });

    describe('pageSize()', () => {
      test.itShouldSet(api.Builder, 'pageSize', 12, { pageSize: 12 });
    });

    describe('enableWildcardSearch()', () => {
      it('should set wildcardSearchEnabled', () => {
        const builder = new api.Builder().enableWildcardSearch();

        expect(builder.build()).to.eql({ wildcardSearchEnabled: true });
      });
    });

    describe('pruneRefinements()', () => {
      it('should set pruneRefinements', () => {
        const builder = new api.Builder().pruneRefinements();

        expect(builder.build()).to.eql({ pruneRefinements: true });
      });
    });

    describe('disableAutocorrection()', () => {
      it('should set disableAutocorrection', () => {
        const builder = new api.Builder().disableAutocorrection();

        expect(builder.build()).to.eql({ disableAutocorrection: true });
      });
    });
  });

  describe('middleware', () => {
    middleware(rootApi, 'search');

    it.skip('should set clientKey from root store', (done) => {
      const clientKey = 'myClientKey';
      rootApi.getStore().map = { clientKey };

      rootApi.searchandiser.search().send({})
        .end((err, res) => {
          expect(res.req.body).to.eql({ clientKey });
          done();
        });
    });
  });

  describe('validation', () => {
    validation(api);

    test.itShouldFailValidation(api, {}, 'body validation error: must provide valid clientKey');

    test.itShouldPassValidation(api, { clientKey: 'AAA' });
  });
});
