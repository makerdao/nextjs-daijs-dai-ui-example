// import makerTheme from '@makerdao/dai-ui-theme-maker';
import makerTheme from '@makerdao/dai-ui-theme-maker-neue';
import { icons as standardIcons } from '@makerdao/dai-ui-icons';
import { icons as brandIcons } from '@makerdao/dai-ui-icons-branding';

const icons = { ...standardIcons, ...brandIcons };

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
