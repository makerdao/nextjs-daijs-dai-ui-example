import Maker from '@makerdao/dai';
import pollingPlugin from './plugin/index';

let maker;

export async function instantiateMaker() {
  const config = {
    log: true,
    autoAuthenticate: false,
    plugins: [[pollingPlugin]]
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
