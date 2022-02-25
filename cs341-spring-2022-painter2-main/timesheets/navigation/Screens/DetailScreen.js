import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/timesheetStyle.js';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVu8npmz8_Mes5xQC6LBYTEBaw55ucAxRJXc",
    authDomain: "timesheetdb-2b167.firebaseapp.com",
    projectId: "timesheetdb-2b167",
    storageBucket: "timesheetdb-2b167.appspot.com",
    messagingSenderId: "533714654432",
    appId: "1:533714654432:web:9a8adf4fa6f391b48f6c85",
    measurementId: "G-S9ZRZDN57B"
  };

  if(firebase.apps.length==0){
    firebase.initializeApp(firebaseConfig);
   }
export default function DetailScreen({ route, navigation }) {
    
    const [edit, setEdit] = useState(false);
    const {name, date, clockIn, clockOut, id } = route.params;
    return (
        <View>                
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {date}{"\n"}{name}
                </Text>
            </View> 
            { edit ? 
            <View>
                <Text>Time In:</Text>
                    <TextInput style={styles2.input} 
                    placeholder = {clockIn} 
                    editable ={true} 
                    onSubmitEditing = {newTimeIn => alert(newTimeIn.nativeEvent.text)}/> 
                <Text>Time Out:</Text>
                    <TextInput style={styles2.input} 
                    placeholder = {clockOut} 
                    editable ={true} 
                    onSubmitEditing ={newTimeOut => alert(id,newTimeOut.nativeEvent.text)}/> 
            </View>:
            <View>
                <Text>Time In:</Text>
                    <TextInput style={styles2.input} 
                    value = {clockIn} 
                    editable ={false}/> 
                <Text>Time Out:</Text>
                    <TextInput style={styles2.input} 
                    value = {clockOut} 
                    editable ={false}/> 
            </View>}
            <Button title= "Edit" style={{height:65,marginTop:15,position:"absolute"}}onPress={() => setEdit(!edit)}/>
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center',

    },
    input: {
        borderWidth:1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 100,
    }
});

