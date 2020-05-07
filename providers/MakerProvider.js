import React, { createContext, useState, useEffect } from 'react';
import { instantiateMaker } from '../maker';

export const MakerObjectContext = createContext();

function MakerProvider({ children, network }) {
  const [maker, setMaker] = useState(null);
  const [web3Connected, setWeb3Connected] = useState(null);

  const connectBrowserWallet = async () => {
    try {
      if (maker) {
        await maker.authenticate();
        const { networkName } = maker.service('web3');
        if (network === 'mainnet' && networkName !== 'mainnet') {
          return window.alert(
            "Please connect your wallet to mainnet to use this app. Or, if you'd like to try this app on the Kovan test network, add ?network=kovan to the end of the URL."
          );
        }

        setWeb3Connected(true);
      }
    } catch (err) {
      window.alert(
        'There was a problem connecting to your wallet, please reload and try again.'
      );
    }
  };

  useEffect(() => {
    instantiateMaker(network).then((maker) => {
      setMaker(maker);
    });
  }, [network]);

  const fetchTokenBalance = (token) => {
    return maker.service('token').getToken(token).balance();
  };

  return (
    <MakerObjectContext.Provider
      value={{
        maker,
        network,
        web3Connected,
        connectBrowserWallet,
        fetchTokenBalance,
      }}
    >
      {children}
    </MakerObjectContext.Provider>
  );
}

export default MakerProvider;
