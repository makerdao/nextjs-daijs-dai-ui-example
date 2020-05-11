const withMDX = require('@next/mdx')();

module.exports = withMDX({
  env: {
    IPFS: process.env.IPFS,
  },
});
