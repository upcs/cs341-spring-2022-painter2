import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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

//creates the navigation bar
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    //adds the different tabs to the navigation bar 
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-build' : 'ios-build-outline';
            } else if (route.name === 'Timesheets') {
              iconName = focused ? 'ios-document-text':'ios-document-text-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          //currently using company colors from website
          //color of the navigation bar
          tabBarActiveTintColor: '#ab0e0e',
          tabBarInactiveTintColor: '#7a7a7a',
        })}>
          {/*adding the pages to the navigation bar*/ }
        <Tab.Screen name="Timesheets" component={TimesheetScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}