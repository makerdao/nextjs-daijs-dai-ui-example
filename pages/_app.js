import App from 'next/app';
import MakerProvider from '../providers/MakerProvider';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class MyApp extends App {
  state = {
    network: '',
  };

  componentDidMount() {
    let network;
    if (window.location.search.includes('kovan')) {
      network = 'kovan';
    } else if (window.location.search.includes('testnet')) {
      network = 'testnet';
    } else {
      network = 'mainnet';
    }
    this.setState({
      network,
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    const { network } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <MakerProvider network={network}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </MakerProvider>
      </ThemeProvider>
    );
  }
}
