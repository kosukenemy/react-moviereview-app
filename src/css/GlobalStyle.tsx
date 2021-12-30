
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;

    img {
      width: 100%;
    }
    iframe {
      display: block;
    }
    ul,dd,figure,h5 {
      padding: 0;
      margin: 0;
    }
    li {
      list-style: none;
    }
    .slick-dots {
      bottom: -50px !important;
    }
    .slick-dots li button:before {
      color: #fff !important;
    }
  }
`;