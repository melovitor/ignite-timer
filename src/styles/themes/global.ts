import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
    }

    body {
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    *::-webkit-scrollbar {
        width: 2px; 
    }

    *::-webkit-scrollbar-track {
        background: ${(props) => props.theme['gray-700']}
    }

    *::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme['green-500']};
        border-radius: 5px;     
    }
    @media (max-width: 768px) {
        body {
            margin: 1rem
        }
    }

`
