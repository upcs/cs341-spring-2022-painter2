import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import App from './../../App';

const ForgotPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor:'#A00000'}}>
          <Text style={styles.title}>Forgot Password?</Text>
          <View style={styles.inputContainer}>
          <Ionicons name={'at-circle-outline'} size={30} style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => props.setEmail(email)}
          />
          </View>
          <TouchableHighlight onPress={() => props.onClickListener()} style={{activeOpacity: 0.5, underlayColor:'#FFFFFF'}}>
            <Ionicons name={'ios-log-in-outline'} size={80} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
    </View>
)}

export default class Forgot extends React.Component{
    constructor(props) {
        super(props)
        this.state = {toForget:false, fEmail: ""}
    }
    
    onClickListener = () => {
        if (this.state.fEmail.length <= 0){
            Alert.alert("Please enter your email")
        }
        else if (!(this.state.fEmail.includes("@"))){
            Alert.alert("Please enter a valid email")
        }
        //else if check if its in the database
        else{
            this.setState({ toForget:true })
            Alert.alert("Please check your email!")
        }
    }
    
    setEmail = async (e) => {
        this.setState({fEmail: e})}
    
    render() {
        return (this.state.toForget ? <App/> :
            <ForgotPage
                onClickListener={this.onClickListener}
                setEmail = {this.setEmail}
            />
        )
    }
}
