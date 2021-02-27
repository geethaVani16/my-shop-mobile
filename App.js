import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

import rootReducer from './store/rootReducer';
import ShopNavigator from './navigation/ShopNavigator';


const store = createStore(rootReducer,applyMiddleware(reduxThunk) ,composeWithDevTools())

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}

      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
