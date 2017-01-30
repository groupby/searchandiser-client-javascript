import { expect } from 'chai';
import rootApi from '../../src';

const api = rootApi.searchandiser.cors;

describe('cors collection', () => {
  it('should have search action', () => {
    expect(api.search).to.be.a('function');
  });

  it('should have refinements action', () => {
    expect(api.refinements).to.be.a('function');
  });

  describe('constructor()', () => {
    afterEach(() => rootApi.getStore().map = {});

    it('should accept https flag', () => {
      const client = api(true);

      expect(client._client.store.get('https')).to.be.true;
    });
  });
});
