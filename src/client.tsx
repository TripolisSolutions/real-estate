import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css'
import './app/styles/index.less'

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';
import * as log from 'loglevel'

log.setLevel(0)

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
const { Router, browserHistory } = require('react-router');
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect } = require('redux-connect');
import { configureStore } from './app/redux/store';
import 'isomorphic-fetch';
import routes from './app/routes';
import i18n from './i18n'

const store: Redux.Store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__
);

// init sync client lang with server
let lng = window.__INITIAL_STATE__.i18nData.currentLangCode
i18n.changeLanguage(lng)

store.subscribe(() => {
  const nextLang = store.getState().i18nData.currentLangCode

  if (!nextLang) {
    return
  }

  if (nextLang !== lng) {
    i18n.changeLanguage(nextLang)
    lng = nextLang
  }
})

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store} key='provider'>
      <Router
        history={history}
        render={(props) =>
          <ReduxAsyncConnect {...props} />
        }
      >
        {routes}
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('app')
);
