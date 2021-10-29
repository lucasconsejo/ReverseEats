import React from 'react';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } 
  return <Navigation />
};

export default App;
