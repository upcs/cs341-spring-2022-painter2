import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';
import { getTimesheets, getTimesheetsForID} from './databaseFunctions.js';


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

export default function TimesheetScreen({ navigation }) {
  const data = getTimesheets().then(ts => setTSData(ts))
  const [tsData, setTSData] = useState([]);

      const Item = ({ name }) => (
        <View style={styles.body}>
          <Text styles={styles.bodyText}>{name}</Text>
        </View>
      );
        
       const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() =>navigation.navigate('DetailScreen', item)}>
          <Item name={item.name +": " + item.date}/>
        </TouchableOpacity>
      );

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>My Timesheets</Text>
            </View>
            <FlatList
            data={tsData}
            renderItem={renderItem}
            keyExtractor={item => item.clockID}
            />
          </View>
        );
    }
  