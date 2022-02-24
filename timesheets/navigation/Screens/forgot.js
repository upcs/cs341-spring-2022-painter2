import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';

const ForgotPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor:'#A00000'}}>
          <Text style={{color:'#FFFFFF'}}>Forgot Password?</Text>
          
    </View>
)}

export default class Forgot extends React.Component{
    render () {
        return <ForgotPage/>
    }
}
