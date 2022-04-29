
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text,  View, TextInput,  TouchableHighlight, Alert, Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';
import {createNewEmployee, findUserByEmail,addFireBaseUser} from './databaseFunctions';
import {encodePass} from './styles/base64';


export default function RegisterScreen({ navigation }) {
    const [creds, setCreds] = useState({
        name: "", email: "", p1: "", p2: ""
    });

    const onClickListener = (viewID) => {
        if(viewID == "back"){
            navigation.navigate("Login")
            return;
        }
        validateReg()

    }

    //Helper function that does all the validating for the registration
    const validateReg = async() => {
        if (creds.p1.includes(' ') || creds.p2.includes(' ')){
           Alert.alert("Error", "Passwords should not contain spaces")
        }
        else if (creds.p1 != creds.p2){
            Alert.alert("Error", "Passwords do not match")
        }
        else if (creds.name.length != 0 &&
            creds.email.length != 0 &&
            creds.p1.length != 0 &&
            creds.p2.length != 0 &&
            validateEmail(creds.email) == true){
            //hashes password before storing it into database
            var log = encodePass(creds.p1);
            var value = await findUserByEmail(creds.email)
            if (Object.keys(value).length > 0){
                Alert.alert("Error", "Email already exists")
            }
            else {
                try {
                    //creates employee
                    await addFireBaseUser(creds.email, creds.p1, creds.name, log);
                } catch (error) {
                    Alert.alert('Error', error)
                    return false;
                }
                navigation.pop();
                return true;
            }
        } else {
            Alert.alert("Error", "Please input valid credentials")
        }
    }
    
    //function to check if email is in the correct format
    const validateEmail = (input) => {
        //format of email
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setCreds({
            name: creds.name,
            email: creds.email.toLowerCase(),
            p1: creds.p1,
            p2: creds.p2
        })

        if (String(input).toLowerCase().match(re) == null){
            return false;
        }
        return true;
    }
    
    
    return (
        <View style={styles.reg}>
             <TouchableHighlight style={{alignSelf: 'flex-start'}} onPress={() => onClickListener("back")}>
          <Ionicons name={'ios-arrow-back'} size={40} style={{color:'#FFFFFF', marginLeft: 10}} />
        </TouchableHighlight>
              <Text style={styles.title}>Register</Text>
              <View style={styles.inputContainer}>
              <Ionicons name={'person-outline'} size={30} style={styles.inputLineIcon}/>
                <TextInput style={styles.inputs}
                    placeholder="Name"
                    underlineColorAndroid='transparent'
                    onChangeText={(n) => setCreds({
                        name: n,
                        email: creds.email,
                        p1: creds.p1,
                        p2: creds.p2
                    })}
              />
              </View>
              <View style={styles.inputContainer}>
              <Ionicons name={'at-circle-outline'} size={30} style={styles.inputLineIcon}/>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(em) => setCreds({
                        name: creds.name,
                        email: em.toLowerCase(),
                        p1: creds.p1,
                        p2: creds.p2
                    })}
              />
              </View>
            <Text style={styles.notes}>Passwords can be letters(case sensitive) and numbers. No special characters.</Text>
              <View style={styles.inputContainer}>
              <Ionicons name={'lock-open-outline'} size={30} style={styles.inputLineIcon}/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(uno) => setCreds({
                        name: creds.name,
                        email: creds.email,
                        p1: uno,
                        p2: creds.p2
                    })}
              />
              </View>
              <View style={styles.inputContainer}>
              <Ionicons name={'lock-closed-sharp'} size={30} style={styles.inputLineIcon}/>
                <TextInput style={styles.inputs}
                    placeholder="Re-Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(dos) => setCreds({
                        name: creds.name,
                        email: creds.email,
                        p1: creds.p1,
                        p2: dos
                    })}
              />
              </View>
              <TouchableHighlight onPress={() => onClickListener("submit")}>
                <Ionicons name={'ios-log-in-outline'} size={80} style={{color:'#FFFFFF'}} />
              </TouchableHighlight>
        </View>
    )}

