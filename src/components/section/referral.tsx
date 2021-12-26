import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { Text } from "components/text";
import { Button } from "components/button";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 90px;
  margin-bottom: 200px;
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
const Wrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 568px) {
    img {
      display: none;
    }
  }
`;
const TextWrapper = styled.div`
  max-width: 600px;
  padding: 16px;
`;

export var ReferralSection: React.FC = function () {
  const mainLocale = useTranslation(`main`);

  return (
    <Container>
      <SubTitle size="62px" css="margin: 0;">
        {mainLocale.t(`section_3.title`)}
      </SubTitle>
      <Text>{mainLocale.t(`section_3.sub_title`)}</Text>
      <Wrapper>
        <img height="300" src="/imgs/ic_share_large.webp" alt="ref" />
        <TextWrapper>
          <Text>{mainLocale.t(`section_3.link_name`)}</Text>
          <Text>{mainLocale.t(`section_3.description`)}</Text>
          <Link href="/referral" passHref>
            <Button css="margin-top: 30px;">
              {mainLocale.t(`section_3.btn`)}
            </Button>
          </Link>
        </TextWrapper>
      </Wrapper>
    </Container>
  );
};

export default ReferralSection;
