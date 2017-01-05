import I18n from 'react-native-i18n';
import en from './en';
import it from './it';

I18n.fallbacks = true;
I18n.translations = {
  en,
  it
};

export default I18n;
