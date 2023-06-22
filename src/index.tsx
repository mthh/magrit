import { render } from 'solid-js/web';
import {
  Route, Router, Routes,
} from '@solidjs/router';
import { JSX } from 'solid-js';
import TypesafeI18n from './i18n/i18n-solid';
import { loadLocale } from './i18n/i18n-util.sync';

import 'bulma/css/bulma.min.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';
import './styles/Main.css';

import WelcomePage from './WelcomePage.tsx';
import AppPage from './AppPage.tsx';

if (Array.prototype.toReversed === undefined) {
  Array.prototype.toReversed = function arrayToReversed() { // eslint-disable-line no-extend-native
    return this.slice().reverse();
  };
}

const root: HTMLElement = document.getElementById('root');
root.classList.add('content');

console.log('app root', 'root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

loadLocale('en');

render(
  () => (
  <TypesafeI18n>
    <Router>
      <Routes>
        <Route path="/" end element={ <WelcomePage /> } />
        <Route path="/app" element={ <AppPage /> } />
      </Routes>
    </Router>
  </TypesafeI18n>
  ) as JSX.Element,
  root,
);
