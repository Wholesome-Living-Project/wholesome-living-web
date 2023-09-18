import { COLORS } from "@/theme/theme";
import { css, keyframes } from "styled-components";
import { alpha } from "../../theme/alpha";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const LoadingBG = css`
  animation: ${shimmer} 2s linear infinite forwards;
  background: linear-gradient(
    to right,
    ${alpha(0.1, COLORS.PRIMARY)} 8%,
    ${alpha(0.3, COLORS.PRIMARY)} 38%,
    ${alpha(0.1, COLORS.PRIMARY)} 54%
  );
  background-size: 1000px 640px;
  position: relative;
`;
