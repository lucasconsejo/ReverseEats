import React from 'react';
import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './src/firebase/firebaseConfig';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } 
  return <Navigation />
};

export default App;
