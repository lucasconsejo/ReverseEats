import React, { useEffect, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './src/firebase/firebaseConfig';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { getCacheUser } from './src/cache/user';
import UserProvider from './src/context/userProvider';
import DateProvider from './src/context/DateProvider';

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
  return (
    <UserProvider>
      <DateProvider>
        <Navigation defaultRoute={defaultRoute} />
      </DateProvider>
    </UserProvider>
    )
};

export default App;
