import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//The Home Screen
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>
    </View>
  );
}

//The Setting Page
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Page</Text>
    </View>
  );
}

//Timesheets page
function TimesheetScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Timesheets Page</Text>
    </View>
  )
}

//side menu options
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="English"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Spanish"
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
            //setting the icons of the navigation bar
            if (route.name === 'Home') {
              iconName = focused ? 'ios-time': 'ios-time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-build' : 'ios-build-outline';
            } else if (route.name === 'Timesheets') {
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
        <Tab.Screen name="Timesheets" component={TimesheetScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

//creates the navigation bar
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    //adds the different tabs to the navigation bar 
     <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
        <Drawer.Screen name="App Name" component={BottomTabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}