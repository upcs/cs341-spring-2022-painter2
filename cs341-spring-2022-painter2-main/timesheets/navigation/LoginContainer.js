import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from './MainContainer';
import LoginScreen from './Screens/login';
import ForgotScreen from './Screens/forgot';
import RegisterScreen from './Screens/register';

const screens = {
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Main: {
        screen: MainContainer,
        navigationOptions: {
            headerShown: false
        }
    },
    Forgot: {
        screen: ForgotScreen
    },
    Register: {
        screen: RegisterScreen
    }
}

const LoginStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerMode: 'screen',
        headerBackImage: () => <Ionicons name={'ios-arrow-back'} size={40} style={{color:'#FFFFFF', marginLeft: 10}} />,
        headerBackTitleVisible: false,
        headerTitleStyle: {
            color:'#A00000'
        },
        headerStyle: {
            backgroundColor: '#A00000',
            height: 100,
        }
        
    }
});

export default createAppContainer(LoginStack);
