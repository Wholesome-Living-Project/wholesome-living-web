import {
  COLORS,
  FILTER_HEIGHT,
  HEADER_HEIGHT,
  OUTER_BORDER_RADIUS,
} from "@/theme/theme";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

export const MainContentContainer = styled(Flex)`
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: calc(100% - ${HEADER_HEIGHT}px - ${FILTER_HEIGHT}px);

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    height: calc(100% - ${HEADER_HEIGHT}px - ${FILTER_HEIGHT}px);
  }
`;
