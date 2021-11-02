import React, { useEffect, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './src/firebase/firebaseConfig';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { getCacheUser } from './src/cache/user';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  const [defaultRoute, setDefaultRoute] = useState<string>("Login");
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    getCacheUser()
    .then(res => {
        if (res?.length) {
          setDefaultRoute("Home");
        }
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } 
  return <Navigation defaultRoute={defaultRoute} />
};

export default App;
