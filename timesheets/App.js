import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from './navigation/MainContainer';
import Register from './navigation/Screens/register';
import Forgot from './navigation/Screens/forgot';
import styles from './navigation/Screens/styles/loginStyle.js';


/*LOGIN PAGE*/
const LoginPage = props => {
  return (
    <View style={styles.background}>
          <View style={styles.inputContainer}>
          <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => props.setEmail(email)}/>
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'lock-open-outline'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => props.setPassword(password)}/>
          </View>
          <TouchableHighlight onPress={() => props.onClickListener("login")}>
            <Ionicons name={'ios-log-in-outline'} size={100} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => props.onClickListener("restore_password")}>
            <Text style={styles.touchable}>Forgot your password?</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => props.onClickListener("register")}>
            <Text style={styles.touchable}>Register</Text>
          </TouchableHighlight>
          </View>
  )
}

/*MAIN*/
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signedIn:false, register:false, forgot:false, name: "", email: "", password: ""}
    }
    
    onClickListener = (viewId) => {
        //Alert.alert("Alert", "Button pressed "+viewId);
        if (viewId == "login"){
            if (this.state.password.length != 0 && this.state.password.length != 0) {
                this.setState({ signedIn: true })
            } else {
                Alert.alert("Try Again","Incorrect email or password")
            }
        }
        else if (viewId == "register"){
            this.setState({ register: true })
        }
        else if (viewId == "restore_password"){
            this.setState({ forgot: true })
        }
    }

    setEmail = async (e) => {
        this.setState({email: e})}

    setPassword = async (p) => {
        this.setState({password: p})}
    
    signIn = async () => {
    }
    
    render() {
        if(this.state.signedIn){
            return <MainContainer/>
        }
        else if(this.state.register){
            return <Register/>
        }
        else if(this.state.forgot){
            return <Forgot/>
        }
        return (
            <LoginPage
                setEmail={this.setEmail}
                setPassword={this.setPassword}
                onClickListener={this.onClickListener}/>
        )
    }
}
