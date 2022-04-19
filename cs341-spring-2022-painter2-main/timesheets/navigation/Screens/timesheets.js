import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Modal, Alert} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import { useState, useEffect } from 'react';
import { getTimesheets, addJobsite, changeRole,removeEmployee,changeClockIn, changeClockOut, removeTimesheet,getEmployeeList} from './databaseFunctions.js';
import timesheetStyle from './styles/timesheetStyle.js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { useContext } from 'react';
import AppContext from '../Context.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
export default function TimesheetScreen({ navigation }) {
      
      const [timesheetsData, setTimeSheetsData] = useState([])
      const [useData, setUseData] = useState ([])
      const [sortedByName, setSortedByName] = useState(false)
      const tsContext = useContext(AppContext);
      const [gate,setGate]=useState(false)
      
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
     }, [gate])

     const filterData = (searchName,x) => {
        const copy = timesheetsData.filter(ts => ts.name.toString().toLowerCase().trim().includes(
          searchName.toString().toLowerCase().trim()) &&ts.date == x.toLocaleDateString());
        //console.log(ts.date)
        console.log(x)
        console.log(copy)
        setUseData(copy)
     }
     
     const filterDataByDate = (searchDate) => {
      const copy = timesheetsData.filter(ts => ts.date == searchDate );
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
        
       const renderItem = ({ item }) =>(
        <TouchableOpacity onPress={() => {
          handleModal()
          setEditedBy(item.editedBy)
          setClockInTime(item.clockIn)
          setClockOutTime(item.clockOut)
          setEmpId(item.employeeID)
          setClockId(item.clockID)
          

        }}>
        <View style={{borderBottomWidth:2}}>
            <View style={{flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: 10,
                        marginVertical: 5
                        }}>
        <Text style={styles.listText}>{item.name}</Text>
        <Text style={{fontSize:18,fontStyle:'italic', fontWeight: 'bold'}}>{item.date}</Text>
            </View>
        <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFF',
                    marginHorizontal: 10,
                    marginBottom: 5
                    }}>
        <Text style={styles.timeText1}>IN: <Text style={styles.timeText2}>
            {item.clockIn}</Text>
        </Text>
        <Text style={styles.timeText1}>OUT: <Text style={styles.timeText2}>
            {item.clockOut}</Text>
        </Text>
        <Text style={styles.timeText1}><Text style={styles.timeText2}>
            {item.hoursWorked}</Text> hours
        </Text>
        </View>
            </View>
            </TouchableOpacity>
          );
      
      const[isModalVisible,setIsModalVisible]=useState(false);
      const handleModal = () => {
        setIsModalVisible(()=> !isModalVisible)
      };
      
      const [selectedDate, setSelectedDate] = useState(new Date());


      //const name = "david";
      //const date ="3/27/2022"
      const [clockIn,setClockInTime] = useState()
      const [clockOut,setClockOutTime] = useState()
      const [clockId,setClockId]=useState()
      const [empId,setEmpId]=useState()
      const [edit, setEdit] = useState(false)
      const jobSite = "University of portland" 
      const [selectedTimeIn,setSelectedTimeIn]=useState(new Date());
      const [selectedTimeOut,setSelectedTimeOut]=useState(new Date());
      const [test,setTest]=useState("none")
      const [editedBy, setEditedBy]=useState("");

      //filters the list by selected date
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        
        setSelectedDate(currentDate);
        console.log(selectedDate)
        filterDataByDate(selectedDate.toLocaleDateString());
        setTest(selectedDate.toLocaleDateString())
      };
      //updates the clock in time
      const onChangeClockIn = (event, selectTime) => {
        const currentTime = selectTime;
        setSelectedTimeIn(currentTime);
        setClockInTime(currentTime.toLocaleString().substring(10));
        console.log(currentTime);
      }
      //updates the clock out time
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
            // The "Cancel" button
            {
              text: "Cancel",
            },
            
            {
              text: "Ok",
              onPress: () => {
                removeTimesheet("2",1)
              },
            },
          ]
        );
      };
      useEffect(() => {
        getEmployeeList().then(jbs => setItems(jbs));
        return;
      },[])
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState("");
      const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        
      ]);


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
                {/* red header on top  */}
                <View style={styles.header}>
                  <Text style={styles.headerText}>Timesheets</Text>
                </View>
                <DropDownPicker
                    style={{marginTop:10}}
                      zIndex={1}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      searchable={true}
                      searchPlaceholder="Type in a name you want to search for"
                      onChangeValue={input => {
                        console.log("input: "+input)
                        filterData(input,selectedDate)
                        if(input == "") setSortedByName(false);
                        else setSortedByName(true);
                      }}
                    />
                    <View style={{padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 0
                    }}>

                 
                    <DateTimePicker
                    style={{flex:1}}
                      value={selectedDate}
                      mode='date'
                      onChange={onChange}
                    />
                    
                    <TouchableOpacity
                      style={{alignItems:"center", marginLeft: 5}}
                      onPress={()=> {
                        setGate(!gate)

                      }}
                    >
                    <Ionicons name={'ios-refresh-circle'} size={50} style={{color:'#ab0e0e'}}/>
                    </TouchableOpacity>
                </View>
                
                    <View style={{borderColor:'#ab0e0e', borderWidth: 3}}></View>
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
                    <View>
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
                      </View>
                      <Text></Text>
                      
                      <View style ={{flexDirection: "row", justifyContent:"center"}}>
                      <TextInput style={styles2.input2}
                        placeholder={jobSite}
                        placeholderTextColor="grey"
                        editable={true}
                      
                      >
                      </TextInput>
                      </View>
                      
                      
                      
                            
                    </View>:
                    //normal time
                    <View>
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
                      </View>
                      <View style ={{flexDirection: "row", justifyContent:"center"}}>
                      <TextInput style={styles2.input2}
                        placeholder={jobSite}
                        placeholderTextColor="black"
                        editable={false}
                      
                      >
                      </TextInput>
                      </View>

                      <View style ={{flexDirection: "row", justifyContent:"center"}}>
                      <Text>Edited by: {editedBy}</Text>
                      </View>

                    </View>}

                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Button title= "Edit" style={{height:65,marginTop:15,position:"absolute"}}onPress={() => setEdit(!edit)}/>
                    <Button title ="Submit" onPress={() => {changeClockIn(clockIn,empId,clockId,tsContext.currentName), changeClockOut(clockOut,empId,clockId,tsContext.currentName)}}/>
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
  //backgroundColor: "white",
  alignItems: "center",
  justifyContent: 'center',

  },
  input: {
      borderWidth:1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 100,
  },
  input2: {
    borderWidth:1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 220,
  }
});
  
