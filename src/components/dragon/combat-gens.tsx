import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';
import { Column } from 'components/column';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';
import { chunkArray } from 'lib/chunks';

import { Container, Seporate } from './styles';

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 34px;
`;
const TabSelector = styled.img`
  cursor: pointer;
  border-radius: 8px;
`;
const GensContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GensWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SeporateContainer = styled.div`
  width: 30px;
`;
const GenNumber = styled(Text)`
  width: 25px;
  text-align: center;
  margin: 2px 5px;

  @media (max-width: 450px) {
    width: 18px;
  }

  @media (max-width: 350px) {
    width: 15px;
  }

  @media (max-width: 250px) {
    width: 10px;
  }
`;

type Prop = {
  gens: string;
  color: string;
};

export const CombatGens: React.FC<Prop> = ({
  gens,
  color
}) => {
  const dragonLocale = useTranslation('dragon');
  const [selected, setSelected] = React.useState(isBrowser ? 1 : 0);

  const gensArray = React.useMemo(() => {
    const list = genParse(gens);

    return chunkArray(list, 10);
  }, [gens]);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx && isBrowser) {
        radar(gensArray, ctx);
      }
    } catch {
      setSelected(0);
    }
  }, [gensArray, selected]);

  return (
    <Container color={color}>
      <TitleRow>
        <TitleRow>
          <Text
            fontVariant={StyleFonts.FiraSansSemiBold}
            size="24px"
          >
            {dragonLocale.t('combat_gens')}
          </Text>
          <img
            src="/icons/gens.svg"
            alt="gens"
          />
        </TitleRow>
        <TabRow>
          <TabSelector
            style={{
              background: selected === 0 ? Colors.Darker : 'none'
            }}
            src="/icons/graph.svg"
            alt="graph"
            onClick={() => setSelected(0)}
          />
          {isBrowser ? (
            <TabSelector
              style={{
                background: selected === 1 ? Colors.Darker : 'none'
              }}
              src="/icons/radar.svg"
              alt="radar"
              onClick={() => setSelected(1)}
            />
          ) : null}
        </TabRow>
      </TitleRow>
      {selected === 1 ? (
        <div className="radar">
          <canvas
            id="combat"
            height="410"
          />
        </div>
      ) : (
        <GensContainer>
          <SeporateContainer>
            <DefenceIcon />
            <Seporate />
            <AttackIcon />
          </SeporateContainer>
          <GensWrapper>
            <GensContainer>
              {gensArray[0].map((gen, index) => (
                <Column
                  key={`deffence-${index}`}
                  color={Colors.Success}
                  max={99}
                  value={gen}
                  invert={true}
                />
              ))}
            </GensContainer>
            <GensContainer>
              {Array(10).fill('').map((_, index) => (
                <GenNumber
                  key={`id-${index}`}
                  fontColors={Colors.Muted}
                  size="18px"
                >
                  {index + 1}
                </GenNumber>
              ))}
            </GensContainer>
            <GensContainer>
              {gensArray[1].map((gen, index) => (
                <Column
                  key={`attack-${index}`}
                  color={Colors.Danger}
                  max={99}
                  value={gen}
                />
              ))}
            </GensContainer>
          </GensWrapper>
        </GensContainer>
      )}
    </Container>
  );
};

export default CombatGens;
