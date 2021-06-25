import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/text';

import { Colors } from 'config/colors';
import { StyleFonts } from '@/config/fonts';
import { Rarity } from 'config/rarity';

type Prop = {
  dragon: {
    url: string;
    id: string;
    type: number;
    rarity: Rarity;
  }
};

export const Container = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 16px;
  margin: 16px;
  border-radius: 16px;
  
  background: ${Colors.Darker};
`;
const Image = styled.img`
  border-radius: 100%;
  background: ${Colors.Black};
  // z-index: 2;

  animation: fadeInFromNone 0.5s ease-out;

  transition: .3s;

  :hover {
    box-shadow: inset 0 0 40px ${Colors.Primary};
  }
`;
// const RarityImage = styled.img`
//   position: absolute;
//   transform: translate(0, -15px);
// `;
export const Empety = styled.div`
  border-radius: 100%;
  background: ${Colors.Dark};
  height: 250px;
  width: 250px;

  transition: .3s;

  :hover {
    box-shadow: inset 0 0 40px ${Colors.Primary};
  }
`;


// const rarityImg = (rarity: Rarity) => {
//     switch (rarity) {
//       case Rarity.Common:
//         return (<RarityImage src="/rarity/common.svg"/>);
//       case Rarity.Uncommon:
//         return (<RarityImage src="/rarity/uncommon.svg"/>);
//       case Rarity.Rare:
//         return (<RarityImage src="/rarity/rare.svg"/>);
//       case Rarity.Mythical:
//         return (<RarityImage src="/rarity/mythical.svg"/>);
//       case Rarity.Legendary:
//         return (<RarityImage src="/rarity/legendary.svg"/>);
//       case Rarity.Immortal:
//         return (<RarityImage src="/rarity/immortal.svg"/>);
//       case Rarity.Arcana:
//         return (<RarityImage src="/rarity/arcana.svg"/>);
//       case Rarity.Ancient:
//         return (<RarityImage src="/rarity/ancient.svg"/>);
//       default:
//         return null;
//     }
// }

export const Card: React.FC<Prop> = ({
  dragon
}) => {
  const [loadError, setLoadError] = React.useState(false);

  return (
    <Container>
      {loadError ? (
        <Empety />
      ) : (
        <Image
          src={dragon.url}
          onError={() => setLoadError(true)}
          height="250"
          width="250"
        />
      )}
      <Text
        fontVariant={StyleFonts.FiraSansBold}
      >
        #{dragon.id}
      </Text>
    </Container>
  );
};
