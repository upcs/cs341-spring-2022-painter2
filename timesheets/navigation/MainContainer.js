import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TimesheetScreen from './Screens/timesheets';
import HomeScreen from './Screens/homescreen';

const homeName = 'Home';
const timesheetsName = 'Timesheets';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        //adds the different tabs to the navigation bar 
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName={homeName} //sets the homepage to appear on startup
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //setting the icons of the navigation bar
          if (route.name === 'Home') {
            iconName = focused ? 'ios-time': 'ios-time-outline';
          }  else if (route.name === 'Timesheets') {
            iconName = focused ? 'ios-document-text':'ios-document-text-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        //currently using company colors from website
        //color of the navigation bar
        
        tabBarActiveTintColor: '#ab0e0e', //dark red
        tabBarInactiveTintColor: '#7a7a7a', // grey
        
      })}>
        {/*addng the pages to the navigation bar*/ }
      <Tab.Screen name={homeName} component={TimesheetScreen} />
      <Tab.Screen name={timesheetsName} component={HomeScreen} />
   
    </Tab.Navigator>
  </NavigationContainer>
);
}