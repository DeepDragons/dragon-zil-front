import React from "react";
import copy from "clipboard-copy";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Text } from "components/text";
import { CopyIcon } from "components/icons/copy";
import { ViewIcon } from "components/icons/view";

import { Colors } from "config/colors";
import { $net } from "store/wallet-netwrok";
import { StyleFonts } from "@/config/fonts";
import { trim } from "@/lib/trim";
import { viewAddress } from "@/lib/viewblock";
import { Wallet } from "@/store/wallet";
import { ZIlPayToken } from "@/mixin/zilpay-token";
import { formatNumber } from "@/filters/n-format";

const AccountContainer = styled.div`
  margin: 16px;
  padding: 5px 30px;

  border: 1px solid ${Colors.Muted};
  border-radius: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  .second {
    margin-left: 16px;
  }
`;
const CustomText = styled(Text)`
  span {
    color: ${Colors.Pink};
  }
`;
const CopyContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  user-select: none;

  :hover {
    svg {
      stroke: #a1a1b5;
    }
    div {
      color: #a1a1b5;
    }
  }
`;

type Prop = {
  wallet: Wallet | null;
  balance: string;
};

export var AccountCard: React.FC<Prop> = function ({ wallet, balance = 0 }) {
  const common = useTranslation(`common`);
  const netwrok = useStore($net);

  const netColor = React.useMemo(
    () => (netwrok === `mainnet` ? Colors.Muted : Colors.Danger),
    [netwrok],
  );

  return (
    <AccountContainer>
      <Text
        fontColors={netColor}
        fontVariant={StyleFonts.FiraSansRegular}
        css="margin: 0;"
        size="16px"
      >
        {common.t(`connected_via`)}
        {` `}
        {netwrok}
        .
      </Text>
      <Text fontVariant={StyleFonts.FiraSansMedium} size="20px">
        {wallet ? trim(wallet.bech32, 8) : ``}
      </Text>
      <CustomText fontVariant={StyleFonts.FiraSansMedium} size="18px">
        {formatNumber(Number(balance) / Number(ZIlPayToken.decimal))} <span>
          ZLP
        </span>
      </CustomText>
      <Row>
        <CopyContainer onClick={() => copy(String(wallet?.bech32))}>
          <CopyIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            {common.t(`copy_adr`)}
          </Text>
        </CopyContainer>
        <CopyContainer
          className="second"
          href={wallet ? viewAddress(String(wallet?.bech32)) : ``}
          target="_blank"
        >
          <ViewIcon />
          <Text
            fontColors={Colors.Muted}
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0;text-indent: 5px;"
            size="16px"
          >
            {common.t(`view_explorer`)}
          </Text>
        </CopyContainer>
      </Row>
    </AccountContainer>
  );
};
