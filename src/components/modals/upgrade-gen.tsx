import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { GenLab } from 'mixin/gen-lab';

const Container = styled.div`
  padding: 24px;
`;
const Description = styled(Text)`
  span {
    color: ${Colors.Success};
  }
`;

type Prop = {
  show: boolean;
  id: string;
  gen: {
    gen: number;
    value: number;
    name: string;
  };
  price: number;
  onClose: () => void;
};

const genLab = new GenLab();
export const UpgradeGenModal: React.FC<Prop> = ({
  show,
  gen,
  id,
  price,
  onClose
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleUpgrade = React.useCallback(async() => {
    setLoading(true);
    try {
      await genLab.changeGen(id, gen.gen);
      onClose();
    } catch {
      ///
    }
    setLoading(false);
  }, [id, gen]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          Upgrade #{id}
        </ModalTitle>
      )}
      show={show}
      onClose={onClose}
    >
      <Container>
        <Description
          fontColors={Colors.Muted}
          size="22px"
          css="text-align: center;"
        >
          You can upgrade combat gens of your dragon for become stronger.
        </Description>
        <br />
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          Gen index: <span>{gen.gen + 1}</span>
        </Description>
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          Current gen value: <span>{gen.value}</span>
        </Description>
        <Description
          fontColors={Colors.Muted}
          size="19px"
          css="margin: 0;"
        >
          Price: <span>{price} $ZLP</span>
        </Description>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Success}
            disabled={loading}
            onClick={handleUpgrade}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : 'Upgrade'}
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
