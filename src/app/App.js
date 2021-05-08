import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from './navigation/rootNavigation';

import store from "./store/reducers/index.js";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};


export default App;
