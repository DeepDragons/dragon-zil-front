import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import { Modal } from 'components/modal';
import { Text } from 'components/text';
import { ModalTitle, ButtonsWrapper, ModalButton } from './style';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { DragonZIL } from 'mixin/dragon-zil';

const Container = styled.div`
  padding: 24px;
`;

type Prop = {
  show: boolean;
  stage: number;
  id: string;
  onClose: () => void;
};

const dragonZIL = new DragonZIL();
export const SuicideModal: React.FC<Prop> = ({
  show,
  stage,
  id,
  onClose
}) => {
  const [loading, setLoading] = React.useState(false);

  const dragonStage = React.useMemo(
    () => stage === 0 ? 'egg' : 'dragon',
    [stage]
  );

  const handleSuicide = React.useCallback(async() => {
    setLoading(true);
    try {
      await dragonZIL.burn(id);
      onClose();
    } catch {
      ///
    }
    setLoading(false);
  }, [id]);

  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          Transfer #{id}
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
          If you kill the {dragonStage}, it will be irretrievably lost.
        </Text>
        <ButtonsWrapper>
          <ModalButton
            color={Colors.Danger}
            disabled={loading}
            onClick={handleSuicide}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color={Colors.White}
                height={10}
                width={40}
              />
            ) : `Kill ${dragonStage}`}
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
