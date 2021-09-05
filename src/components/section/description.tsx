import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { Text } from 'components/text';

import { StyleFonts } from '@/config/fonts';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled(Text)`
  line-height: 40px;
  margin-top: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  max-width: 500px;
  margin: 30px;
`;
const SubTitle = styled(Text)`
  font-size: 62px;

  background: linear-gradient(to right, #fff 40%, rgba(163, 163, 163, 0.3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;
const Wings = styled.div`
  width: 32px;
  height: 21px;

  background-image: url(/icons/details_wings_1.svg);
  background-size: auto;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  position: absolute;
  transform: translate(-89%, 0px);
`;
const Horns = styled.div`
  width: 32px;
  height: 32px;

  background-image: url(/icons/details_horns.svg);
  background-size: auto;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  position: absolute;
  transform: translate(234%,-9px);
`;

export const DescriptionSection: React.FC = () => {
  const mainLocale = useTranslation('main');
  const commonLocale = useTranslation('common');

  return (
    <Container>
      <SubTitle>
        {mainLocale.t('section_1.title')}
      </SubTitle>
      <Row>
        <Wrapper>
          <Title
            fontVariant={StyleFonts.FiraSansBold}
            size="33px"
          >
            <Wings />
            {mainLocale.t('section_1.form_0.title')}
          </Title>
          <Text
            size="18px"
            css="margin-bottom: 60px;"
          >
            {mainLocale.t('section_1.form_0.description')}
          </Text>
        </Wrapper>
        <Wrapper>
          <Title
            fontVariant={StyleFonts.FiraSansBold}
            size="33px"
          >
            <Horns />
            {mainLocale.t('section_1.form_1.title')}
          </Title>
          <Text
            size="18px"
            css="margin-bottom: 60px;"
          >
            {mainLocale.t('section_1.form_1.description')}
          </Text>
        </Wrapper>
      </Row>
    </Container>
  );
}

export default DescriptionSection;
