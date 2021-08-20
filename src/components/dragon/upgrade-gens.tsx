import React from 'react';
import styled from 'styled-components';
import { isBrowser, BrowserView } from 'react-device-detect';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container, Seporate } from './styles';
import { chunkArray } from '@/lib/chunks';

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const GenNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GensWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 16px;
  width: 300px;

  @media (max-width: 500px) {
    width: 250px;
  }
`;
const Gens = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NumberOfGen = styled.a`
  cursor: pointer;
  background: ${Colors.Darker};
  border-radius: 7px;
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
`;

type Prop = {
  gens: string;
  color: string;
};

export const UpgradeGens: React.FC<Prop> = ({
  gens,
  color
}) => {
  const gensArray = React.useMemo(() => {
    const list = genParse(gens).splice(1);
    const gensList = [];


    for (let index = 0; index < list.length / 2; index++) {
      const def = list[index];
      const atteck = list[index + 10];

      gensList.push({
        def,
        atteck
      })
    }

    return gensList;
  }, [gens]);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx && isBrowser) {
        const list = genParse(gens).splice(1);
        const chunk = chunkArray(list, 10);
        radar(chunk, ctx);
      }
    } catch {
      // setSelected(0);
    }
  }, [gensArray]);

  return (
    <Container color={color}>
      <TitleRow>
        <TitleRow>
          <Text
            fontVariant={StyleFonts.FiraSansSemiBold}
            size="24px"
            css="margin-right: 10px;"
          >
            Upgrade gens
          </Text>
          <img
            src="/icons/body.svg"
            alt="gens"
          />
        </TitleRow>
      </TitleRow>
      <GensContainer>
        <BrowserView>
          <canvas
            id="combat"
            height="410"
          />
        </BrowserView>
        <div>
          <Row>
            <GenNameContainer>
              <DefenceIcon />
              <Text>
                Defence
              </Text>
            </GenNameContainer>
            <GenNameContainer>
              <Text>
                Attack
              </Text>
              <AttackIcon />
            </GenNameContainer>
          </Row>
          <GensWrapper>
            {gensArray.map((el, index) => (
              <Gens key={index}>
                <NumberOfGen>
                  <Text css="margin: 0;">
                    {index + 1}
                  </Text>
                </NumberOfGen>
                <LinePercent
                  max={99}
                  value={el.def}
                  color={'#06C190'}
                  invert
                />
                <Text fontColors={Colors.Muted}>
                  {index + 1}
                </Text>
                <LinePercent
                  max={99}
                  value={el.atteck}
                  color={'#E8313E'}
                />
                <NumberOfGen>
                  <Text css="margin: 0;">
                    {index + 11}
                  </Text>
                </NumberOfGen>
              </Gens>
            ))}
          </GensWrapper>
        </div>
      </GensContainer>
    </Container>
  );
};
