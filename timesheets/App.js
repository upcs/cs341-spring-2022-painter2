import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from './navigation/MainContainer';

const LoginPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor:'#A00000'}}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => props.setEmail(email)}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => props.setPassword(password)}/>
          </View>
          <TouchableHighlight onPress={() => props.onClickListener("login")} style={{activeOpacity: 0.5, underlayColor:'#FFFFFF' }}>
          <Ionicons name={'ios-log-in-outline'} size={80} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => props.onClickListener("restore_password")}>
            <Text style={{color:'#FFFFFF'}}>Forgot your password?</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => props.onClickListener("register")}>
            <Text style={{color:'#FFFFFF'}}>Register</Text>
          </TouchableHighlight>
          </View>
          /*
          */
          
  )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signedIn: false, name: "", email: "", password: ""}
    }
    
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
        this.setState({
            signedIn: true
        })
    }
    
    setName = async (n) => {
        this.setState({name: n})}

    setEmail = async (e) => {
        this.setState({email: e})}

    setPassword = async (p) => {
        this.setState({password: p})}
    
    signIn = async () => {
    }
    
    render() {
        return (
                this.state.signedIn ? <MainContainer/> : <LoginPage
                 setName={this.setName}
                 setEmail={this.setEmail}
                 setPassword={this.setPassword}
                 onClickListener={this.onClickListener}/>
        )
    }
}

        

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderColor: '#FF0000',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:0,
    width:250,
    borderRadius:0,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
