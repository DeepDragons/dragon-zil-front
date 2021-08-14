import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Text } from 'components/text';
import { Image } from 'components/card';

import { StyleFonts } from '@/config/fonts';

import { Container, TitleRow, Seporate } from './styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ParentImage = styled(Image)`
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

type Prop = {
  first: string;
  second: string;
  color: string;
};

export const ParentsSection: React.FC<Prop> = ({
  first,
  second,
  color
}) => {
  return (
    <Container color={color}>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
        >
          Parents
        </Text>
        <img
          src="/icons/parents.svg"
          alt="parents"
        />
      </TitleRow>
      <Wrapper>
        <ImageWrapper>
          <Text
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0 10px;"
          >
            #{first}
          </Text>
          <Link href={`/dragon/${first}`}>
            <div>
              <ParentImage
                src={'https://res.cloudinary.com/dragonseth/image/upload/1_6.png'}
                height="80"
                role="first-parrent"
              />
            </div>
          </Link>
        </ImageWrapper>
        <Seporate />
        <ImageWrapper>
          <Link href={`/dragon/${first}`}>
            <div>
              <ParentImage
                src={'https://res.cloudinary.com/dragonseth/image/upload/1_23.png'}
                height="80"
                role="first-parrent"
              />
            </div>
          </Link>
          <Text
            fontVariant={StyleFonts.FiraSansRegular}
            css="margin: 0 10px;"
          >
            #{second}
          </Text>
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};
