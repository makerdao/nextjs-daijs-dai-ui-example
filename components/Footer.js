/** @jsx jsx */
import { jsx, Flex, NavLink, Link as ExternalLink, Container } from 'theme-ui';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container>
      <Flex
        as="nav"
        sx={{
          ml: [0, 'auto'],
          mr: [null, 0],
          justifyContent: 'flex-end',
        }}
      >
        <ExternalLink
          href="https://chat.makerdao.com/channel/help"
          target="_blank"
        >
          <NavLink
            variant="footer"
            sx={{
              px: [2, 3],
            }}
          >
            Chat
          </NavLink>
        </ExternalLink>

        <Link href="/terms">
          <NavLink
            variant="footer"
            sx={{
              px: [2, 3],
            }}
          >
            Terms of Service
          </NavLink>
        </Link>
        <Link href="/faq">
          <NavLink
            variant="footer"
            sx={{
              pl: [2, 3],
              mr: 5,
            }}
          >
            FAQ
          </NavLink>
        </Link>
      </Flex>
    </Container>
  );
};

export default Footer;
