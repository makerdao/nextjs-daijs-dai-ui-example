const PollingEvents = artifacts.require('PollingEvents');

module.exports = async function (deployer) {
  await deployer.deploy(PollingEvents)

  const instance = await PollingEvents.deployed()
  const forwarderAddress = require('../build/gsn/Forwarder.json').address
  // const forwarderAddress = '0x6453D37248Ab2C16eBd1A8f782a2CBC65860E60B';
  // console.log('Instance ', instance);
  await instance.setTrustedForwarder(forwarderAddress)
  console.log(`Successfully set Trusted Forwarder (${forwarderAddress}) on Recipient (${instance.address})`)
}
