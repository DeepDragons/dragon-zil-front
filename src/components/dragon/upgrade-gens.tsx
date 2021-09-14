import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import { Text } from 'components/text';
import { AttackIcon } from 'components/icons/attack';
import { DefenceIcon } from 'components/icons/defence';
import { LinePercent } from 'components/line-percent';
import { TitleUpgradeGens } from './upgrade-gens-title';

import { Colors } from 'config/colors';
import { radar } from 'lib/radar';
import { genParse } from 'lib/gen-parse';

import { Container } from './styles';
import { chunkArray } from '@/lib/chunks';

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
  width: 330px;
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
  onSelect: (gen: number, value: number, name: string) => void;
};

export const UpgradeGens: React.FC<Prop> = ({
  gens,
  color,
  onSelect
}) => {
  const mutateLocale = useTranslation('mutate');
  const commonLocale = useTranslation('common');

  const gensArray = React.useMemo(() => {
    const list = genParse(gens);
    const gensList = [];

    for (let index = 0; index < list.length / 2; index++) {
      const def = list[index];
      const atteck = list[index + 10];

      gensList.push({
        def,
        atteck
      });
    }

    return gensList;
  }, [gens]);

  React.useEffect(() => {
    const ctx = document.querySelector('#combat') as HTMLCanvasElement;

    try {
      if (ctx) {
        const list = genParse(gens);
        const chunk = chunkArray(list, 10);

        radar(chunk, ctx);
      }
    } catch {
    }
  }, [gens]);

  return (
    <Container color={color}>
      <TitleUpgradeGens>
        {mutateLocale.t('form_title')}
      </TitleUpgradeGens>
      <GensContainer>
        <div>
          <canvas
            id="combat"
            height="410"
          />
        </div>
        <div style={{ marginLeft: '16px' }}>
          <Row>
            <GenNameContainer>
              <DefenceIcon />
              <Text>
                {commonLocale.t('defence')}
              </Text>
            </GenNameContainer>
            <GenNameContainer>
              <Text>
                {commonLocale.t('attack')}
              </Text>
              <AttackIcon />
            </GenNameContainer>
          </Row>
          <GensWrapper>
            {gensArray.map((el, index) => (
              <Gens key={index}>
                <NumberOfGen onClick={() => onSelect(index, el.def, commonLocale.t('defence'))}>
                  <Text css="margin: 0;">
                    {index + 1}
                  </Text>
                </NumberOfGen>
                <LinePercent
                  max={99}
                  value={el.def}
                  color={Colors.Success}
                  invert
                />
                <Text fontColors={Colors.Muted}>
                  {index + 1}
                </Text>
                <LinePercent
                  max={99}
                  value={el.atteck}
                  color={Colors.Danger}
                />
                <NumberOfGen onClick={() => onSelect(index + 10, el.atteck, commonLocale.t('attack'))}>
                  <Text css="margin: 0;">
                    {index + 1}
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

export default UpgradeGens;
