import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from 'next/image';

import { Text } from "components/text";

import { StyleFonts } from "@/config/fonts";

import { Colors } from "@/config/colors";
import { Container, TitleRow, Seporate } from "./styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ParentImage = styled.img`
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

export var ParentsSection: React.FC<Prop> = function ({
  first,
  second,
  color,
}) {
  return (
    <Container color={color}>
      <TitleRow>
        <Text fontVariant={StyleFonts.FiraSansSemiBold} size="24px">
          Parents
        </Text>
        <Image src="/icons/parents.svg" alt="parents" />
      </TitleRow>
      <Wrapper>
        <ImageWrapper>
          <Text fontVariant={StyleFonts.FiraSansRegular} css="margin: 0 10px;">
            #
            {first}
          </Text>
          <Link href={`/dragon/${first}`} passHref>
            <div>
              <ParentImage
                src="https://res.cloudinary.com/dragonseth/image/upload/1_6.png"
                color={Colors.Blue}
                height="80"
                role="first-parrent"
              />
            </div>
          </Link>
        </ImageWrapper>
        <Seporate />
        <ImageWrapper>
          <Link href={`/dragon/${first}`} passHref>
            <div>
              <ParentImage
                src="https://res.cloudinary.com/dragonseth/image/upload/1_23.png"
                color={Colors.Blue}
                height="80"
                role="first-parrent"
              />
            </div>
          </Link>
          <Text fontVariant={StyleFonts.FiraSansRegular} css="margin: 0 10px;">
            #
            {second}
          </Text>
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};
