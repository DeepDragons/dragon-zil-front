import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Text } from 'components/text';
import { ScreenModal } from '../screen-modal';
import { Logo, links } from 'components/nav-bar';
import { CloseIcon } from 'components/icons/close';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import Loader from 'react-loader-spinner';
import { trim } from '@/lib/trim';

type Prop = {
  show: boolean;
  loading: boolean;
  address?: string;
  onConnect: () => void;
  onClose: () => void;
};

const Container = styled.div`
  background: #14161C;
  justify-content: space-between;
  padding-bottom: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding-top: 12px;
`;
const ConnectButton = styled.button`
  border: 0;
  background: transparent;
  color: ${Colors.Muted};
  border-radius: 16px;
  padding: 17px 68px;
  cursor: pointer;
  border: 1px solid ${Colors.Muted};
`;
const Item = styled.li`
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansRegular};
  line-height: 30px;
  text-align: center;
  font-size: 22px;
  margin: 16px;

  border-bottom: 2px solid
    ${(props: { selected: boolean }) =>
      props.selected ? Colors.Info : '#14161C'};
`;

export const MobileNavigate: React.FC<Prop> = ({
  show,
  loading,
  onConnect,
  address,
  onClose
}) => {
  const router = useRouter();

  const connectText = React.useMemo(() => {
    return address ? trim(address) : 'Connect';
  }, [address]);

  const hanldeNavigate = React.useCallback((path: string) => {
    router.push(path);
    onClose();
  }, []);

  return (
    <ScreenModal
      show={show}
      onClose={() => null}
    >
      <Container className="modal-content">
        <Wrapper>
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
          <div onClick={onClose}>
            <CloseIcon />
          </div>
        </Wrapper>
        <ul>
          {links.map((link, index) => (
            <Item
              key={index}
              selected={router.pathname === link.path}
              onClick={() => hanldeNavigate(link.path)}
            >
              {link.name}
            </Item>
          ))}
        </ul>
        <ConnectButton onClick={onConnect}>
          {loading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={10}
              width={20}
            />
          ) : connectText}
        </ConnectButton>
      </Container>
    </ScreenModal>
  );
};
