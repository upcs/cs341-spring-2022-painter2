import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
    
export default function TimesheetScreen() {
    const data = require("./data.json"); // in the future data wull be pulled from the database

      const Item = ({ name }) => (
        <View style={styles.body}>
          <Text styles={styles.bodyText}>{name}</Text>
        </View>
      );
        
       const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => alert("Hours Worked: " + item.timein + " - " + item.timeout + "\n" + item.id)}>
          <Item name={item.name +": " + item.date}/>
        </TouchableOpacity>
      );

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>My Timesheets</Text>
            </View>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
          </View>
        );
    }

