import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text } from 'react-native';
import TabsRoutes from './routes';

const Tabs = createBottomTabNavigator();

const customTabBarIcon = (focused: boolean, icon: IconDefinition) => <FontAwesomeIcon icon={icon} color={focused ? "#3EB6BA" : "#ABABAE"} size={Platform.OS == "android" ? 25 : 30 } />;
const customTabBarLabel = (focused: boolean, label: string) => <Text style={{ fontSize: 11, fontWeight: focused ? "bold" : "normal",  color: focused ? "#3EB6BA" : "#ABABAE" }}>{label}</Text>;

const tabsScreenOption = {
    headerShown: false,
    tabBarStyle: { 
        height: Platform.OS == "android" ? 60 : 90
    }, 
    tabBarItemStyle: { 
        paddingVertical: Platform.OS == "android" ? 10 : 5 
    },
};

const BottomTabsNavigation: React.FC = () => (
    <Tabs.Navigator screenOptions={tabsScreenOption}>
      {
        TabsRoutes.map((item) => (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            component={item.component} 
            options={{ 
              tabBarLabel: ({ focused }) => customTabBarLabel(focused, item.label),
              tabBarIcon: ({ focused }) => customTabBarIcon(focused, item.icon)
            }}
          />
        ))
      }
    </Tabs.Navigator>
);

export default BottomTabsNavigation;
