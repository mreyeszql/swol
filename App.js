import Navigation from 'Navigation';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';


import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);


const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter/extras/ttf/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter/extras/ttf/Inter-Light.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter/extras/ttf/Inter-ExtraLight.ttf'),
  });
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <Navigation />
    </>
  
  );
}

export default App;