import styled, { css } from "styled-components";
import { COLORS, SPACING } from "./theme";

export const TEXT_SIZE = 12;

export enum FontWeights {
  Thin = 100,
  ExtraLight = 200,
  Light = 300,
  Normal = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
  ExtraBold = 800,
  Black = 900,
}

export type TextProps = {
  size?: number;
  weight?: keyof typeof FontWeights | number;
  center?: boolean;
  color?: string;
  block?: boolean;
};

export const HeadingRoot = css`
  font-weight: 500;
  margin: ${SPACING / 3}px 0;
`;

export type AttrProps = {
  weight?: string;
  block?: boolean;
  center?: boolean;
  color?: string;
  margin?: boolean;
};

const H1 = styled.span`
  ${HeadingRoot};
  font-size: 40px;
`;

const H2 = styled.span`
  ${HeadingRoot};
  font-size: 32px;
`;

const H3 = styled.span`
  ${HeadingRoot};
  font-size: 28px;
`;

const H4 = styled.span`
  ${HeadingRoot};
  font-size: 24px;
`;

const H5 = styled.span`
  ${HeadingRoot};
  font-size: 20px;
`;

const H6 = styled.span`
  ${HeadingRoot};
  font-size: 16px;
`;

const Text = styled.span<TextProps>`
  font-size: ${(p) => p.size ?? TEXT_SIZE}px;
  text-align: ${(p) => (p.center ? "center" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
  display: ${(p) => (p.block ? "block" : "inline")};
  font-weight: ${(p) =>
    typeof p.weight === "number"
      ? p.weight
      : FontWeights[p.weight ?? "Normal"]};
`;

export const Label = styled(Text)<AttrProps>`
  ${HeadingRoot};
  font-size: 18px;
  font-weight: ${(p) => p.weight ?? FontWeights.Medium};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Regular = styled(Text)<AttrProps>`
  ${HeadingRoot};
  font-size: 16px;
  font-weight: ${(p) => p.weight ?? FontWeights.Normal};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Body = styled(Text)<AttrProps>`
  ${HeadingRoot};
  font-size: 14px;
  font-weight: ${(p) => p.weight ?? FontWeights.Normal};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Light = styled(Text)<AttrProps>`
  ${HeadingRoot};
  font-size: 14px;
  font-weight: ${(p) => p.weight ?? FontWeights.Light};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Caption = styled(Text)<AttrProps>`
  ${HeadingRoot};
  font-size: 12px;
  font-weight: ${(p) => p.weight ?? FontWeights.Light};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading1 = styled(H1)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading2 = styled(H2)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading3 = styled(H3)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading4 = styled(H4)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading5 = styled(H5)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading6 = styled(H6)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;

export const Heading7 = styled(Text)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.Medium};
  text-align: ${(p) => (p.center ? "center" : p.block ? "justify" : "left")};
  color: ${(p) => p.color ?? COLORS.BLACK};
`;
