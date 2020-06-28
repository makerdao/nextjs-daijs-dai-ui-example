import Maker from '@makerdao/dai';
// import customPlugin from './plugin/index';
import governancePlugin from '@makerdao/dai-plugin-governance';

let maker;

export async function instantiateMaker() {
  const config = {
    log: true,
    autoAuthenticate: false,
    plugins: [[governancePlugin, { network: 'kovan' }]]
    // plugins: [[customPlugin, { customOption: 'test' }]], // config options can be passed to your plugin like this
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
