/** @jsx jsx */
import { Container, jsx, NavLink, Flex } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import AccountConnect from './AccountConnect';

const Header = () => {
  return (
    <Container>
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Icon name="maker" size={5} />
        <Flex
          as="nav"
          sx={{
            ml: [0, 'auto'],
            mr: [null, 0],
          }}
        >
          <Link href="/">
            <NavLink href="/">Home</NavLink>
          </Link>
          <Link href="/about">
            <NavLink href="/about">About</NavLink>
          </Link>
          <Flex sx={{ ml: 2 }}>
            <AccountConnect />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
