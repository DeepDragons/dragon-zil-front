import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import { Text } from "components/text";

import { Colors } from "@/config/colors";
import { StyleFonts } from "@/config/fonts";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubTitle = styled(Text)`
  background: linear-gradient(
    to right,
    #fff 40%,
    rgba(163, 163, 163, 0.3) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HowCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  align-items: stretch;
  flex-wrap: wrap;
`;
const TextWrapper = styled.div`
  max-width: 600px;
  padding: 68px 68px 78px 56px;
  background-image: linear-gradient(180deg, #fff, #fff);

  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const ImageWrapper = styled.div`
  background: #ffffff53;
  padding: 37px;
  max-width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    width: 100%;
    max-width: 600px;
    padding: 16px;
  }
`;

export var HowWorksSection: React.FC = function () {
  const mainLocale = useTranslation(`main`);
  const commonLocale = useTranslation(`common`);

  return (
    <Container>
      <SubTitle size="62px">{mainLocale.t(`section_2.title`)}</SubTitle>
      <CardWrapper>
        <HowCard>
          <ImageWrapper>
            <Image width="200" src="/imgs/egg2_1.webp" alt="egg" />
          </ImageWrapper>
          <TextWrapper>
            <Text
              fontColors={Colors.Black}
              fontVariant={StyleFonts.FiraSansBold}
              size="33px"
            >
              {mainLocale.t(`section_2.form_0.title`)}
            </Text>
            <br />
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_0.description_0`)}
            </Text>
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_0.description_1`)}
            </Text>
          </TextWrapper>
        </HowCard>
        <HowCard>
          <TextWrapper>
            <Text
              fontColors={Colors.Black}
              fontVariant={StyleFonts.FiraSansBold}
              size="33px"
            >
              {mainLocale.t(`section_2.form_1.title`)}
            </Text>
            <br />
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_1.description_0`)}
            </Text>
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_1.description_1`)}
            </Text>
          </TextWrapper>
          <ImageWrapper>
            <Image width="200" src="/imgs/figure.webp" alt="egg" />
          </ImageWrapper>
        </HowCard>
        <HowCard>
          <ImageWrapper>
            <Image width="200" src="/imgs/bottle.webp" alt="egg" />
          </ImageWrapper>
          <TextWrapper>
            <Text
              fontColors={Colors.Black}
              fontVariant={StyleFonts.FiraSansBold}
              size="33px"
            >
              {mainLocale.t(`section_2.form_1.title`)}
            </Text>
            <br />
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_2.description_0`)}
            </Text>
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_2.description_1`)}
            </Text>
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_2.description_2`)}
            </Text>
          </TextWrapper>
        </HowCard>
        <HowCard>
          <TextWrapper>
            <Text
              fontColors={Colors.Black}
              fontVariant={StyleFonts.FiraSansBold}
              size="33px"
            >
              {mainLocale.t(`section_2.form_3.title`)}
            </Text>
            <br />
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_3.description_0`)}
            </Text>
            <Text fontColors={Colors.Black}>
              {mainLocale.t(`section_2.form_3.description_1`)}
            </Text>
          </TextWrapper>
          <ImageWrapper>
            <Image width="200" src="/imgs/egg_nest_2.webp" alt="egg" />
          </ImageWrapper>
        </HowCard>
      </CardWrapper>
    </Container>
  );
};

export default HowWorksSection;
