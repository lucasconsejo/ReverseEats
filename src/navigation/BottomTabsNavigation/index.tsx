import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import TabsRoutes from './routes';
import HomeIcon from "../../assets/icons/home.svg"
import { OrderContext } from '../../context/orderProvider';
import { colors } from '../../theme/colors';

const Tabs = createBottomTabNavigator();

const customTabBarIcon = (focused: boolean, icon: IconDefinition, label: string) => {
  switch (label) {
    case "Commandes":
      const { orderState } = useContext(OrderContext);
      return orderState.length ? (
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={icon} color={focused ? "#3EB6BA" : "#ABABAE"} size={Platform.OS == "android" ? 25 : 30 } />
          <View style={styles.badge}>
            <Text style={styles.badgeColor}>{orderState.length}</Text>
          </View>
        </View>
      ) : <FontAwesomeIcon icon={icon} color={focused ? "#3EB6BA" : "#ABABAE"} size={Platform.OS == "android" ? 25 : 30 } />
    case "Accueil":
      return <HomeIcon width={Platform.OS == "android" ? 30 : 35 } height={Platform.OS == "android" ? 30 : 35 } style={{color: focused ? "#3EB6BA" : "#ABABAE"}} /> 
    default:
      return <FontAwesomeIcon icon={icon} color={focused ? "#3EB6BA" : "#ABABAE"} size={Platform.OS == "android" ? 25 : 30 } />
  }
}

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
              tabBarIcon: ({ focused }) => customTabBarIcon(focused, item.icon, item.label)
            }}
          />
        ))
      }
    </Tabs.Navigator>
);

export default BottomTabsNavigation;

const styles = StyleSheet.create({
  iconContainer: { 
    flexDirection: "row" 
  },
  badge: { 
    top: -7, 
    right: -12, 
    position: "absolute", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.primary, 
    width: 20, 
    height: 20, 
    borderRadius: 100 
  },
  badgeColor: { 
    color: colors.white, 
    fontSize: 10 
  }
});

