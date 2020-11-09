import { createGlobalStyle, ThemeProvider } from 'styled-components';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './global.css';

import 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';

let timer;
let state;
let activeRequests = 0;
const delay = 250;

function load() {
  if (state === 'loading') {
    return;
  }
  state = 'loading';
  timer = setTimeout(function () {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return;
  }
  state = 'stop';
  clearTimeout(timer);
  NProgress.done();
}

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);

// const originalFetch = window.fetch;
// window.fetch = async (...args) => {
//   if (activeRequests === 0) {
//     load();
//   }
//
//   activeRequests++;
//
//   try {
//     const response = await originalFetch(...args);
//     return response;
//   } catch (error) {
//     return Promise.reject(error);
//   } finally {
//     activeRequests -= 1;
//     if (activeRequests === 0) {
//       stop();
//     }
//   }
// };

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
