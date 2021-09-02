import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';

import { Container, TitleRow, Seporate } from './styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ValueWrapper = styled.div`
  text-align: center;
`;

type Prop = {
  win: number;
  lost: number;
  color: string;
};

export const BattlesSection: React.FC<Prop> = ({
  win,
  lost,
  color
}) => {
  return (
    <Container color={color}>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
        >
          Battles
        </Text>
        <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
          <path d="M17.0438 2.625L15.838 3.1824L14.2898 9.61801L17.478 3.76114L17.0439 2.625H17.0438ZM3.84902 3.90159C4.44919 7.92604 6.38797 11.2992 9.10139 14.141C9.84232 13.6407 10.5905 13.127 11.3409 12.6028C10.1794 11.1741 9.3566 9.6629 9.05552 8.08967C7.26185 6.70391 5.5109 5.29765 3.84908 3.90164L3.84902 3.90159ZM24.3195 3.90326C22.6986 5.26527 20.9928 6.63732 19.2455 7.99159C18.7038 11.0377 16.2003 13.854 13.0479 16.289C9.61757 18.9386 5.36448 21.1502 1.76182 22.6395L1.76172 24.3542C6.67133 22.5688 12.0135 20.0974 16.2769 16.6862C20.4203 13.371 23.5288 9.20279 24.3195 3.90331V3.90326ZM11.9388 4.39203L11.4932 5.84689L13.6263 9.66855L13.2659 5.20611L11.9388 4.39198V4.39203ZM17.9514 8.9854C12.4344 13.1832 6.60826 17.1268 1.76182 19.9014V21.5803C5.21753 20.1201 9.2366 17.9966 12.4484 15.5157C15.0607 13.498 17.1049 11.2519 17.9514 8.9854H17.9514ZM10.3726 9.09812C10.758 10.0862 11.3703 11.0691 12.1551 12.0307C12.5237 11.7702 12.892 11.506 13.261 11.2411C12.294 10.5373 11.3284 9.82254 10.3726 9.09807V9.09812ZM19.2112 15.3932C18.7093 15.8887 18.1847 16.3655 17.6434 16.8267C20.5223 18.7775 23.7891 20.4442 26.6556 21.6473V20.021C24.3562 18.7139 21.8271 17.1372 19.2112 15.3932ZM16.857 17.4756C16.2463 17.9632 15.6147 18.4304 14.9681 18.8799C18.655 21.2408 22.7968 23.0528 26.6555 24.4442V22.7065C23.5699 21.4394 19.9923 19.6346 16.857 17.4756H16.857ZM13.7836 20.1974L11.3622 24.2905L11.7718 25.5247L13.2266 24.9313L13.7836 20.1974V20.1974ZM14.6142 20.2399L17.3075 25.7127L19.2194 26.2504L19.0342 24.5782L14.6143 20.2399H14.6142Z" fill="#7777A3"/>
        </svg>
      </TitleRow>
      <Wrapper>
        <ValueWrapper>
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            size="40px"
            css="margin: 0;"
          >
            {win}
          </Text>
          <Text
            fontColors={Colors.Muted}
            css="margin: 0;"
          >
            Win
          </Text>
        </ValueWrapper>
        <Seporate />
        <ValueWrapper>
          <Text
            fontVariant={StyleFonts.FiraSansBold}
            size="40px"
            css="margin: 0;"
          >
            {lost}
          </Text>
          <Text
            fontColors={Colors.Muted}
            css="margin: 0;"
          >
            Lost
          </Text>
        </ValueWrapper>
      </Wrapper>
    </Container>
  );
};

export default BattlesSection;
