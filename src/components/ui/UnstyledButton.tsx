import styled, { css } from "styled-components";
import { COLORS } from "../../theme/theme";

export const unstyledButtonStyle = css`
  background: none;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  padding: 0;
`;

export const UnstyledButton = styled.button<{ weight?: number }>`
  font-weight: ${(p) => p.weight || "inherit"};

  &:disabled {
    color: ${(p) => (p.disabled ? COLORS.GREY : COLORS.BLACK)};
    cursor: ${(p) => (p.disabled ? "unset" : "pointer")};
  }

  ${unstyledButtonStyle}
`;
