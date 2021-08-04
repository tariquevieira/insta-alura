import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
    }

    ${normalize}

    body {
        margin: 0;
        padding: 0;
    }


    / * Full height layout */
    html, body {
        display: flex;
        min-height: 100vh;
        width: 100%;
    }
    #__next {
        flex: 1;
        display: felx;
        flex-direction: column;
    }
`;
