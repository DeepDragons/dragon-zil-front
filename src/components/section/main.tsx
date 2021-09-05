import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Text } from 'components/text';
import { Button } from 'components/button';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';
import { BrowserView, TabletView } from 'react-device-detect';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled(Text)`
  background: linear-gradient(#fff 15%, rgba(255, 254, 249, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 114px;
  line-height: 137px;

  @media (max-width: 479px) {
    font-size: 57px;
    line-height: 100px;
  }
`;
const BuyButton = styled(Button)`
  margin-top: 30px;
  margin-bottom: 200px;
  background-image: linear-gradient(90deg ,${Colors.Primary},#a621a3 50%,#870f84);
  font-family: 'Fira Sans';
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 0 10px hsl(0deg 0% 100% / 40%);
`;
const FirstDragon = styled.div`
  @keyframes move_01 {
    from {
      background-position-x: 0
    }

    to {
      background-position-x: -41000px
    }
  }

  position: absolute;
  width: 500px;
  height: 480px;
  background-image: url(/imgs/dragon.webp);
  background-position: 0 60px;
  background-size: 41000px 300px;
  background-repeat: no-repeat;

  transform: translate(-69%, 62%);

  animation: move_01 3.5s steps(82) infinite;

  @media (max-width: 800px) {
    display: none;
  }
`;
const SecondDragon = styled.div`
  @keyframes move_02 {
    from {
      background-position-x: 0
    }

    to {
      background-position-x: -24320px
    }
  }

  position: absolute;
  width: 320px;
  height: 480px;
  background-image: url(http://dragoneth.com/images/Right_dragon_1x_sprite_480x76.png);
  background-position: 0 50%;
  background-size: 24320px;
  background-repeat: no-repeat;
  background-attachment: scroll;

  transform: translate(99%, 60%);

  animation: move_02 3.5s steps(76) infinite;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const MainSection: React.FC = () => {
  const mainLocale = useTranslation('main');
  const commonLocale = useTranslation('common');

  return (
    <Container>
      <FirstDragon />
      <SecondDragon />
      <Title
        fontColors={Colors.White}
        fontVariant={StyleFonts.FiraSansBold}
      >
        {commonLocale.t('name')}
      </Title>
      <Text
        fontVariant={StyleFonts.FiraSansRegular}
        css="text-align: center;max-width: 400px;"
      >
        {mainLocale.t('description')}
      </Text>
      <Link href="/buy">
        <BuyButton>
          {mainLocale.t('buy')}
        </BuyButton>
      </Link>
    </Container>
  );
}

export default MainSection;
