import Maker from '@makerdao/dai';

let maker;

// For testing;
export function getMaker() {
  //   assert(maker, 'Maker has not been instantiated');
  return maker;
}

export async function instantiateMaker() {
  const config = {
    log: true,
    autoAuthenticate: false,
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
