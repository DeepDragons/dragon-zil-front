import React from 'react';
import { useRouter } from 'next/router';
import { BrowserView } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

import styled from 'styled-components';
import Link from 'next/link';

import { ConnectZIlPay } from 'components/connect-zilpay';

import { Text } from 'components/text';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1200px;
  width: 90%;
  margin-top: 40px;

  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;
export const Logo = styled.div`
  display: flex;
  cursor: pointer;

  @media (max-width: 835px) {
    margin: 0;
  }
`;
export const Ul = styled.ul`
  display: flex;
`;
export const Li = styled.li`
  margin-left: 40px;
  margin-right: 40px;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansRegular};
  line-height: 30px;

  border-bottom: 2px solid
    ${(props: { selected: boolean }) =>
      props.selected ? Colors.Info : Colors.Black};

  @media (max-width: 1056px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  @media (max-width: 835px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const links = [
  {
    path: '/buy',
    name: 'store',
  },
  {
    path: '/mydragons',
    name: 'my_dragons',
  },
  {
    path: '/fights',
    name: 'fights',
  },
  {
    path: '/breed',
    name: 'breed',
  },
  {
    path: '/trade',
    name: 'market',
  },
];

export const Navbar: React.FC = () => {
  const common = useTranslation('common');
  const router = useRouter();

  return (
    <Container>
      <Link href="/">
        <Logo>
          <img
            src="/icons/logo.png"
            alt="Logo"
            height="40"
          />
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            css="margin-left: 5px;"
          >
            {common.t('name')}
          </Text>
        </Logo>
      </Link>
      <BrowserView>
        <Ul>
          {links.map((link, index) => (
            <Li
              key={index}
              selected={router.pathname === link.path}
            >
              <Link href={link.path}>{common.t(link.name)}</Link>
            </Li>
          ))}
        </Ul>
      </BrowserView>
      <ConnectZIlPay/>
    </Container>
  );
};
