/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Main from './components/MainComponent'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
 import { Loading } from './components/LoadingComponent';

 const { persistor, store } = ConfigureStore();


export default class App extends Component {
  render(){
  return (

      <Provider store={store}>
              <PersistGate 
         loading={<Loading />}
         persistor={persistor}>
        <Main />
        </PersistGate>
     </Provider>
  

  );
}
};



