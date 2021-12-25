import styled from "styled-components";
import { Text } from "components/text";
import { Colors } from "@/config/colors";

export const CardText = styled(Text)`
  flex: 1 0 0%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 246px;

  span {
    color: ${Colors.Success};
  }
`;
