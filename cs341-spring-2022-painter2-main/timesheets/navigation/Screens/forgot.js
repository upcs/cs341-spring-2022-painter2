import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text,  View, TextInput, Button,  TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ForgotScreen({ navigation }) {
    const [email, setEmail] = useState("");


const onClickListener = (viewID) => {
    //Alert.alert("Forgot")
    navigation.navigate("Login");
}

const forgotPassword = (forgotEmail) => {
  console.log(forgotEmail);
}

return(
       <View style={styles.forgot}>
        <TouchableHighlight onPress={() => onClickListener("")} style={{alignSelf: 'flex-start', marginBottom: 50}}>
          <Ionicons name={'ios-arrow-back'} size={40} style={{color:'#FFFFFF', marginLeft: 10}} />
        </TouchableHighlight>
                 <Text style={styles.title}>Forgot Password?</Text>
                 <View style={styles.inputContainer}>
                 <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
                   <TextInput style={styles.inputs}
                       placeholder={ "Email" }
                       keyboardType="email-address"
                       underlineColorAndroid='transparent'
                       onEndEditing={em => forgotPassword(em.nativeEvent.text)}
                 />
                 </View>
                 <TouchableHighlight onPress={() => onClickListener("submit")} >
                   <Ionicons name={'ios-log-in-outline'} size={100} style={{color:'#FFFFFF'}} />
                 </TouchableHighlight>
           </View>
       )
}
