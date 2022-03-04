import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import getUserByEmail from './databaseFunctions';

//The Home Screen
export default function LoginScreen({ navigation }) {
    const [creds, setCreds] = useState({
        email: "", password: ""
    });
    

    //The Listener for the buttons pressed
    const onClickListener = (viewID) => {
        if (viewID == "login"){
            validateLogin()
        //navigation.getParam('password') to recieve passed values
        }
        else if (viewID == "forgot"){
            navigation.navigate("Forgot", creds);
        }
        else if (viewID == "register"){
            navigation.navigate("Register", creds);
        }
        else {
            Alert.alert("Button Pressed", viewID)
        }
    }
   
    //Helper function that does all the validating for the login
    const validateLogin = () => {
        if(creds.email.length != 0 && creds.password.length != 0){
            navigation.navigate("Main", creds);
        } else {
            Alert.alert("Try Again", "Invalid email or password" )
        }
    }

    //Render
    return(
           <View style={styles.background}>
                 <View style={styles.inputContainer}>
                 <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
                   <TextInput style={styles.inputs}
                       placeholder="Email"
                       keyboardType="email-address"
                       underlineColorAndroid='transparent'
                        onChangeText={(em) => setCreds({
                            email: em,
                            password: creds.password
                        })}/>
                 </View>
                 <View style={styles.inputContainer}>
                 <Ionicons name={'lock-open-outline'} size={30} style={styles.inputLineIcon}/>
                   <TextInput style={styles.inputs}
                       placeholder="Password"
                       secureTextEntry={true}
                       underlineColorAndroid='transparent'
                        onChangeText={(pwd) => setCreds({
                            email: creds.email,
                            password: pwd
                        })}/>
                 </View>
                 <TouchableHighlight onPress={() => onClickListener("login")}>
                   <Ionicons name={'ios-log-in-outline'} size={100} style={{color:'#FFFFFF'}} />
                 </TouchableHighlight>
                 <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener("forgot")}>
                   <Text style={styles.touchable}>Forgot your password?</Text>
                 </TouchableHighlight>
                 <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener("register")}>
                   <Text style={styles.touchable}>Register</Text>
                 </TouchableHighlight>
                 </View>
         )}
