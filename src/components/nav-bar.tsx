import React from 'react';
import { useRouter } from 'next/router';
import { BrowserView, MobileView } from 'react-device-detect';
import { useStore } from 'effector-react';

import styled from 'styled-components';
import Link from 'next/link';

import { ConnectZIlPay } from 'components/connect-zilpay';
import { Modal } from 'components/modal';
import { ModalItem } from 'components/mobile/modal-item';

import { Text } from 'components/text';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';
import { trim } from 'lib/trim';
import { $wallet } from 'store/wallet';
import { $net } from '@/store/wallet-netwrok';

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
const ModalContainer = styled.div`
  padding: 30px;
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
    name: 'Store',
  },
  {
    path: '/mydragons',
    name: 'My dragons',
  },
  {
    path: '/fights',
    name: 'Fights',
  },
  {
    path: '/breed',
    name: 'Breed',
  },
  {
    path: '/trade',
    name: 'Trade',
  },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const address = useStore($wallet);
  const netwrok = useStore($net);

  const [zIlPayModal, setZIlPayModal] = React.useState(false);

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
            DragonZIL
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
              <Link href={link.path}>{link.name}</Link>
            </Li>
          ))}
        </Ul>
      </BrowserView>
      <ConnectZIlPay/>
      <Modal
        show={zIlPayModal}
        title={
          <Text
            fontColors={Colors.Warning}
            css="padding: 16px;"
          >
            ZilPay wallet error.
          </Text>
        }
        onClose={() => setZIlPayModal(false)}
      >
        <ModalContainer>
          {!address ? (
            <Text>
              Please unlock ZilPay wallet.
            </Text>
          ) : null}
          {netwrok !== 'mainnet' ? (
            <Text>
              Please choice the mainnet netwrok.
            </Text>
          ) : null}
        </ModalContainer>
      </Modal>
    </Container>
  );
};
