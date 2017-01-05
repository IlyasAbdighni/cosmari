import { NativeModules, Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import I18n from '../config/lang/i18';

import {
  NAME_CHANGED,
  PHONE_CHANGED,
  EMAIL_CHANGED,
  ADDRESS_CHANGED,
  DESCRIPTION_CHANGED
} from './types';

const Mailer = NativeModules.RNMail;

export const nameChanged = text => {
  return { type: NAME_CHANGED, payload: text };
};

export const phoneChanged = text => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const addressChanged = text => {
  return {
    type: ADDRESS_CHANGED,
    payload: text
  };
};

export const descriptionChanged = text => {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};

export const sendEmailWithPhoto = ({ name, phone, email, address, description, position = null }) => {
  return () => {
    const googleMapPosition =
        position ? `${I18n.t('emailContent.googleMapLink')}: https://www.google.it/maps/place/${position.latitude},${position.longitude}`
                 : '';
    Mailer.mail({
      subject: 'Need to collect this!',
      recipients: ['moreno.gentili@e-lios.eu'],
      body: `
        ${I18n.t('emailContent.sender')}: ${name}
        ${I18n.t('emailContent.senderPhone')}: ${phone}
        ${I18n.t('emailContent.senderEmail')}: ${email}
        ${I18n.t('emailContent.senderAddress')}: ${address}
        ${I18n.t('emailContent.description')}: ${description}
        ${googleMapPosition}
      `,
      attachment: {
        path: position.uri,
        type: 'jpg',
        name: 'Photo of the thing.jpg',
      }
    }, (error, event) => {
      console.log(event);
        if (error) {
          Alert.alert('Error',
            'Could not send mail. Please try to send it again or send it through browser using your own email');
        } else if (event === 'sent') {
          Toast.show(I18n.t('emailContent.emailSentSuccess'), {
              duration: Toast.durations.SHORT,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
          });
        }
    });
  };
};

export const sendEmailOnlyText = ({ name, phone, email, address, description, position }) => {
  let googleMapLink = '';
  if (position) {
    googleMapLink = `${I18n.t('emailContent.googleMapLink')}: https://www.google.it/maps/place/${position.coords.latitude},${position.coords.longitude}`;
  }
  return () => {
    Mailer.mail({
      subject: I18n.t('emailContent.emailSubject'),
      recipients: ['moreno.gentili@e-lios.eu'],
      body: `
        ${I18n.t('emailContent.sender')}: ${name}
        ${I18n.t('emailContent.senderPhone')}: ${phone}
        ${I18n.t('emailContent.senderEmail')}: ${email}
        ${I18n.t('emailContent.senderAddress')}: ${address}
        ${I18n.t('emailContent.description')}: ${description}
        ${googleMapLink}
      `
    }, (error, event) => {
        if (error) {
          Alert.alert(I18n.t('emailContent.emailSentFail'));
        } else if (event === 'sent') {
          Toast.show(I18n.t('emailContent.emailSentSuccess'), {
              duration: Toast.durations.SHORT,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0
          });
        }
    });
  };
};
