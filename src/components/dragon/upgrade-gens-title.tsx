import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { Text } from "components/text";
import { StyleFonts } from "@/config/fonts";

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Prop = {
  icon?: string;
};

export var TitleUpgradeGens: React.FC<Prop> = function ({
  children,
  icon = `body.svg`,
}) {
  return (
    <TitleRow>
      <TitleRow>
        <Text
          fontVariant={StyleFonts.FiraSansSemiBold}
          size="24px"
          css="margin-right: 10px;"
        >
          {children}
        </Text>
        <Image
          src={`/icons/${icon}`}
          alt="gens"
          width="19"
          height="16"
        />
      </TitleRow>
    </TitleRow>
  );
};
