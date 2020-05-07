import makerTheme from '@makerdao/dai-ui-theme-maker';
import { icons } from '@makerdao/dai-ui-icons';

const theme = {
  ...makerTheme,
  icons,
  /* Default styles can be overridden here 
    and later published as an npm package if desired. */
  layout: {
    container: { ...makerTheme.layout.container, pt: 2 },
  },
};

export default theme;
