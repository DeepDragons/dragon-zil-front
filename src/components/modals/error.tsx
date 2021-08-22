import React from 'react';
import styled from 'styled-components';

import { Modal } from 'components/modal';
import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

const ModalTitle = styled(Text)`
  padding: 10px;
`;
const Container = styled.div`
  adding-left: 30px;
  padding-right: 30px;

  ul {
    padding: 30px;
    list-style: unset;
    color: ${Colors.Primary};
  }
`;

type Prop = {
  show: boolean;
  code: number | string | null;
};

export const ErrorModal: React.FC<Prop> = ({
  show,
  code
}) => {
  return (
    <Modal
      title={(
        <ModalTitle
          fontVariant={StyleFonts.FiraSansBold}
          size="32px"
        >
          Oops something went wrong
        </ModalTitle>
      )}
      show={show}
      onClose={() => null}
    >
      <Container>
        <Text
          fontColors={Colors.Primary}
          size="22px"
          css="text-indent: 10px;"
        >
          Error code is {code}, try do it:
        </Text>
        <ul>
          <li>
            <a href="">
              <Text>
                Reload Page.
              </Text>
            </a>
          </li>
          <li>
            <Text>
              Check your internect connection.
            </Text>
          </li>
          <li>
            <Text>
              Check blockchain status.
            </Text>
          </li>
          <li>
            <Text fontColors={Colors.Info}>
              <a href="http://t.me/Deep_Dragons" target="_blank">
                Ask us on telegram channel.
              </a>
            </Text>
          </li>
        </ul>
      </Container>
    </Modal>
  );
};
