import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';

const RegisterPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor:'#A00000'}}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
          <Ionicons name={'person-outline'} size={30} style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Name"
                underlineColorAndroid='transparent'
                //onChangeText={(email) => props.setEmail(email)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'at-circle-outline'} size={30} style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                //onChangeText={(email) => props.setEmail(email)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'lock-open-outline'} size={30} style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                //onChangeText={(password) => props.setPassword(password)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'lock-closed-sharp'} size={30} style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Re-Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                //onChangeText={(password) => props.setPassword(password)}
          />
          </View>
          <TouchableHighlight onPress={() => props.onClickListener("login")} style={{activeOpacity: 0.5, underlayColor:'#FFFFFF'}}>
            <Ionicons name={'ios-log-in-outline'} size={80} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
    </View>
)}

export default class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {signedIn:false, register:false, forgot:false, name: "", email: "", password1: "", password: ""}
    }
    
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }
    
    render() {
        return <RegisterPage
            onClickListener={this.onClickListener}
            />
    }
}
