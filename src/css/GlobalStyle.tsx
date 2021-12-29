
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;

    img {
      width: 100%;
    }
    ul,dd,figure,h5 {
      padding: 0;
      margin: 0;
    }
    li {
      list-style: none;
    }
  }
`;