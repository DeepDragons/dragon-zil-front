import React from 'react';

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { useStore } from 'effector-react';
import { IntInput } from 'components/int-input';
import {
  ModalTitle,
  ButtonsWrapper,
  ModalButton,
  Container
} from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { ZIlPayToken } from 'mixin/zilpay-token';
import { Contracts } from '@/config/contracts';
import { $wallet } from 'store/wallet';

type Prop = {
  show: boolean;
  id: string;
  onClose: () => void;
};

const zilPayToken = new ZIlPayToken();
export const FightsModal: React.FC<Prop> = ({
  show,
  id,
  onClose
}) => {
  const address = useStore($wallet);
  const [zlp, setZLP] = React.useState(500);
  const [allowances, setAllowances] = React.useState('0');
  const [balance, setBalance] = React.useState('0');

  const hanldeUpdate = React.useCallback(async() => {
    try {
      const allow = await zilPayToken.getAllowances(Contracts.FightPlace);
      const bl = await zilPayToken.getBalance();
      

      setBalance(bl);
      setAllowances(allow);
    } catch {
      ///
    }
  }, []);

  React.useEffect(() => {
    if (address) {
      hanldeUpdate();
    }
  }, [address]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          To arena #{id}
        </ModalTitle>
      )}
      show={show}
      onClose={onClose}
    >
      <Container>
        <Text
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          Test the strength of your dragon by putting it on the arena.
        </Text>
        <IntInput
          value={zlp}
          bg={Colors.Dark}
          onInput={setZLP}
        >
          Set a bet in ZLP
        </IntInput>
        <ButtonsWrapper>
          <ModalButton color={Colors.Danger}>
            Start fight
          </ModalButton>
          <ModalButton
            color={Colors.Dark}
            onClick={onClose}
          >
            Cancel
          </ModalButton>
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};
