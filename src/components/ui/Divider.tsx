import { COLORS } from "@/theme/theme";
import styled from "styled-components";

type Props = { color?: string };

const Line = styled.div<Props>`
  width: 100%;
  height: 1px;
  background-color: ${(p) => p.color ?? COLORS.GREY};
`;

const Divider = (props: Props) => {
  return <Line {...props} />;
};

export default Divider;
