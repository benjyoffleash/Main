import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/App';

AppRegistry.registerComponent('IFSMeditationApp', () => App);
TrackPlayer.registerPlaybackService(
  () => require('./src/services/trackPlayerService').default,
);
