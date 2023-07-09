// eslint-disable-next-line no-unexpected-multiline
import { createGlobalStyle } from "styled-components";

export const PRIMARY_TINTS = {
  900: "#152021",
  800: "#24393A",
  700: "#345153",
  600: "#3E6163",
  500: "#497174",
  400: "#5A8D90",
  300: "#72A3A7",
  200: "#AAC8CA",
  100: "#C7DADC",
};

export const SECONDARY_TINTS = {
  900: "#508080",
  800: "#70A5A5",
  700: "#9AC0C0",
  600: "#C5DBDB",
  500: "#EFF5F5",
  400: "#F2F7F7",
  300: "#F4F8F8",
  200: "#F5F9F9",
  100: "#F7FAFA",
};

export const COLORS = {
  WHITE: "#fbfbff",
  BLACK: "#292929",
  GREY: "#e1e1e1",
  DARK_GREY: "#757575",
  RED: "red",
  PRIMARY: PRIMARY_TINTS["500"],
  SECONDARY: SECONDARY_TINTS["700"],
  CTA: "#DE3163",
  BACKGROUND_GREY: "#eaeaea",
  HEADER: "#D6E4E5",
  TAB_BAR_ICONS: PRIMARY_TINTS["600"],
  GOLD: "#ffce19",
  LIGHT_GOLD: "#ffeec2",
};

export const EXTRA_COLORS = {
  PURPLE: "#8A84E2",
  PURPLE_LIGHT: "#9891ec",
  MAUVE: "#9898d7",
  MAUVE_LIGHT: "#9b9bec",
  BLUE: "#64b4ec",
  BLUE_LIGHT: "#99cef8",
  SUNSET: "#ff9179",
  SUNSET_LIGHT: "#ffb7a8",
  JORDY: "#5791da",
  JORDY_LIGHT: "#a5cdff",
  FINA: "#7457af",
  FINA_LIGHT: "#a081e1",
};

export const CHART_COLORS = [
  "#33cbb0",
  "#c4ef88",
  "#b00d9d",
  "#09a3be",
  "#989898",
];

export const SPACING = 8;

export const BACKGROUND_PADDING = 4 * SPACING;

export const HEADER_HEIGHT = 75;
export const FOOTER_HEIGHT = 150;
export const SIDEBAR_WIDTH = 250;
export const MOBILE_SIDEBAR_HEIGHT = 75;
export const FILTER_HEIGHT = 75;

export const OUTER_BORDER_RADIUS = 12;
export const INNER_BORDER_RADIUS = 6;

export const IO_COMPONENT_WIDTH_PERCENT = 0.9;

export const SCREEN_PADDING = 16;

export const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
  }
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td { 
    margin: 0;
  }
  html,body {
    font-size: 14px;
    @media only screen and (min-width: 992px) {
      font-size: 16px;
    }
    margin: 0;
    height: 100%;
  }
  
  body {
    line-height: 1.5;
    
  }
  
  input {
    &:focus {
      outline: none;
    }
  }
  
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    color: ${COLORS.PRIMARY};
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  ol, ul {
    list-style: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button{
    border: none;
  }
  #__next{
    min-height: 100%;
    display: flex;
    flex-direction: column;
    white-space: pre-line;
  }
`;
