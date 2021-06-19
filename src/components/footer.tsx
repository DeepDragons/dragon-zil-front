import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  align-items: flex-start;
  background: #14161C;
  padding: 20px;
`;
const Wrapper = styled.div`
  min-width: 250px;
  padding-top: 20px;
`;
const UlList = styled.ul`
  display: flex;
  align-items: center;
`;
const Li = styled.li`
  color: ${Colors.Muted};
  line-height: 28px;
  font-family: ${StyleFonts.FiraSansRegular};

  margin-left: 5px;
`;

export const Footer: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          DragonZIL
        </Text>
        <ul>
          <Li>
            <Link href="/privacy">
              Privacy policy
            </Link>
          </Li>
          <Li>
            <Link href="/terms">
              Terms of service
            </Link>
          </Li>
        </ul>
      </Wrapper>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          Contracts
        </Text>
        <ul>
          <Li>
            CrowdSale
          </Li>
          <Li>
            Fight
          </Li>
          <Li>
            NFT market
          </Li>
          <Li>
            DragonZIL
          </Li>
          <Li>
            GenLab
          </Li>
          <Li>
            StoreZLP
          </Li>
          <Li>
            ZLP
          </Li>
          <Li>
            Breed place
          </Li>
        </ul>
      </Wrapper>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          Follow us
        </Text>
        <UlList>
          <Li>
            <img
              src="/icons/github.svg"
              alt="github"
            />
          </Li>
          <Li>
            <img
              src="/icons/medium.svg"
              alt="medium"
            />
          </Li>
          <Li>
            <img
              src="/icons/discord.svg"
              alt="discord"
            />
          </Li>
          <Li>
            <img
              src="/icons/tg.svg"
              alt="Telegram"
            />
          </Li>
          <Li>
            <img
              src="/icons/fb.svg"
              alt="Facebook"
            />
          </Li>
          <Li>
            <img
              src="/icons/twitter.svg"
              alt="Twitter"
            />
          </Li>
        </UlList>
      </Wrapper>
    </Container>
  );
};
