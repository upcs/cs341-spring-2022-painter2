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
import LoginScreen from './Screens/login';
import ForgotScreen from './Screens/forgot';
import RegisterScreen from './Screens/register';

const Tab = createBottomTabNavigator();

//side menu options
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate("Login")}
      />
    </DrawerContentScrollView>
  );
}

//creates the side menu
const Drawer = createDrawerNavigator();
function BottomTabs() {
  const tsContext = useContext(AppContext)
  if (tsContext.currentRole == "Employee"){
    return(
      <Tab.Navigator
        initialRouteName='Home' //sets the homepage to appear on startup
          screenOptions={({ route }) => ({
            tabBarStyle: styles.navigator,
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
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            //currently using company colors from website
            //color of the navigation bar
            tabBarActiveTintColor: '#FFF', //white
            tabBarInactiveTintColor: '#000', // red
          })}>
            {/*adding the pages to the navigation bar*/ }
            <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Timesheets" component={StackNav} />
      </Tab.Navigator>
    );
  } else {
    return(
      <Tab.Navigator
        initialRouteName='Home' //sets the homepage to appear on startup
          screenOptions={({ route }) => ({
            tabBarStyle: styles.navigator,
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
              else if (route.name === 'Locations') {
                iconName = focused ? 'ios-map':'ios-map-outline';
              }
              else if (route.name === 'Profiles') {
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
            tabBarActiveTintColor: '#FFF', //white
            tabBarInactiveTintColor: '#000', // black
          })}>
            {/*adding the pages to the navigation bar*/ }
            
          <Tab.Screen name="Timesheets" component={StackNav} />
          <Tab.Screen name="Profiles" component={AdminScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Locations" component={DatabaseTesterScreen} />
          <Tab.Screen name="Jobsites" component={JobsiteConfigure} />
  
      </Tab.Navigator>
    );
  } 
}

export default function MainContainer() {
    const tsContext = useContext(AppContext);
    
    return (
  <NavigationContainer>
    <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} initialRouteName={"Login"}/>}
        >
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Timesheet" component={BottomTabs}/>
      </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create ({
  navigator: {
    backgroundColor: '#ab0e0e',
    paddingTop: 3
  },
  header: {
    backgroundColor: '#ab0e0e',
    padding: 10,
  }
})