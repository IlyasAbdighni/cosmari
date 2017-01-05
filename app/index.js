import axios from 'axios';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { Store, BaseURl } from './config';
import Info from './routes/info';
import News from './routes/news';
import Collect from './routes/collect';
import Photo from './routes/photo';

console.disableYellowBox = true;

class nav extends Component {
  render() {
    return <Text>ilyas</Text>;
  }
};

class App extends Component {

  store = Store()

  render() {
    const TabIcon = ({ selected, title }) => {
      return (
        <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
      );
    };

    const navBar = () => {
      return <Text>ilyas</Text>;
    };

    return (
      <Provider store={this.store}>
        <Router renderBackButton={navBar}>
          <Scene key="root" rightTitle="Apply">
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs
              tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Tab and it's scenes */}
              <Scene key="Info" title='Info' hideNavBar rightTitle="Apply" component={Info} icon={TabIcon} />

              {/* Tab and it's scenes */}
              <Scene key="News" title="News" component={News} icon={TabIcon} />

              {/* Tab and it's scenes */}
              <Scene key="Collect" title="Collect" component={Collect} icon={TabIcon} />

              {/* Tab and it's scenes */}
              <Scene key="Photo" title="Photo" component={Photo} icon={TabIcon} />

            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
export default App;
