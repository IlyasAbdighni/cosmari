import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Store } from './config';
import Info from './routes/info';
import News from './routes/news';
import Collect from './routes/collect';
import Photo from './routes/photo';
import MyCityList from './routes/myCityList';
import Theme from './styles';
import I18n from './config/lang/i18.js';

console.disableYellowBox = true;
const { width } = Dimensions.get('window');
const RouterWithRedux = connect()(Router);

class App extends Component {

  store = Store()

  openMyCityList() {

  }

  renderIcons({ selected, title }) {
    const icons = {
      info: <Ionicons style={{ justifyContent: 'center', textAlign: 'center' }} name="md-information-circle" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      news: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="newspaper-o" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      collect: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="truck" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
      report: <FontAwesomeIcon style={{ justifyContent: 'center', textAlign: 'center' }} name="camera" size={24} color={selected ? '#fff' : '#E0E0E0'} />,
    };

    let icon = icons.info;

    switch (title) {
      case 'News':
        icon = icons.news;
        break;
      case 'Collect':
        icon = icons.collect;
        break;
      case 'Photo':
        icon = icons.report;
        break;
      default:
        icon = icons.info;
    }
    return (
      <View>
        {icon}
        {
          selected ? <Text style={{color: selected ? '#fff' : '#E0E0E0'}}>{title}</Text> : <View />
        }

      </View>
    );
  }

  render() {
    const navBarLeftBtn = () => {
      return (
        <TouchableOpacity style={styles.leftBtnHolder} onPress={Actions.MyCity}>
          <Text style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: 18 }}>{I18n.t('header.buttonText')}</Text>
          <Ionicons style={{ marginLeft: 7, textAlign: 'center' }} color='rgba(0, 0, 0, 0.87)' name="md-arrow-dropdown" size={30} />
        </TouchableOpacity>);
    };

    const navBarRightBtn = () => (
      <View>
        <Ionicons name="md-search" size={26} color='rgba(0, 0, 0, 0.87)' />
      </View>
    );

    return (
      <Provider store={this.store}>
        <RouterWithRedux
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
              pressOpacity={1}
            >
              {/* Tab and it's scenes */}
              <Scene key="Info" title="Info" icon={this.renderIcons} >
                <Scene
                  key="InfoMain"
                  component={Info}
                  title=""
                  sceneStyle={{ paddingTop: 50 }}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="News" title="News" icon={this.renderIcons}>
                <Scene
                  key="NewsMain"
                  component={News}
                  title=""
                  sceneStyle={{ paddingTop: 50 }}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Collect" title="Collect" icon={this.renderIcons}>
                <Scene
                  key="CollectMain"
                  component={Collect}
                  title=""
                  sceneStyle={{ paddingTop: 50 }}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Photo" title="Photo" icon={this.renderIcons}>
                <Scene
                  key="PhotoMain"
                  component={Photo}
                  title=""
                  sceneStyle={{ paddingTop: 50 }}
                />
              </Scene>
            </Scene>
            <Scene key='MyCity' renderRightButton={null} component={MyCityList} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  leftBtnHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    justifyContent: 'flex-start'
  }

});

export default App;
