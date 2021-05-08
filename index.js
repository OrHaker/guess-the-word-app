/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app/App.js';
import { name as appName } from './app.json';
import { I18nManager } from 'react-native';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

AppRegistry.registerComponent(appName, () => App);
