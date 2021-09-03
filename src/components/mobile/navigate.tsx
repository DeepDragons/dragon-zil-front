import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Text } from 'components/text';
import { ScreenModal } from '../screen-modal';
import { Logo, links } from 'components/nav-bar';
import { CloseIcon } from 'components/icons/close';
import { TxCard } from 'components/tx-card';
import { AccountCard } from 'components/account-card';

import { StyleFonts } from '@/config/fonts';
import { Colors } from '@/config/colors';
import Loader from 'react-loader-spinner';
import { trim } from '@/lib/trim';
import { Wallet } from '@/store/wallet';
import { $transactions, resetTxList } from 'store/transactions';

type Prop = {
  show: boolean;
  loading: boolean;
  wallet: Wallet | null;
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
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  background: transparent;
  color: ${Colors.Muted};
  border-radius: 16px;
  padding: 17px 68px;
  min-width: 230px;
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
const HeaderTxns = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const MobileNavigate: React.FC<Prop> = ({
  show,
  loading,
  onConnect,
  wallet,
  onClose
}) => {
  const router = useRouter();
  const txList = useStore($transactions);
  const [showMenu, setShowMenu] = React.useState(false);

  const connectText = React.useMemo(() => {
    if (showMenu && wallet) {
      return 'Cancel';
    }
    if (wallet) {
      return trim(wallet.bech32);
    }
    return 'Connect';
  }, [wallet, showMenu]);

  const hanldeNavigate = React.useCallback((path: string) => {
    router.push(path);
    onClose();
  }, []);

  const hanldeMenuOrConnect = React.useCallback(() => {
    if (showMenu) {
      setShowMenu(false);
    } else if (wallet) {
      setShowMenu(true);
    } else {
      onConnect();
    }
  }, [showMenu, wallet]);

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
        <ul style={{ display: showMenu ? 'none' : 'block' }}>
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
        <div style={{ display: showMenu ? 'block' : 'none' }}>
          <AccountCard wallet={wallet}/>
          {txList.length === 0 ? (
            <Text
              fontVariant={StyleFonts.FiraSansRegular}
              size="20px"
              css="text-align: center;margin-top: 10px;"
            >
              Your transactions will appear here...
            </Text>
          ) : (
            <HeaderTxns>
              <Text
                fontVariant={StyleFonts.FiraSansRegular}
                size="20px"
                css=""
              >
                Recent Transactions
              </Text>
              <Text
                fontVariant={StyleFonts.FiraSansRegular}
                fontColors={Colors.Info}
                size="20px"
                css="cursor: pointer;user-select: none;"
                onClick={() => resetTxList(String(wallet?.base16))}
              >
                (clear all)
              </Text>
            </HeaderTxns>
          )}
          {txList.map((tx) => (
            <TxCard
              key={tx.hash}
              tx={tx}
            />
          ))}
        </div>
        <ConnectButton onClick={hanldeMenuOrConnect}>
          {loading ? (
            <>
              <Loader
                type="ThreeDots"
                color="#fff"
                height={10}
                width={20}
              />
              <Text css="text-indent: 5px;margin: 0;">
                Pending
              </Text>
            </>
          ) : connectText}
        </ConnectButton>
      </Container>
    </ScreenModal>
  );
};
