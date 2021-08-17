import React from 'react';
import styled from 'styled-components';
import { isBrowser, isMobile } from 'react-device-detect';

import { Text } from 'components/text';
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

type Prop = {
  gens: string;
  color: string;
};

export const GenLabUpgrade: React.FC<Prop> = ({
  gens,
  color
}) => {
  const [selected, setSelected] = React.useState(0);

  const gensArray = React.useMemo(() => {
    const list = genParse(gens).splice(1);

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
            Combat gens
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
          <TabSelector
            style={{
              background: selected === 1 ? Colors.Darker : 'none'
            }}
            src="/icons/radar.svg"
            alt="radar"
            onClick={() => setSelected(1)}
          />
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
          </GensWrapper>
        </GensContainer>
      )}
    </Container>
  );
};
