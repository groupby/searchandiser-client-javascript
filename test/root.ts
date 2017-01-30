import { expect } from 'chai';
import rootApi from '../src';

const api = rootApi.searchandiser;

describe('searchandiser api', () => {
  it('should have cors collection', () => {
    expect(api.cors).to.be.a('function');
  });

  it('should have search action', () => {
    expect(api.search).to.be.a('function');
  });

  it('should have refinements action', () => {
    expect(api.refinements).to.be.a('function');
  });

  describe('constructor()', () => {
    afterEach(() => rootApi.getStore().map = {});

    it('should accept a customerId', () => {
      const customerId = 'myCustomerId';
      const client = api(customerId);

      expect(client._client.store.get('customerId')).to.eq(customerId);
    });

    it('should accept a clientKey', () => {
      const clientKey = 'myClientKey';
      const client = api(null, clientKey);

      expect(client._client.store.get('clientKey')).to.eq(clientKey);
    });

    it('should accept a customerId and clientKey', () => {
      const customerId = 'myCustomerId';
      const clientKey = 'myClientKey';
      const client = api(customerId, clientKey);

      expect(client._client.store.get('customerId')).to.eq(customerId);
      expect(client._client.store.get('clientKey')).to.eq(clientKey);
    });
  });
});
