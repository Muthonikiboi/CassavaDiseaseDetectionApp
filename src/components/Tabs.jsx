import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Model from "../screens/Model";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#0E593C',
      tabBarInactiveTintColor: 'black',
      headerShown:false
    }}>
      <Tab.Screen
        name="Model"
        component={Model} // Pass the Model component to the component prop
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome5 name="home" size={24} color={focused ? '#0E593C' : 'black'} />
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="settings-sharp" size={24} color={focused ? '#0E593C' : 'black'} />
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
