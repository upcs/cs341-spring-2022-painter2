import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Button, Alert} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import { useState, useEffect } from 'react';
import { getAllEmployees, editEmployeeRole, changeRole, removeEmployee, get} from './databaseFunctions.js';
import { useContext } from 'react';
import AppContext from '../Context.js';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Ionicons } from '@expo/vector-icons';

    

export default function AdminScreen({ navigation }) {
        const [timesheetsData, setTimeSheetsData] = useState([])
        const [useData, setUseData] = useState ([])
        const tsContext = useContext(AppContext);
        const roleData = [{
            value: 'Admin',
            }, {
            value: 'Bookkeep',
            }, {
            value: 'Employee',
            }];

      
      //sets the initial data
      useEffect(() => {
        const getData = async () => {
          data = await getAllEmployees();
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
        getData()
        return;
     }, [])

    //FILTERS THE DATA
     const filterData = (searchName) => {
        const copy = timesheetsData.filter(ts => ts.name.toString().toLowerCase().includes(searchName.toString().toLowerCase()));

        console.log("admin: filtering - " + copy)
        setUseData(copy)
     }
    
    //CONFIRM ROLE CHANGE
    const chRole = async(empID, role) => {
        Alert.alert('Confirm Role Change?', empID + ": " + role, [{
                text: 'Cancel',
                onPress: () => console.log('admin: Cancel Pressed'),
                style: 'cancel',
        }, { text: 'OK', onPress: () => onClickListener(empID, role) },]);
    }
    
    //CONFIRM DELETE
    const delEmp = async( item ) => {
        Alert.alert('Delete ' + item.name + '?', 'This cannot be undone', [{
                text: 'Cancel',
                onPress: () => console.log('admin: Cancel Pressed'),
                style: 'cancel',
        }, { text: 'OK', onPress: () => onClickListener(item.employeeID, "del") },]);
    }
    
    //LISTENER FOR ALL THE CLICKKKKKKS
    const onClickListener = (empID, buttonID) => {
        if (buttonID == "del"){
            console.log('admin: delete confirmed');
            //removeEmployee(empID);
        } else {
            console.log('admin: role change confirmed - ' + empID + '-' + buttonID);
            //changeRole(empID, buttonID);
            return;
        }
    }
    
    
        
    function renderItem ({ item }) {
        console.log("admin: " + item.employeeID + "-" + tsContext.currentId)
    if( item.employeeID === tsContext.currentId ){
        console.log("admin: found myself");
        return;
    }
     else {
         return (
    <View style={{
        padding: 0,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'}}>
    <View style={{justifyContent: "flex-start", paddingLeft: 10}}>
        <Text style={styles.listText}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.email}</Text>
    </View>
    <View style={styles.listBody}>
            <Dropdown
                iconColor='#A00000'
                data={roleData}
                value={item.role}
                containerStyle={styles.conStyle}
                onChangeText={(val) => chRole(item.name, val)}
            />
     <TouchableOpacity onPress={() => delEmp(item)}>
                <Ionicons name={'close-circle-outline'} size={30} style={styles.inputLineIcon}/>
            </TouchableOpacity>
            </View>
     </View>
     );}};
    
    
          if(tsContext.currentRole == 'Employee') {
            return (
              <View style={styles.container}>
                    <Text style={styles.headerText}>Admin</Text>
                    <Text style={styles.alertText}>You do not have access to this page</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Employee List</Text>
                </View>
                <TextInput 
                  style={styles.searchBackground}
                  placeholder='Enter Employee Name'
                  onChangeText={(input) => filterData(input)}
                  />
                <FlatList
                data={useData}
                renderItem={renderItem}
                keyExtractor={item => item.employeeID}
                />
              </View>
            );
          }
           
          }
    
  
