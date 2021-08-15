import styled from 'styled-components';
import { Image } from 'components/card';

import { Colors } from '@/config/colors';

type DragonImageProp = {
  color: string;
}

export const DragonImage = styled(Image)`
  width: 500px;
  height: 500px;
  background: ${Colors.Secondary};

  @media (max-width: 530px) {
    width: 450px;
    height: 450px;
  }

  @media (max-width: 450px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 350px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 250px) {
    width: 150px;
    height: 150px;
  }

  :hover {
    box-shadow: inset 0 0 40px ${(p: DragonImageProp) => p.color};
  }
`;
