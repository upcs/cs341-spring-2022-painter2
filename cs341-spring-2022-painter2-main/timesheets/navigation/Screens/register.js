import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text,  View, TextInput,  TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyle.js';



export default function RegisterScreen({ navigation }) {
    const [creds, setCreds] = useState({
        name: "", email: "", p1: "", p2: ""
    });

    const onClickListener = (viewID) => {
        //Alert.alert("Register")
        navigation.navigate("Login");
    }

    return (
        <View style={styles.background}>
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
                        email: em,
                        p1: creds.p1,
                        p2: creds.p2
                    })}
              />
              </View>
              <View style={styles.inputContainer}>
              <Ionicons name={'lock-open-outline'} size={30} style={styles.inputLineIcon}/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(dos) => setCreds({
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
                    onChangeText={(uno) => setCreds({
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
