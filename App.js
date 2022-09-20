import Provider from './src/application/provider';
import Navigation from './src/navigation';
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return <Provider>
    <Navigation/>
  </Provider>
  ;
};