import axios from 'axios';
import { Actions, ActionConst } from 'react-native-router-flux';

import { realm, getChoosenCommunity } from '../config';

import {
  COMMUNITY_LIST_OPENING,
  COMMUNITY_LIST_DONE,
  NEWS_OPENING,
  NEWS_OPENING_DONE
} from './types';

export const initailizeTheApp = () => {
  return dispatch => {
    dispatch({ type: NEWS_OPENING });
    axios.get('https://cosmari.e-lios.eu/API/Comuni/Detail?id=81')
         .then(res => dispatch({ type: NEWS_OPENING_DONE, payload: res.data }))
         .catch(error => console.log(error));
  };
};

export const newsTabPressed = () => {
  const { id } = getChoosenCommunity();
  return dispatch => {
    dispatch({ type: NEWS_OPENING });
    axios.get('https://cosmari.e-lios.eu/API/News/List?id=' + id)
         .then(res => dispatch({ type: NEWS_OPENING_DONE, payload: res.data }))
         .catch(error => console.log(error));
  };
};

export const infoTabPressed = () => {
  const { id } = getChoosenCommunity();
  return dispatch => {
    axios.get('https://cosmari.e-lios.eu/API/Comuni/Detail?id=' + id)
        .then(res =>
            dispatch({ type: 'app_opening_done', payload: res.data })
        )
        .catch(error => this.store.dispatch({ type: 'error', payload: error }));
  };
};

export const getCommunityList = () => {
  return dispatch => {
    Actions.communityList();
    dispatch({ type: COMMUNITY_LIST_OPENING });
    axios.get('https://cosmari.e-lios.eu/API/Comuni/List')
         .then(res => dispatch({ type: COMMUNITY_LIST_DONE, payload: res.data }))
         .catch(error => console.log(error));
  };
};

export const getCommunity = (id, name) => {
    const realmList = realm.objects('myLocalCommunities');
    const alreadyInTheList = realmList.filtered(`id = ${id}`);

    if (name !== null) {
      realm.write(() => {
        realmList.forEach((item) => {
          if (item.id !== id) {
            item.selected = false;
          } else {
            item.selected = true;
          }
        });
        if (alreadyInTheList.length === 0) {
          realm.create('myLocalCommunities', {name, id, selected: true});
        }
      });
    } else {
      realm.write(() => {
        if (realmList.length) {
          realmList.forEach((item) => {
            item.selected = false;
            if (id === item.id) {
              item.selected = true;
            }
          });
        }
      });
    }
    return dispatch => {
      axios.get('https://cosmari.e-lios.eu/API/Comuni/Detail?id=' + id)
           .then(res => {
                dispatch({ type: 'app_opening_done', payload: res.data });
                Actions.main({ type: ActionConst.RESET });
            })
           .catch(error => console.log(error));
    };
};
