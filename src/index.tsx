import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import { JSX } from 'solid-js';
// import { WebR } from '@r-wasm/webr';

// import { useRegisterSW } from 'virtual:pwa-register/solid';
// import { registerSW } from 'virtual:pwa-register';

import TypesafeI18n from './i18n/i18n-solid';
import { loadLocale } from './i18n/i18n-util.sync';
import { initializeLightDarkMode } from './helpers/darkmode';
import './helpers/array.extension';

import 'bulma/css/bulma.min.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';
import './styles/DarkModeBulma.css';
import './styles/Main.css';

import WelcomePage from './WelcomePage.tsx';
import AppPage from './AppPage.tsx';

// if ('serviceWorker' in navigator) {
//   // && !/localhost/.test(window.location)) {
//   console.log('foo');
//   registerSW();
// }

// Maybe we should use https://www.npmjs.com/package/vite-plugin-static-copy
// to copy all WebR files to the dist folder
// and then use the '/dist/' baseUrl to load them from there
// globalThis.webR = new WebR({
//   baseUrl: '/node_modules/@r-wasm/webr/dist/',
// });
// globalThis.webR.init();

const root = document.getElementById('root') as HTMLElement;
root.classList.add('content');

loadLocale('en');

// Handle the light / dark mode according to user preference
// (internally it uses the prefers-color-scheme media query,
// and we also subscribe to changes in the user preference
// to update the mode accordingly)
initializeLightDarkMode();

render(
  () => (
  <TypesafeI18n locale={'en'}>
    <Router>
      <Route path="/" component={ WelcomePage } />
      <Route path="/app" component={ AppPage } />
    </Router>
  </TypesafeI18n>
  ) as JSX.Element,
  root,
);
