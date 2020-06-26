var HDWalletProvider = require('truffle-hdwallet-provider');
var kovanUrl = "https://kovan.infura.io/v3/c3422181d0594697a38defe7706a1e5b";

module.exports = {
  networks: {
    kovan: {
      provider: () => new HDWalletProvider('add-privage-key', kovanUrl),
      network_id: 42
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
   }
 }
};
