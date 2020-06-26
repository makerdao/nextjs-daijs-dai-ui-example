import { PublicService } from '@makerdao/services-core';

export default class PollingService extends PublicService {
  constructor(name = 'polling') {
    super(name, ['web3', 'smartContract']);
  }

  /**Event History */
  async getPollCreatedEvents() {
    const web3 = this.get('web3');
    const pollingContract = web3.eth.Contract(this._polling.address)
    const me = this.get('accounts').currentAccount().address;
    const logs = await pollingContract.getPastEvents('pollCreated');

    console.log("logs here --", logs)

    return logs;
  }


  /**Polling Methods */
   vote(pollId, optionId) {
        this._polling().vote(pollId,optionId);
   }

  _polling() {
    return this.get('smartContract').getContractByName('POLLING');
  }

}
