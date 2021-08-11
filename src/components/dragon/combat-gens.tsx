import React from 'react';
import styled from 'styled-components';
import { isBrowser } from 'react-device-detect';

import { Text } from 'components/text';
import { Column } from 'components/column';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { Radar } from 'lib/radar';
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
};

export const CombatGens: React.FC<Prop> = ({
  gens
}) => {
  const [selected, setSelected] = React.useState(isBrowser ? 1 : 0);

  const gensArray = React.useMemo(() => {
    const list = genParse(gens).splice(1);

    return chunkArray(list, 10);
  }, [gens]);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat');

    try {
      if (ctx && isBrowser) {
        const r = new Radar(gens, ctx);
      }
    } catch {
      setSelected(0);
    }
  }, [gens, selected]);

  return (
    <Container>
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6.00005 4V4.52595C6.00005 9.55877 6.50524 14.5781 7.98208 18.6493C9.45878 22.7207 11.9527 25.8734 15.8756 26.9695L15.9805 27L16.0885 26.9756C20.3913 26.0429 22.9165 22.8767 24.3014 18.7637C25.6862 14.6508 26 9.56101 26 4.52595V4.0001L25.4888 4.07473C19.1625 4.99014 12.8388 4.99239 6.51286 4.07473L6 4.0001L6.00005 4ZM6.90411 5.04263C9.93821 5.45902 12.9728 5.66663 16.0076 5.66614V14.6677H24.3928C24.1575 16.0127 23.8502 17.2895 23.4529 18.4695C22.1408 22.3663 19.9143 25.1685 16.009 26.058C16.0087 26.0578 16.0081 26.0581 16.0076 26.058V14.6677H7.8051C7.18765 11.6926 6.92824 8.38433 6.90411 5.04273V5.04263Z" fill="#06C190"/>
            </svg>
            <Seporate />
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7.63818 4C9.78409 6.91163 4.28149 5.2962 3 4.12355C3.05574 6.12842 8.27045 9.10713 10.7649 7.73114C12.2961 6.88662 9.19165 4.2469 7.63818 4ZM12.7885 6.86511L12.8346 6.93864C19.1764 11.8906 12.6226 15.7044 9.41142 9.37858C10.2451 13.5055 5.27931 11.5894 4.68762 7.84524C1.28024 14.6273 11.0743 14.6688 11.3758 19.3059C11.546 21.9219 7.27558 20.3017 5.37589 16.8628C18.2281 42.9696 44.864 16.2367 12.7885 6.86511ZM19.8999 13.6866C22.2486 13.6866 24.4058 14.6223 25.6725 16.3126C27.9726 20.0947 22.3121 17.6831 21.9465 15.8702C20.8163 18.8051 27.3145 21.6084 22.7895 24.3922C24.1574 22.6822 22.913 18.7124 18.1595 18.9339C24.2983 22.5589 20.3896 29.2829 17.1221 23.5935C17.191 25.3484 17.7539 26.3361 18.553 26.8166C15.3447 26.2186 12.9137 23.5389 12.9137 20.3188C12.9137 18.365 13.8062 16.6063 15.2253 15.3919C15.3135 18.4879 19.6306 17.2754 21.3357 18.5103C20.7274 15.4921 18.3839 15.5125 16.9772 14.2946C17.8668 13.9043 18.8567 13.6865 19.8999 13.6865V13.6866ZM14.3412 18.5556C14.2682 18.5564 14.1977 18.5612 14.1271 18.5681C15.4987 18.9051 18.0621 22.7611 15.9119 21.6568C16.0916 22.3871 18.1795 23.7451 18.9415 22.715C19.9329 21.375 16.6035 18.5317 14.3413 18.5556H14.3412Z" fill="#E8313E"/>
            </svg>
          </SeporateContainer>
          <GensWrapper>
            <GensContainer>
              {gensArray[0].map((gen, index) => (
                <Column
                  key={`deffence-${index}`}
                  width={25}
                  color={'#06C190'}
                  max={99}
                  value={gen}
                  invert={true}
                />
              ))}
            </GensContainer>
            <GensContainer>
              {Array(10).fill('').map((_, index) => (
                <Text
                  key={`id-${index}`}
                  fontColors={Colors.Muted}
                  size="18px"
                  css="width: 32px;text-align: center;margin: 2px 5px;"
                >
                  {index + 1}
                </Text>
              ))}
            </GensContainer>
            <GensContainer>
              {gensArray[1].map((gen, index) => (
                <Column
                  key={`attack-${index}`}
                  width={25}
                  color={'#E8313E'}
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
