var HDWalletProvider = require('truffle-hdwallet-provider');
var kovanUrl = "https://kovan.infura.io/v3/11465e3f27b247eb8b785c23047b29fd";

module.exports = {
  networks: {
    kovan: {
      provider: () => new HDWalletProvider('771B81A8691AE7E06142970BEDA4BB79B896FDD7DDC0D3442423771C32098FB5', kovanUrl),
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
