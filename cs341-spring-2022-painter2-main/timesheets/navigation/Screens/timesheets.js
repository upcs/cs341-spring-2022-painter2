import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Button, Modal,ScrollView,Alert} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';
import { getTimesheets, addJobsite, changeRole,removeEmployee,changeClockIn, changeClockOut, removeTimesheet} from './databaseFunctions.js';
import timesheetStyle from './styles/timesheetStyle.js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { useContext } from 'react';
import AppContext from '../Context.js';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimesheetScreen({ navigation }) {
      
      const [timesheetsData, setTimeSheetsData] = useState([])
      const [useData, setUseData] = useState ([])
      const [sortedByName, setSortedByName] = useState(false)
      const tsContext = useContext(AppContext);

      
      //sets the initial data
      useEffect(() => {
        const getData = async () => {
          data = await getTimesheets().catch(() => alert("Error connecting with database"));
          if(data == []) alert("No Timesheets Found");
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

     const filterData = (searchName) => {
        const copy = timesheetsData.filter(ts => ts.name.toString().toLowerCase().trim().includes(searchName.toString().toLowerCase().trim()));

        console.log(copy)
        setUseData(copy)
     }
     
     const filterDataByDate = (searchDate) => {
      const copy = [];
       if(!sortedByName) {
        copy = timesheetsData.filter(ts => ts.date == searchDate);
       } else {
        copy = useData.filter(ts=> ts.date == searchDate);
       }
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
         //send "item" to a function to get item.employeeID
         //so you can set it to a useStateHook to use for databaseFunction
        <TouchableOpacity onPress={handleModal}>
          <Item name={item.name +": " + item.date}/>
          
        </TouchableOpacity>
      );
      
      const[isModalVisible,setIsModalVisible]=useState(false);
      const handleModal = () => {
        setIsModalVisible(()=> !isModalVisible)
      };
      
      const [selectedDate, setSelectedDate] = useState(new Date());


      const name = "david";
      const date ="3/27/2022"
      const [clockIn,setClockInTime] = useState("10:00am")
      const [clockOut,setClockOutTime] = useState("11:00am")
      const [edit, setEdit] = useState(false);
      const jobSite = "University of portland" 
      const [selectedTimeIn,setSelectedTimeIn]=useState(new Date());
      const [selectedTimeOut,setSelectedTimeOut]=useState(new Date());
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        
        setSelectedDate(currentDate);
        console.log(selectedDate)
        filterDataByDate(selectedDate.toLocaleDateString());
      };
      const onChangeClockIn = (event, selectTime) => {
        const currentTime = selectTime;
        setSelectedTimeIn(currentTime);
        setClockInTime(currentTime.toLocaleString().substring(10));
        console.log(currentTime);
      }
      const onChangeClockOut = (event, selectTime) => {
        const currentTime = selectTime;
        setSelectedTimeOut(currentTime);
        setClockOutTime(currentTime.toLocaleString().substring(10));
        console.log(currentTime);
      }
      const showConfirmDialog =()=>{
        return Alert.alert(
          "Delete Timesheet?",
          "This cannot be undone",
          [
            // The "Yes" button
            {
              text: "Cancel",
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "Ok",
              onPress: () => {
                removeTimesheet("2",1)
              },
            },
          ]
        );
      };
      

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
                <DateTimePicker
                  value={selectedDate}
                  mode='date'
                  onChange={onChange}
                />
                <Button title="Export" onPress={() => toCsv(timesheetsData)}/>
                
               
                <TextInput 
                  style={styles.searchBackground}
                  placeholder='Enter Employee Name'
                  onChangeText={input => {
                    filterData(input)
                    if(input == "") setSortedByName(false);
                    else setSortedByName(true);
                  }}
                  />
                  
                  <FlatList
                data={useData}
                renderItem={renderItem}
                keyExtractor={item => item.clockID}

                />

                  <View style={Modalstyles.centeredView}>
                    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                      <View style={Modalstyles.modalView}>
                      
                        { edit ? 
                     // edit time   
                    <View style ={{flexDirection: "row", justifyContent:"center"}}>
                      <View>
                        <Text>Time In:         </Text>
                        <DateTimePicker
                        value={selectedTimeIn}
                        mode='time' 
                        onChange={onChangeClockIn}
                        
                      />
                      </View>

                      <View>
                        <Text>Time Out:         </Text>
                        <DateTimePicker
                        value={selectedTimeOut}
                        mode='time' 
                        onChange={onChangeClockOut}
                      />
                      </View>
                            
                    </View>:
                    //normal time
                    <View style = {{flexDirection:"row",justifyContent:"center"}}>

                      <View>
                        <Text >    Time In:</Text>
                        <TextInput style={styles2.input} 
                          value = {clockIn} 
                          editable ={false}/> 
                      </View>

                      <View>      
                        <Text>Time Out:</Text>
                            <TextInput style={styles2.input} 
                            value = {clockOut} 
                            editable ={false}/> 
                      </View>


                    </View>}

                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                      <Text>Job Site: {jobSite}</Text>
                    </View>
                   


                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Button title= "Edit" style={{height:65,marginTop:15,position:"absolute"}}onPress={() => setEdit(!edit)}/>
                    <Button title ="Submit" onPress={() => {changeClockIn(clockIn,2,1), changeClockOut(clockOut,2,1)}}/>
                    <Button title = "DELETE" onPress={()=>{showConfirmDialog()}}/>
                    <Button title ="close" onPress={handleModal}/>
                    </View>
                    </View>
                        
                        </Modal> 
                    </View>
                
                
              </View>
            );
          }
          
           
          }
const Modalstyles= StyleSheet.create({
  centeredView:{
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    marginTop:22,
   
    
  },
  modalView:{
    top:240,
    
    margin:20,
    marginBottom:22,
    backgroundColor:"white",
    borderRadius:20,
    borderWidth:2,
    borderColor:"black",
    padding: 35,
    justifyContent: "center",
    alignContent:"center",
    
    elevation: 5
    
  },
  input: {
    borderWidth:1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    alignContent:"center"
},

});  
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
  
