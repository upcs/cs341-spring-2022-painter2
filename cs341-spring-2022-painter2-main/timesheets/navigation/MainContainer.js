import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useContext } from 'react';

import TimesheetScreen from './Screens/timesheets';
import AdminScreen from './Screens/admin';
import HomeScreen from './Screens/homescreen';
import StackNav from './Screens/Stack'
import DatabaseTesterScreen from './Screens/DatabaseTesterScreen';
import AppContext from './Context.js';
import JobsiteConfigure from './Screens/jobsiteConfigure';

const Tab = createBottomTabNavigator();


//side menu options
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="English"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Español"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

//creates the side menu
const Drawer = createDrawerNavigator();
function BottomTabs() {
  return(
    <Tab.Navigator
      initialRouteName='Home' //sets the homepage to appear on startup
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
              //console.log("Main Container: role - ", ts.currentRole);
            //setting the icons of the navigation bar
            if (route.name === 'Home') {
              iconName = focused ? 'ios-time': 'ios-time-outline';
            } 
            else if (route.name === 'Timesheets') {
              iconName = focused ? 'ios-document-text':'ios-document-text-outline';
            }
            else if (route.name === 'DatabaseTester') {
              iconName = focused ? 'ios-map':'ios-map-outline';
            }
            else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person':'ios-person-outline';
            }
            else if (route.name === 'Jobsites') {
              iconName = focused ? 'business':'business-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          //currently using company colors from website
          //color of the navigation bar
          tabBarActiveTintColor: '#ab0e0e', //dark red
          tabBarInactiveTintColor: '#7a7a7a', // grey
        })}>
          {/*adding the pages to the navigation bar*/ }
        <Tab.Screen name="Timesheets" component={StackNav} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="DatabaseTester" component={DatabaseTesterScreen} />
        <Tab.Screen name="Profile" component={AdminScreen} />
        <Tab.Screen name="Jobsites" component={JobsiteConfigure} />

    </Tab.Navigator>
  );
}

export default function MainContainer() {
    const tsContext = useContext(AppContext);
    
    return (
  <NavigationContainer>
    <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="Timesheet" component={BottomTabs} />
      </Drawer.Navigator>
  </NavigationContainer>
);
}
