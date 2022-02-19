import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import DetailScreen from './DetailScreen.js';
import { NavigationContainer } from '@react-navigation/native';


export default function TimesheetScreen({ navigation }) {
    const data = require("./data.json"); // in the future data wull be pulled from the database

      const Item = ({ name }) => (
        <View style={styles.body}>
          <Text styles={styles.bodyText}>{name}</Text>
        </View>
      );
        
       const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() =>navigation.navigate('DetailScreen')}>
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

