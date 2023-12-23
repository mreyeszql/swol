import React, { useEffect } from 'react';
import Navigation from 'Navigation';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <Navigation />
  );
}

export default App;