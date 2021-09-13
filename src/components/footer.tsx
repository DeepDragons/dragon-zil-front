import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';

import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';
import { viewAddress } from 'lib/viewblock';
import { Contracts } from 'config/contracts';
import { useTranslation } from 'next-i18next';

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

  :hover {
    color: ${Colors.White};
  }
`;

const keys = Object.keys(Contracts);
const values = Object.values(Contracts);
export const Footer: React.FC = () => {
  const commonLocale = useTranslation('common');

  return (
    <Container>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          {commonLocale.t('name')}
        </Text>
        <ul>
          <Li>
            <Link href="/privacy">
              {commonLocale.t('privacy_policy')}
            </Link>
          </Li>
          <Li>
            <Link href="/terms">
              {commonLocale.t('terms_service')}
            </Link>
          </Li>
          {/* <Li>
            <Link href="/referral">
              {commonLocale.t('referral_program')}
            </Link>
          </Li> */}
        </ul>
      </Wrapper>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          {commonLocale.t('contracts')}
        </Text>
        <ul>
          {keys.map((keyName, index) => (
            <a
              key={keyName}
              href={viewAddress(values[index])}
              target="_blank"
            >
              <Li>
                {keyName}
              </Li>
            </a>
          ))}
        </ul>
      </Wrapper>
      <Wrapper>
        <Text
          fontVariant={StyleFonts.FiraSansBold}
          fontColors={Colors.Muted}
        >
          {commonLocale.t('follow')}
        </Text>
        <UlList>
          <Li>
            <a
              href="https://github.com/DeepDragons"
              target="_blank"
            >
              <img
                src="/icons/github.svg"
                alt="github"
              />
            </a>
          </Li>
          <Li>
            <a
              href="http://t.me/Deep_Dragons"
              target="_blank"
            >
              <img
                src="/icons/tg.svg"
                alt="Telegram"
              />
            </a>
          </Li>
          <Li>
            <a
              href="https://www.facebook.com/ethdragons"
              target="_blank"
            >
              <img
                src="/icons/fb.svg"
                alt="Facebook"
              />
            </a>
          </Li>
          <Li>
            <a
              href="https://twitter.com/dragons_eth"
              target="_blank"
            >
              <img
                src="/icons/twitter.svg"
                alt="Twitter"
              />
            </a>
          </Li>
        </UlList>
      </Wrapper>
    </Container>
  );
};
