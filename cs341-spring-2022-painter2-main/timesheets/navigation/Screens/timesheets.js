import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Modal, Alert, InteractionManager} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from './styles/timesheetStyle.js';
import { useState, useEffect } from 'react';
import { getTimesheets, addJobsite, changeRole,removeEmployee,changeClockIn, changeClockOut,changeJobSite,
  changeHoursWorked, removeTimesheet,getEmployeeList} from './databaseFunctions.js';
import timesheetStyle from './styles/timesheetStyle.js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { useContext } from 'react';
import AppContext from '../Context.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import Calendar from "react-native-calendar-range-picker";
import moment from 'moment';
import { extendMoment } from 'moment-range';
export default function TimesheetScreen({ navigation }) {
      
      const [timesheetsData, setTimeSheetsData] = useState([])
      const [useData, setUseData] = useState ([])
      const [sortedByName, setSortedByName] = useState(false)
      const tsContext = useContext(AppContext);
      const [gate,setGate]=useState(false)
      const Moment = require('moment');
      const MomentRange= require('moment-range');
      const moment = MomentRange.extendMoment(Moment);
      
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

     const filterData = (searchName) => {
       //console.log("hello  le")
        //const copy = timesheetsData.filter(ts => ts.name.toString().toLowerCase().trim().includes(
          //searchName.toString().toLowerCase().trim()) &&searchDate.includes(ts.date));
          
          const copy = timesheetsData.filter(ts => ts.name === searchName)
          setUseData(copy)
     }
     
     const filterDataByDate = (searchDate,searchName) => {
      //console.log("filterDateByDate :"+searchDate[0]+" : "+searchDate[1])
      //console.log(searchName)
      
      
      const copy = timesheetsData.filter(ts => searchDate.includes(ts.date) && ts.name ===searchName);
      
      //console.log(copy)
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

      //console.log(csvString)
     }

  
      const Item = ({ name }) => (
        <View style={styles.body}>
          <Text styles={styles.bodyText}>{name}</Text>
        </View>
      );
      function timeTo24(hours,am_pm)
      {
        am_pm=am_pm.toUpperCase()
        //hours=hours.trim()
        console.log("am_pm: "+am_pm)
        if(am_pm == 'AM')
        {
            if(hours == '12')
            {
              return '0'
            }
            else
            {
              return hours
            }
        }
        else if(am_pm == 'PM')
        {
            if(hours == '12')
            {
              return "12"
            }
            else
            {
              return hours - -12
            }
        }
      }
      function calculateHoursWorked(clockInTime,clockOutTime)
      {
        let timeIn = []
        timeIn = clockInTime.split(":")
        let am_pm_1 = clockInTime.split(" ")
        let timeOut=[]
        timeOut=clockOutTime.split(":")
        let am_pm_2 = clockOutTime.split(" ")
        
        let hour1 = timeTo24(timeIn[0],am_pm_1[1])*60 - -timeIn[1]
        let hour2 = timeTo24(timeOut[0],am_pm_2[1])*60 - -timeOut[1]
        console.log("hour1: "+hour1)
        console.log("hour2: "+hour2)
        console.log("timeTo24: "+timeOut[0]+": "+timeTo24(timeOut[0],am_pm_2[1]))
        let hour3 = hour2-hour1
        console.log(hour2+"-"+hour1+"="+hour3)
        hour3= hour3/60
        hour3 = Number((hour3).toFixed(2));
        console.log(timeIn[0]+" "+timeIn[1])
        
        console.log(timeOut[0]+" "+timeOut[1])
        
        console.log(hour1)
        console.log(hour2)
        console.log("total time "+hour3)
        return parseFloat(hour3)
        
        
      }
        
       const renderItem = ({ item }) =>(
        <TouchableOpacity onPress={() => {
          handleModal()
          setEditedBy(item.editedBy)
          setClockInTime(item.clockIn)
          setClockOutTime(item.clockOut)
          setEmpId(item.employeeID)
          setClockId(item.clockID)
          setJobSite(item.jobSite)
          setName(item.name)
          setTask(item.task)
          setModalDate(item.date)
          //calculateHoursWorked(clockIn,clockOut)
          

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
      const[isCalendarVisible,setIsCalendarVisible]=useState(false);
      const calendarModal=()=>{
        setIsCalendarVisible(()=> !isCalendarVisible)
      };

      const [selectedDate, setSelectedDate] = useState(new Date());


      const [name,setName]=useState()
      const [modalDate,setModalDate]=useState()
      const [task,setTask]=useState()
      const [clockIn,setClockInTime] = useState()
      const [clockOut,setClockOutTime] = useState()
      const [clockId,setClockId]=useState()
      const [empId,setEmpId]=useState()
      const [edit, setEdit] = useState(false)
      const [jobSite,setJobSite]=useState();
      const [selectedTimeIn,setSelectedTimeIn]=useState(new Date());
      const [selectedTimeOut,setSelectedTimeOut]=useState(new Date());
      const [editedBy, setEditedBy]=useState("");
      const [hoursWorked,setHoursWorked]=useState();
      
      const [start,setStart]=useState();
      const [end, setEnd]=useState();
      const [filter,setFilter]=useState(" Off");

      //const [searchName,setSearchName]=useState();
      //filters the list by selected date
      
      const onChange2 = (startDate, endDate,search) =>
      {
        //console.log(startDate,endDate)
        let start = moment(startDate);
        let end = moment(endDate);
        let date = [];
        

        for (var m = moment(start); m.isSameOrBefore(end); m.add(1, 'days')) {
            date.push(m.format('M/DD/YYYY'));
        }
        if(date.length ===0)
        {
          filterData(search)
          return;
        }
        setFilter("On")
        //setDateRange(date)
        
          //console.log("x")
          filterDataByDate(date,search);
          
        
        

        //console.log(date)
      };
      //updates the clock in time
      const onChangeClockIn = (event, selectTime) => {
        const currentTime = selectTime;
        setSelectedTimeIn(currentTime);
        //console.log("clock in current time: "+currentTime.toLocaleString())
        let x= currentTime.toLocaleString()
        
        let y = []
        y=x.split(",")
        setClockInTime(y[1].substring(1));
        console.log(currentTime);
      }
      //updates the clock out time
      const onChangeClockOut = (event, selectTime) => {
        let currentTime = selectTime;
        setSelectedTimeOut(currentTime);
        //console.log("clock out current time: "+currentTime.toLocaleString())
        let x= currentTime.toLocaleString()
        
        let y = []
        y=x.split(",")
        console.log(y[1].substring(1))
        setClockOutTime(y[1].substring(1));
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
               
                <TouchableOpacity
                  style={{padding:10,
                    backgroundColor:'white',
                    alignItems:"center", 
                    borderWidth:1, 
                    borderRadius:8,
                    //alignSelf:'center',
                    paddingHorizontal: 20,
                    marginBottom:5}}
                    onPress={calendarModal}
                  
                >
                  <Text style ={{fontSize:20, color:'green'}}>Calendar Filter:{filter}</Text>
                </TouchableOpacity>


                <View>
                    <Modal visible={isCalendarVisible} animationType="slide">
                    <View>
                      <TouchableOpacity
                        style={{padding:10,
                          backgroundColor:'white',
                          alignItems:"center", 
                          borderWidth:1, 
                          borderRadius:8,
                          //alignSelf:'center',
                          paddingHorizontal: 20,
                          marginBottom:5}}
                          onPress={() => {
                            calendarModal()
                            onChange2(start,end,tsContext.currentName)
                          }}
                      >
                        <Text style ={{fontSize:20, color:'green'}}>Close</Text>
                      </TouchableOpacity>
                      <View style={{ height: 600 }}>
                        <Calendar
                          initialNumToRender={12}
                          pastYearRange={0}
                          futureYearRange={1}
                          onChange={({ startDate, endDate }) =>{
                            //onChange2(startDate,endDate)
                            setStart(startDate)
                            setEnd(endDate)
                          }  }
                        />
                      </View>
                      
                    </View>
                    </Modal>
                </View>


                <View style={{padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 0
                    }}>

                 
                    
                    <Text style={styles.timeText1}>Start: <Text style={styles.timeText2}>{start}</Text></Text>
                    <Text style={styles.timeText1}>End: <Text style={styles.timeText2}>{end}</Text></Text>
                    <TouchableOpacity
                      style={{alignItems:"center", marginLeft: 5}}
                      onPress={()=> {
                        setGate(!gate)
                        console.log("refresh")
                        setStart("")
                        setEnd("")
                        setFilter("Off")
                        
                       
                        console.log(start)

                      }}
                    >
                    <Ionicons name={'ios-refresh-circle'} size={50} style={{color:'#ab0e0e'}}/>
                    </TouchableOpacity>
                  </View>


                
                <FlatList
                data={useData}
                renderItem={renderItem}
                keyExtractor={item => item.clockID}
                />
                <View style={Modalstyles.centeredView}>
                    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                      <View style={Modalstyles.modalView}>
                      
                        
                      
                      
                            
                    
                    
                    <View>
                      <View style = {{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                      
                      <Text style={styles.listText}>{name}</Text>
                      <Text style={styles.timeText1}>Task: <Text style={styles.timeText2}> {task}</Text> </Text>
                      <Text style={styles.timeText2}>{modalDate}</Text>

                      
                      <Text>   </Text>
                      </View>
                      <View style = {{flexDirection:"row",justifyContent:"center"}}>
                        
                      <View>
                        <Text style={styles.timeText1} >    Time In:</Text>
                        <TextInput style={styles2.input} 
                          value = {clockIn} 
                          editable ={false}/> 
                      </View>

                      <View>      
                        <Text style={styles.timeText1}>Time Out:</Text>
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
                      <Text style={styles.timeText1}>Edited by: <Text style={styles.timeText2}>{editedBy}</Text>
                      </Text>
                      
                      </View>
                      <Text>  </Text>
                    </View>
                    <Button title ="close" onPress={handleModal}/>
                
                
              </View>
              </Modal>
              </View>
              </View>
              
              



            );
          } else {
            return (
              <View style={styles.container}>
                {/* red header on top  */}
                <View style={styles.header}>
                  <Text style={styles.headerText}>Timesheets</Text>
                </View>
                
                
                <TouchableOpacity
                  style={{padding:10,
                    backgroundColor:'white',
                    alignItems:"center", 
                    borderWidth:1, 
                    borderRadius:8,
                    //alignSelf:'center',
                    paddingHorizontal: 20,
                    marginBottom:5}}
                    onPress={calendarModal}
                  
                >
                  <Text style ={{fontSize:20, color:'green'}}>Calendar Filter:{filter}</Text>
                </TouchableOpacity>
                <View>
                    <Modal visible={isCalendarVisible} animationType="slide">
                      <View>
                      <TouchableOpacity
                        style={{padding:10,
                          backgroundColor:'white',
                          alignItems:"center", 
                          borderWidth:1, 
                          borderRadius:8,
                          //alignSelf:'center',
                          paddingHorizontal: 20,
                          marginBottom:5}}
                          onPress={calendarModal}
                        
                      >
                        <Text style ={{fontSize:20, color:'green'}}>Close</Text>
                      </TouchableOpacity>
                      <View style={{ height: 600 }}>
                        <Calendar
                          initialNumToRender={12}
                          pastYearRange={0}
                          futureYearRange={1}
                          onChange={({ startDate, endDate }) =>{
                            //onChange2(startDate,endDate)
                            setStart(startDate)
                            setEnd(endDate)
                          }  }
                        />
                        </View>
                      
                      </View>
                    </Modal>
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
                        //filterData(input)
                        //setSearchName(input)
                        onChange2(start,end,input)
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

                 
                    
                    <Text style={styles.timeText1}>Start: <Text style={styles.timeText2}>{start}</Text></Text>
                    <Text style={styles.timeText1}>End: <Text style={styles.timeText2}>{end}</Text></Text>
                    
                    <TouchableOpacity
                      style={{alignItems:"center", marginLeft: 5}}
                      onPress={()=> {
                        setGate(!gate)
                        console.log("refresh")
                        setStart("")
                        setEnd("")
                        setFilter("Off")
                        
                       
                        console.log(start)

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
                      <View style = {{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                      
                      <Text style={styles.listText}>{name}</Text>
                      <Text style={styles.timeText1}>Task: <Text style={styles.timeText2}> {task}</Text> </Text>
                      <Text style={styles.timeText2}>{modalDate}</Text>

                      
                      <Text>   </Text>
                      </View>
                      <View style ={{flexDirection: "row", justifyContent:"center"}}>
                        <View>
                        <Text style={styles.timeText1}>Time In:      </Text>
                          <DateTimePicker
                          value={selectedTimeIn}
                          mode='time' 
                          onChange={onChangeClockIn}
                          
                        />
                        </View>

                        <View>
                        <Text style={styles.timeText1}>     Time Out:    </Text>
                          <DateTimePicker
                          value={selectedTimeOut}
                          mode='time' 
                          onChange={onChangeClockOut}
                        />
                        </View>
                      </View>
                      <Text></Text>
                      <Text></Text>
                      <View style ={{flexDirection: "row", justifyContent:"center"}}>
                      <TextInput style={styles2.input2}
                        placeholder={jobSite}
                        placeholderTextColor="grey"
                        onChangeText={text =>{setJobSite(text)}}
                        editable={true}
                      
                      >
                      </TextInput>
                      </View>
                      
                      
                      
                            
                    </View>:
                    //normal time
                    <View>
                      <View style = {{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                      
                      <Text style={styles.listText}>{name}</Text>
                      <Text style={styles.timeText1}>Task: <Text style={styles.timeText2}> {task}</Text> </Text>
                      <Text style={styles.timeText2}>{modalDate}</Text>

                      
                      <Text>   </Text>
                      </View>
                      <View style = {{flexDirection:"row",justifyContent:"center"}}>
                        
                      <View>
                        <Text style={styles.timeText1} >    Time In:</Text>
                        <TextInput style={styles2.input} 
                          value = {clockIn} 
                          editable ={false}/> 
                      </View>

                      <View>      
                        <Text style={styles.timeText1}>Time Out:</Text>
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
                      <Text style={styles.timeText1}>Edited by: <Text style={styles.timeText2}>{editedBy}</Text>
                      </Text>
                      
                      </View>
                      <Text>  </Text>
                    </View>}

                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <Button title= "Edit" style={{height:65,marginTop:15,position:"absolute"}}onPress={() => setEdit(!edit)}/>
                    <Button title ="Submit" onPress={() => {
                      changeClockIn(clockIn,empId,clockId,tsContext.currentName)
                      changeClockOut(clockOut,empId,clockId,tsContext.currentName)
                      changeJobSite(jobSite,empId,clockId,tsContext.currentName)
                      changeHoursWorked(calculateHoursWorked(clockIn,clockOut),empId,clockId)
                      
                      
                      
                      }}/>
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
      width: 110,
  },
  input2: {
    borderWidth:1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 240,
  }
});
  
