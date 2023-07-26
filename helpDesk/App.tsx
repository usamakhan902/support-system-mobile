import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {AuthProvider} from './src/providers/AuthProvider';
import {store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';

let persistor = persistStore(store);

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
            <AppNavigator />
          </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
