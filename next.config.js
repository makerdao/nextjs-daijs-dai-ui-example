const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    IPFS: process.env.IPFS,
  },
});
