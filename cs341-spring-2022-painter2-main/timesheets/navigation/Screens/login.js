import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import {findUserByEmail, signInUser} from './databaseFunctions';
import {encodePass, decodePass} from './styles/base64';
import AppContext from '../Context.js';
import { useContext } from 'react';

//The Home Screen
export default function LoginScreen({ navigation }) {
    const tsContext = useContext(AppContext);
    const [creds, setCreds] = useState({
        email: "",password: ""
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
    const validateLogin = async() => {
        if(creds.email.length != 0 && creds.password.length != 0){
            //console.log("login: input email - ", creds.email);
            var user = await findUserByEmail(creds.email); //<-----
            //console.log("login: userFound - ", user);
            //var user = await firebase.firestore().collection('clocking').where('employeeID','==',id)
            //console.log(user);
            if (Object.keys(user).length > 0){
                ////console.log("Password: ", user.map(a => a.password)[0])
                var pass = user.map(a => a.password)[0];
                ////console.log(decodePass(pass))
                if(creds.password == decodePass(pass)){
                    tsContext.setCurrName(user[0].name);
                    tsContext.setCurrEmail(user[0].email);
                    tsContext.setCurrRole(user[0].role);
                    tsContext.setCurrId(user[0].employeeID);
                    try {
                        await signInUser(creds.email, creds.password);
                      } catch (error) {
                          Alert.alert('Error', error)
                          return false;
                        }
                    navigation.navigate("Timesheet");
                    return true;
                }
            }
        }
        Alert.alert("Try Again", "Invalid email or password" )
        return false
    }

    //Render
    return(
           <View style={styles.login}>
           <View style={styles.inputContainer}>
                 <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
                      <TextInput style={styles.inputs}
                       placeholder="Email"
                       keyboardType="email-address"
                       underlineColorAndroid='transparent'
                        onChangeText={(em) => setCreds({
                            email: em.toLowerCase(),
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
