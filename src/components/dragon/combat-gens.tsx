import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { Radar } from 'lib/radar';

const Container = styled.div`
  background: ${Colors.Secondary};

  border: 1px solid #FFB411;
  box-sizing: border-box;
  border-radius: 16px;

  padding: 41px;
`;
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

type Prop = {
  gens: string;
};

export const CombatGens: React.FC<Prop> = ({
  gens
}) => {
  const [selected, setSelected] = React.useState(isBrowser ? 0 : 1);


  React.useEffect(() => {
    const ctx = document.querySelector('#combat');

    if (ctx && isBrowser) {
      const r = new Radar(gens, ctx);
    }
  }, [gens, selected]);

  return (
    <Container>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
        >
          Combat gens
        </Text>
        <img
          src="/icons/gens.svg"
          alt="transfer"
        />
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
        <div></div>
      )}
    </Container>
  );
};
