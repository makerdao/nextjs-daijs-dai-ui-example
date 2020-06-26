import { map, prop } from 'ramda';
import PollingService from './PollingService';
import { createCurrency } from '@makerdao/currency';

const POLLING = 'POLLING';

export default {
  // The second parameter for this function is an optional object containing additional config parameters
  // See the maker.js file for how it is used.
  addConfig: function (config) {
    // Store contract names and addresses as demonstrated in the files below
    const contractAddresses = {
      mainnet: require('./contracts/addresses/mainnet.json'),
      kovan: require('./contracts/addresses/kovan.json'),
    };

    // For each contract that you want to add, include the abi and address
    const addContracts = {
      [POLLING]: {
        address: map(prop('POLLING'), contractAddresses),
        abi: require('./contracts/abis/Polling.json'),
      },
    };

    // To add Erc20 tokens, first create a currency function for the token...
    //const MOCK = createCurrency('MOCK');

    // Then include it with the SDK config object
    //const token = {
    //  erc20: [{ currency: MOCK, address: addContracts.MOCK.address }],
    //};

    const makerConfig = {
      ...config,
      additionalServices: ['polling'], // this tells the SDK which service names to look for
      custom: [PollingService], // each new service must be added to the config keyed by its name
      smartContract: { addContracts }
    };

    return makerConfig;
  },
};
