import * as React from 'react';
import * as Expo from 'expo';
import { Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth';

const { URLSchemes } = AppAuth;

//creates the navigation bar

function NavigationBar() {
    return (
            //adds the different tabs to the navigation bar
            <NavigationContainer style={{alignItems:'flex-end'}}>
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
            </NavigationContainer>
    );
}


const LoginPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Button title="Sign in with Google"
       onPress={() => props.defaultIn()} />
          <Ionicons name={'ios-log-in'} size={50}/>
    </View>
  )
}


//The Home Screen
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text alignItems={'center'}>Home Page</Text>
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

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {signedIn: false, name: "", photoUrl: ""}
    }
    
    /*SIGN IN FUNCTION --Not being used-- */
    signIn = async () => {
        try {
          const result = await GoogleSignIn.signInAsync({
            iosClientId: '5699070269-c7aa7d19sd11phu97enoej9uv9gjk326.apps.googleusercontent.com',
            androidClientId: '5699070269-i41csk7jjigklrvae86mpc2gb4207ncd.apps.googleusercontent.com',
            scopes: ["profile", "email"]
          })
          if (result.type === "success") {
            this.setState({
              signedIn: true,
              name: result.user.name,
              photoUrl: result.user.photoUrl
            })
          } else {
            console.log("cancelled")
          }
    } catch (e) {
          console.log("error", e)
        }
    }
    
    /*Default Sign In*/
    defaultIn = async () => {
        this.setState({
            signedIn: true
        })
    }
    
    render() {
        return (
                <View style={{ flex: 1, justifyContent: 'center'}}>
                { this.state.signedIn ? <NavigationBar/> :
                  <LoginPage defaultIn={this.defaultIn}/>
                }
                </View>
        )
    }
}
