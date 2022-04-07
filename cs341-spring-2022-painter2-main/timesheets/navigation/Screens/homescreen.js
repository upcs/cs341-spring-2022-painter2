import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import  {Picker}  from '@react-native-picker/picker';
import { clockInFunc, clockOutFunc,returnDailyClockRecords, getTimesheetsByID, getOpenJobsites } from './databaseFunctions'
import { getOurCoords  } from './geoFunctions'
import { useContext } from 'react';
import AppContext from '../Context.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {Component} from 'react'
import { number } from 'prop-types';

//The Home Screen



export default function HomeScreen() {
  
  const [jobSite, setJobSite] = useState(' ');
  const[totalTime,setTotalTime]=useState(0);
  const[otherTextVal,setOtherTextVal] =useState("");
  const[latitude,setLatitude]=useState(0);
  const[longitude,setLongitude]=useState(0);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerInfo, setMarkerInfo] = useState({
    name: "",
    lat: 0,
    long: 0,
  });
  const [testArray,setTestArray]=useState([]);

  const hsContext = useContext(AppContext);
  //const tsContext = useContext(AppContext);
  const [task, setTask] = useState(' ');
  const [clockIn, setClock] = useState(true);
  const [color,setColor]=useState('green');
  const [buttonText, setButtonText] = useState("Clock in");
  const [requiredText, setRequiredText] = useState(null);
  const [requiredText2, setRequiredText2] = useState(null);
  const [selectedValue, setSelectedValue]=useState("");
  const [other,setOther]=useState(false);
  const [otherText,setOtherText] =useState("");
  const [time,setTime]=useState(0);
  const [totalHoursWorked, setTotalHoursWorked] = useState(0.0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  const [openTask, setOpenTask] = useState(false);
  const [valueTask, setValueTask] = useState(null);
  const [itemsTask, setItemsTask] = useState([
    {label: 'Pressure Wash', value: 'Pressure Wash'},
    {label: 'Painting', value: 'Painting'},
    {label: 'Prep', value: 'Prep'},
    {label: 'Cleanup', value: 'Cleanup'},
    {label: 'Travel', value: 'Travel'},
    {label: 'Delivery', value: 'Delivery'},
    {label: 'Office', value: 'Office'},
    {label: 'Shop', value: 'Shop'},
    {label: 'Other', value: 'Other'}
  ]);
  
  const tsContext = useContext(AppContext);
  

  //useEffect to get the jobsite data?
  function getDay()
  {
    var month = new Date().getMonth()
    var day = new Date().getDate()
    var year = new Date().getFullYear()
    month = month +1
    var string = month+"/"+day+"/"+year
    return string
  }
 
  const[gate,setGate]=useState(true);

  const[testGate,setTestGate]=useState(true);

  
  const[dbData,setdbData] = useState();
  useEffect(()=>{
    const getData = async() => {
      var data = await returnDailyClockRecords(tsContext.currentId,getDay())
      //console.log("Grabbing data")
      var totalHours = 0.0; 
      data.forEach(ts => {
        if (ts.hoursWorked != 'NaN'){
          totalHours += ts.hoursWorked;
        }
      })
      setTotalHoursWorked(totalHours);
      setdbData(data);
    }
    getData()
    
    
    return;
  },[gate])

  useEffect(() => {
          //when they clock in, store their time
          setGate(!gate)
          if(clockIn)
          {
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            console.log("clock in");
            setColor('green'); // Changes button color

            (async () =>{
              // let yourLat=(await getOurCoords())[0];
              // let yourLong=(await getOurCoords())[1];
              setLatitude((await getOurCoords())[0]);
              setLongitude((await getOurCoords())[1]);
              console.log("YOUR LATITIUDE: " + latitude);
              console.log("YOUR LONGITUDE: " + longitude);
              //setLocation({latitude: yourLat, longitude: yourLong});

              if(selectedValue == "Other") {                
                let arr = [];
                for(let i=1; i<4;i++) {
                  console.log("i is: " + i);
                  let tsheet = await getTimesheetsByID(i);
                  console.log(tsheet);
                  let inputName = tsheet[0].name;
                  let inputLong = tsheet[0].longitude;
                  let inputLat = tsheet[0].latitude;
                  const marker = {name: inputName, lat: inputLat, long:inputLong};
                  console.log("THIS IS MARKER");
                  console.log(marker);
                  setMarkerInfo(marker);
                  arr.push(marker);
                  //hsContext.setTCInfo([markerInfo]);
                  console.log("timecard info: ");
                  //console.log( hsContext.timecardInfo);
                  //hsContext.setTCInfo([markerInfo]);
                  //let tmp = (hsContext.timecardInfo);
                }
                hsContext.setTCInfo(arr);
                // let tsheet = await getTimesheetsByID(2);
                // console.log(tsheet);
                // let inputName = tsheet[0].name;
                // let inputLong = tsheet[0].longitude;
                // let inputLat = tsheet[0].latitude;
                // const marker = {name: inputName, lat: inputLat, long:inputLong};
                // console.log(marker);
                // setMarkerInfo(marker);
                // console.log("Testing marker name: " + markerInfo.name);
                // console.log("Testing marker long: " + markerInfo.long);
                // console.log("Testing marker lat: " + markerInfo.lat);
                // hsContext.setTCInfo([markerInfo]);
                // console.log(hsContext.timecardInfo[0]);
                // console.log("Name: " + ((hsContext.timecardInfo)[0]).name);
                // console.log("long: " + ((hsContext.timecardInfo)[0]).long);
                // console.log("lat: " + ((hsContext.timecardInfo)[0]).lat);

                //hsContext.setTCInfo(tSheet);
                //console.log("TEST TEST: " + (hsContext.tcInfo[0])[0]);
                //console.log("TEST TEST2: " + hsContext.tcInfo[1]);
              }
              else {                
                let arr = [];
                for(let i=1; i<4;i++) {
                  console.log("i is: " + i);
                  let tsheet = await getTimesheetsByID(i);
                  console.log(tsheet);
                  let inputName = tsheet[0].name;
                  let inputLong = tsheet[0].longitude;
                  let inputLat = tsheet[0].latitude;
                  const marker = {name: inputName, lat: inputLat, long:inputLong};
                  console.log("THIS IS MARKER");
                  console.log(marker);
                  setMarkerInfo(marker);
                  arr.push(marker);
                  //hsContext.setTCInfo([markerInfo]);
                  console.log("timecard info: ");
                  //console.log( hsContext.timecardInfo);
                  //hsContext.setTCInfo([markerInfo]);
                  //let tmp = (hsContext.timecardInfo);
                }
                hsContext.setTCInfo(arr);
              } 

            //clockInFunc("David","2",getDay(),timeCheck(hours,min),jobSite)
            })()

            
                
              
              
            setGate(!gate)
              
              //stores the total minutes work for later
              hours = (hours)*60 + min
              setTime(hours)
          }
          //when they clock out, store their time
          if(clockIn == false){
              var hours = new Date().getHours();
              var min = new Date().getMinutes();
              setColor('red'); //changes button color
                var dbhours = hours*60 + min;
                dbhours =(dbhours-time)/60;
                setTotalTime(prevTime=>prevTime + dbhours);
              
              (async () =>{
                setLatitude((await getOurCoords())[0]);
                setLongitude((await getOurCoords())[1]);
                console.log("YOUR LATITIUDE: " + latitude);
                console.log("YOUR LONGITUDE: " + longitude);
                clockOutFunc(tsContext.currentId,timeCheck(hours,min),dbhours, latitude, longitude)
                console.log("clocking out")
                 let arr = [];
                 for(let i=1; i<4;i++) {
                   console.log("i is: " + i);
                   let tsheet = await getTimesheetsByID(i);
                   console.log(tsheet);
                   let inputName = tsheet[0].name;
                   let inputLong = tsheet[0].longitude;
                   let inputLat = tsheet[0].latitude;
                   const marker = {name: inputName, lat: inputLat, long:inputLong};
                   console.log("THIS IS MARKER");
                   console.log(marker);
                   setMarkerInfo(marker);
                   arr.push(marker);
                   //hsContext.setTCInfo([markerInfo]);
                   console.log("timecard info: ");
                   //console.log( hsContext.timecardInfo);
                   //hsContext.setTCInfo([markerInfo]);
                   //let tmp = (hsContext.timecardInfo);
                 }
                 hsContext.setTCInfo(arr);
              })()
              // setColor('green') //changes button color
              // var dbhours = hours*60 + min
              // dbhours =(dbhours-time)/60
              // setTotalTime(prevTime=>prevTime + dbhours)
              
              //   console.log("clocking out")
              //   clockOutFunc(2,timeCheck(hours,min),dbhours)
                setGate(!gate)
              
          }
      }, [clockIn])

  
 function clockInClockOut()
{
  setClock(!clockIn)
  return clockIn ? setButtonText("Clock in")  : setButtonText("Clock out")

}
//formats the time

  useEffect(() => {
    getOpenJobsites().then(jbs => setItems(jbs));
    return;
  },[])
 //formats the time
function timeCheck(hours, min)
{
  
  if(min <10)
  {
    min = '0'+min
  }
  if(hours > 0 && hours<=12)
  {
    return hours + ":" + min + ":" + "am"
  }
  else if(hours>12)
  {
    return hours-12 + ":" + min + ":"+ "pm"
  }
  else if(hours == 0)
  {
    return  12 + ":" + min + ":" + "am"
  }
}
module.exports = timeCheck(13,0)
  
  function clocking(value)
  {
    //when they clock in, store their time
    
    if(value)
    {
      setButtonText("Clock out")
      var hours = new Date().getHours()
      var min = new Date().getMinutes()
      //console.log("clock in")
      clockInFunc(tsContext.currentName,tsContext.currentId,getDay(),timeCheck(hours,min),jobSite,task,longitude,latitude)
      //stores the total minutes work for later
      hours = (hours)*60 + min
      setTime(hours)
    }
    else
    {
      setButtonText("Clock in")
      var hours = new Date().getHours()
      var min = new Date().getMinutes()
      var dbhours = hours*60 + min
      dbhours =(dbhours-time)/60
      //rounds hours to 2 decimal places
      dbhours = Number((dbhours).toFixed(2))
      //console.log("clocking out")
      clockOutFunc(tsContext.currentId,timeCheck(hours,min),dbhours)
    }
          
  }
 
function clockInClockOut()
{
  setClock(!clockIn);
  return clockIn ? setButtonText("Clock in")  : setButtonText("Clock out")
}

function inputCheck()
{
  if(jobSite != null && requiredText2!=null)
    {
      return true;
    }
    else if(jobSite == null && requiredText2 == null)
    {
      Alert.alert("Please Enter Jobsite and Select Task");
      return false;
    }
    else if(jobSite == null)
    {
      Alert.alert("Please Enter Jobsite");
      return false;
    }
    else if(requiredText2 == null && other ==true)
    {
      Alert.alert("Please type in Task")
      return false;
    }
    else if(requiredText2== null && selectedValue==="")
    {
      Alert.alert("Please select Task")
      return false;
    }
}


return (
  <View style={styles.container}>
    <Text style={styles.totalTimeText} > Total Hours Worked Today: {totalHoursWorked}  </Text>
    <DropDownPicker
      placeholder='Select a Jobsite'
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={js => setJobSite(js)}
      zIndex={1000}
    />
    <DropDownPicker
      placeholder='Select a Task'
      zIndex={1}
      label
      open={openTask}
      value={valueTask}
      items={itemsTask}
      setOpen={setOpenTask}
      setValue={setValueTask}
      setItems={setItemsTask}
      onChangeValue={tsk => {
        if(tsk === "") {
          setRequiredText2(null);
        }
        if(tsk === "Other") {
          setRequiredText2(null);
          setOther(true);
          setOtherText("Please Enter Work");
        } else {
          setTask(tsk);
          setOther(false);
          setOtherText("");
          setRequiredText2(true);
        }
      }}
    />

      <TextInput
        editable={other}
        style={styles.input}
        placeholder={otherText}
        placeholderTextColor="black"
        onChangeText={text => {
          if(text ==="")
          {
            setRequiredText2(null);
          }
          else{
            setTask(text);
            setRequiredText2(true);
          }

        }}
    />
    <Text> </Text>

    <View style = {styles.listWrapper}>
          <Text style={styles.title}>In</Text>
          <Text style={styles.title}>Out</Text>
          <Text style={styles.title}>Time</Text>
        </View>

    <FlatList
      data={dbData}
      
      keyExtractor={(item) => item.clockID}
      renderItem={ ({item}) => 
      
        <View style = {styles.listWrapper}>
          
          <Text style={styles.title}>{item.clockIn}</Text>
          <Text style={styles.title}>{item.clockOut}</Text>
          <Text style={styles.title}>{item.hoursWorked}</Text>
        </View>
      }
    />
    <Button title ="refresh" onPress={()=> {
      //console.log("refresh")
      setGate(!gate)
    
    }}/>
    <Button color ={color} title ={buttonText}  onPress={() => {

        if(inputCheck())
        {
          setGate(!gate)
          setClock(!clockIn)
          clocking(clockIn)
         
        }
        else{
          //console.log("no")
        }
        
    }}
  
    
    />
  </View>

);

}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "white"
  //alignItems: "center",
  //justifyContent: 'center',

  },
  input: {
      borderWidth:1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200,
  },
  selectMenu: {
    flex: 1,
    backgroundColor: "white",
    width: 200,
  },
  totalTimeText: {
    textAlign: 'center',
    backgroundColor: "#ab0e0e",
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: 25,
    borderWidth: 1,
    borderColor: "black",
    color: '#fff',
  },
  textLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: '#ab0e0e',
    color: '#fff'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'red',
    borderColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    fontWeight:'bold',
    flex: 1,
    marginHorizontal:10,
    color: 'white'

  },
  listWrapper:{
    flexGrow:0,

    flexDirection: 'row',
    flexWrap:'wrap',
    borderBottomColor: 'white',
    backgroundColor: '#ab0e0e',
    borderWidth: .5
  }


});
