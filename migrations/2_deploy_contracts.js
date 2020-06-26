const Polling = artifacts.require('Polling');

module.exports = async function (deployer) {
  await deployer.deploy(Polling)

  const instance = await Polling.deployed()
  const forwarderAddress = require('../build/gsn/Forwarder.json').address
  await instance.setTrustedForwarder(forwarderAddress)
  console.log(`Successfully set Trusted Forwarder (${forwarderAddress}) on Recipient (${instance.address})`)
}
