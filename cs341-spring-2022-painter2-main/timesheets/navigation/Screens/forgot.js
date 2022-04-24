import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import { sendEmail } from '../email.js';
import { findUserByEmail } from './databaseFunctions.js';
import { decodePass } from './styles/base64.js';

export default function ForgotScreen({ navigation }) {
    const [email, setEmail] = useState("");


const onClickListener = (viewID) => {
    //Alert.alert("Forgot")
    navigation.navigate("Login");
}

const forgotPassword = (forgotEmail) => {
  console.log(forgotEmail);
  message = ""
  findUserByEmail(forgotEmail).then(us => sendEmail(us[0].email,us[0].email,decodePass(us[0].password)));
}

return(
       <View style={styles.forgot}>
                 <Text style={styles.title}>Forgot Password?</Text>
                 <View style={styles.inputContainer}>
                 <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
                   <TextInput style={styles.inputs}
                       placeholder={ "Email" }
                       keyboardType="email-address"
                       underlineColorAndroid='transparent'
                       onEndEditing={() => alert("Please contact alex@districtpaintingco.com")}
                 />
                 </View>
                 <TouchableHighlight onPress={() => onClickListener("submit")} >
                   <Ionicons name={'ios-log-in-outline'} size={100} style={{color:'#FFFFFF'}} />
                 </TouchableHighlight>
           </View>
       )
}
