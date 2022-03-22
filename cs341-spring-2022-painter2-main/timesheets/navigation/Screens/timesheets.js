import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Button} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';
import { getTimesheets, addJobsite, changeRole} from './databaseFunctions.js';
import timesheetStyle from './styles/timesheetStyle.js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { useContext } from 'react';
import AppContext from '../Context.js';

export default function TimesheetScreen({ navigation }) {
      
      const [timesheetsData, setTimeSheetsData] = useState([])
      const [useData, setUseData] = useState ([])
      const tsContext = useContext(AppContext);

      
      //sets the initial data
      useEffect(() => {
        const getData = async () => {
          data = await getTimesheets();
          //filters data if employee
          if(tsContext.currentRole == 'Employee') {
          const filteredData = data.filter(ts => ts.employeeID == tsContext.currentId);
          setTimeSheetsData(filteredData);
          setUseData(filteredData);
        } else {
          setTimeSheetsData(data);
          setUseData(data);
        }
        }
        changeRole("Admin",2);
        getData()
        return;
     }, [])

     const filterData = (searchName) => {
        const copy = timesheetsData.filter(ts => ts.name.toString().toLowerCase().includes(searchName.toString().toLowerCase()));

        console.log(copy)
        setUseData(copy)
     }

     const toCsv = async () => {
      const headerString = "Name,Clock-In Time,Clock-Out Time,Date";
      const rowArr = [];
      //converts each entry into a string and stores it into an array
      timesheetsData.forEach(ts => {
        rowArr.push(ts.name + "," + ts.clockIn + "," + ts.clockOut + "," + ts.date + "\n");
      })

      //joins the array into one string
      const rowString = rowArr.join('')
      const csvString = headerString + "\n" + rowString

      console.log(csvString)
     }

    


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
          if(tsContext.currentRole == 'Employee') {
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>My Timesheets</Text>
                  
                </View>
                <FlatList
                data={useData}
                renderItem={renderItem}
                keyExtractor={item => item.clockID}
                />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>My Timesheets</Text>
                  
                </View>
                <Button title="Export" onPress={() => toCsv(timesheetsData)}/>
                <TextInput 
                  style={styles.searchBackground}
                  placeholder='Enter Employee Name'
                  onChangeText={input => filterData(input)}
                  />
                <FlatList
                data={useData}
                renderItem={renderItem}
                keyExtractor={item => item.clockID}
                />
              </View>
            );
          }
           
          }
    
  
