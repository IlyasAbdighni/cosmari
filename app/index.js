import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Store } from './config';
import Info from './routes/info';
import News from './routes/news';
import Collect from './routes/collect';
import Photo from './routes/photo';
import Theme from './styles';
import I18n from './config/lang/i18.js';

console.disableYellowBox = true;
const { width } = Dimensions.get('window');

class App extends Component {

  store = Store()

  render() {
    const TabIcon = ({ selected, title }) => {
      return (
          <View>
            <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
          </View>
      );
    };

    const navBarLeftBtn = () => {
      return (
        <View style={styles.leftBtnHolder}>
          <Text style={{ color: Platform.ios ? '#0A0A0A' : '' }}>{I18n.t('header.buttonText')}</Text>
          <Icon name="arrow-drop-down" size={38} color={Platform.ios ? '#0A0A0A' : ''} />
        </View>);
    };

    const navBarRightBtn = () => (
      <View>
        <Text>right</Text>
      </View>
    );

    return (
      <Provider store={this.store}>
        <Router
          renderLeftButton={navBarLeftBtn}
          renderRightButton={navBarRightBtn}
          navigationBarStyle={{backgroundColor: Theme.navBarBGColor}}
        >
          <Scene key="root">
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs
              tabBarStyle={{ backgroundColor: Theme.barBarBGColor }}
            >
              {/* Tab and it's scenes */}
              <Scene key="Info" title="Info" icon={TabIcon}>
                <Scene
                  key="InfoMain"
                  component={Info}
                  title=""
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="News" title="News" icon={TabIcon}>
                <Scene
                  key="NewsMain"
                  component={News}
                  title=""
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Collect" title="Collect" icon={TabIcon}>
                <Scene
                  key="CollectMain"
                  component={Collect}
                  title=""
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Photo" title="Photo" icon={TabIcon}>
                <Scene
                  key="PhotoMain"
                  component={Photo}
                  title=""
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  leftBtnHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8
  }

});

export default App;
