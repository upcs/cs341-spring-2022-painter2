import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import DetailScreen from './DetailScreen.js';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';


export default function TimesheetScreen({ navigation }) {
  const [tsData, setTSData] = useState([]);

    const getTimesheets = async () => {
      const snapshot = await firebase.firestore().collection('clocking').get()
      const timesheetsData = []
      snapshot.forEach(doc => {timesheetsData.push(doc.data());});
    setTSData(timesheetsData);
  }
    const data = require("./data.json");  // in the future data wull be pulled from the database
    getTimesheets();
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

