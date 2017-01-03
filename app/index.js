import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './config';

console.disableYellowBox = true;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>ilyas</Text>
        </View>
      </Provider>
    );
  }
}
export default App;
