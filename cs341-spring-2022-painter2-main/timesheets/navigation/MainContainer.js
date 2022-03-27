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

import TimesheetScreen from './Screens/timesheets';
import HomeScreen from './Screens/homescreen';
import StackNav from './Screens/Stack'
import DatabaseTesterScreen from './Screens/DatabaseTesterScreen';
import JobsiteConfigure from './Screens/jobsiteConfigure';
import { useContext } from 'react';
import AppContext from './Context';


const homeName = 'Home';
const timesheetsName = 'Timesheets';

const Tab = createBottomTabNavigator();
const tsContext = useContext(AppContext);

//side menu options
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="English"
        onPress={() => {
          tsContext.setCurrLang("EN");
          props.navigation.closeDrawer()
        }}
      />
      <DrawerItem
        label="Español"
        onPress={() => {
          tsContext.setCurrLang("ES");
          props.navigation.closeDrawer()
        }}
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
            //setting the icons of the navigation bar
            if (route.name === 'Home') {
              iconName = focused ? 'ios-time': 'ios-time-outline';
            } 
            else if (route.name === 'Timesheets') {
              iconName = focused ? 'ios-document-text':'ios-document-text-outline';
            }
            else if (route.name === 'DatabaseTester') {
              iconName = focused ? 'ios-document-text':'ios-document-text-outline';
            }
            else if (route.name === 'jobsiteConfigure') {
              iconName = focused ? 'ios-document-text':'ios-document-text-outline';
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
        <Tab.Screen name="JobsiteConfigure" component={JobsiteConfigure} />

    </Tab.Navigator>
  );
}

export default function MainContainer() {
    return (
  <NavigationContainer>
    <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="App Name" component={BottomTabs} />
      </Drawer.Navigator>
  </NavigationContainer>
);
}