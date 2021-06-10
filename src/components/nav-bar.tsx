import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Text } from 'components/text';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1200px;
  width: 90%;
  margin-top: 40px;
`;
const Logo = styled.div`
  display: flex;
  margin-left: 40px;
`;
const Ul = styled.ul`
  display: flex;
`;
const Li = styled.ul`
  margin-left: 40px;
  margin-right: 40px;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansRegular};
`;
const Connect = styled.div`
  cursor: pointer;
  color: ${Colors.White};
  font-family: ${StyleFonts.FiraSansSemiBold};
`;

export const Navbar: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Logo>
          <img src="/icons/logo.png" alt="Logo" height="40" />
          <Text fontVariant={StyleFonts.FiraSansBold} css="margin-left: 5px;">
            DragonZIL
          </Text>
        </Logo>
      </Link>
      <Ul>
        <Li>
          <Link href="/">Store</Link>
        </Li>
        <Li>
          <Link href="/">My dragons</Link>
        </Li>
        <Li>
          <Link href="/">Fights</Link>
        </Li>
        <Li>
          <Link href="/">Breed</Link>
        </Li>
        <Li>
          <Link href="/">Trade</Link>
        </Li>
      </Ul>
      <Connect>zil1fm...ew07pj</Connect>
    </Container>
  );
};
