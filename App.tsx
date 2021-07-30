import React from 'react';
declare const global: {HermesInternal: null | {}};
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import createStore from './app/reducers';
import RootScreen from './app/components/root/RootScreen';

const {store, persistor} = createStore();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
