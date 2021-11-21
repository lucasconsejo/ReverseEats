import React, { useContext, useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './src/firebase/firebaseConfig';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { getCacheUser, setCacheUser } from './src/cache/user';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { patchUserNotifToken } from './src/firebase/authRequests';
import useUser from './src/hooks/useUser';
import { OrderContext } from './src/context/orderProvider';
import { getOrders } from './src/firebase/orderRequests';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  const [defaultRoute, setDefaultRoute] = useState<string>("Login");
  const isLoadingComplete = useCachedResources();
  const { orderDispatch } = useContext(OrderContext);
  const [user, userDispatch] = useUser();
  // Notifications
  const [expoPushToken, setExpoPushToken] = useState<string|undefined>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  useEffect(() => {
    getCacheUser()
    .then((res: any) => {
      if (res?.length) {
        const data = JSON.parse(res);
        userDispatch({ 
          type: "ADD_USER",
          payload: data
        })
        getOrders(data.id)
        .then(res => res.json())
        .then((res: any) => {
          if (res.data.length) {
            orderDispatch({
              type: "INIT_ORDER",
              payload: res.data,
            })
          }
          setDefaultRoute("Home");
        })
      }
    });
  }, []);

  useEffect(() => {
    if(user != null && !responseListener.current){
      registerForPushNotificationsAsync()
      .then((token: string|undefined) => {
        patchUserNotifToken(user.id, token)
        .then(() => {
          setCacheUser({...user, notifToken: token})
        });
      });
      
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      });
    }
    if(user == null && responseListener.current){
      Notifications.removeNotificationSubscription(responseListener.current);
    }

    return () => {
      if(responseListener.current){
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user]);

  if (!isLoadingComplete) {
    return null;
  } 
  
  return <Navigation defaultRoute={defaultRoute} />
};



export default App;

const sendPushNotification = async (expoPushToken: string) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
