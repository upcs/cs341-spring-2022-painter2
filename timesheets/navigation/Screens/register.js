import * as React from 'react';
import react from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import App from './../../App';

const RegisterPage = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor:'#A00000'}}>
          <TouchableHighlight onPress={() => props.onClickListener("back")} style={styles.backButton}>
            <Ionicons name={'ios-arrow-back'} size={50} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
    <View style={styles.background}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
          <Ionicons name={'person-outline'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Name"
                underlineColorAndroid='transparent'
                onChangeText={(name) => props.setName(name)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => props.setREmail(email)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'lock-open-outline'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => props.setP1(password)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name={'lock-closed-sharp'} size={30} style={styles.inputLineIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Re-Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password2) => props.setP2(password2)}
          />
          </View>
          <TouchableHighlight onPress={() => props.onClickListener("submit")}>
            <Ionicons name={'ios-log-in-outline'} size={80} style={{color:'#FFFFFF'}} />
          </TouchableHighlight>
    </View>
          </View>
)}

export default class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {registered:false, rName: "", rEmail: "", password1: "", password: ""}
    }
    
    setName = async (n) => {
        this.setState({name: n})}

    setREmail = async (e) => {
        this.setState({email: e})}

    setP1 = async (p1) => {
        this.setState({password1: p1})}
    
    setP2 = async (p2) => {
        this.setState({password2: p2})}
    
    onClickListener = (viewID) => {
        if (viewID == "back"){
            this.setState({ registered: true })
        }
        else {
            this.setState({ registered: true })
            Alert.alert("Credentials", this.state.name + "\n"
                    + this.state.email + "\n"
                    + this.state.password1);
        }
    }
    
    render() {
        return (this.state.registered ? <App/> :
            <RegisterPage
            setREmail={this.setREmail}
            setP1={this.setP1}
            setP2={this.setP2}
            setName={this.setName}
            onClickListener={this.onClickListener}
            />
        )
    }
}
