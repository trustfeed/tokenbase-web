import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import { RouterNode } from './routes';
import registerServiceWorker from './registerServiceWorker';
import { NotificationContainer } from 'react-notifications';
import { PersistGate } from 'redux-persist/integration/react';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import '!style-loader!css-loader!react-notifications/lib/notifications.css';
import '!style-loader!css-loader!react-rangeslider/lib/index.css';
import '!style-loader!css-loader!./index.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <div>
          <RouterNode />
          <NotificationContainer />
        </div>
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
