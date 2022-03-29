import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import  {Picker}  from '@react-native-picker/picker';
import { clockInFunc, clockOutFunc,returnDailyClockRecords, getOpenJobsites } from './databaseFunctions'
import { useContext } from 'react';
import AppContext from '../Context.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {Component} from 'react'



//The Home Screen
export default function HomeScreen() {
  
  const [jobSite, setJobSite] = useState(' ');
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
  const[dbData,setdbData] = useState();
  const[gate,setGate] = useState(0);
  
  useEffect(()=>{
    const getData = async() => {
      var data = await returnDailyClockRecords(123456789,getDay())
      //console.log("Grabbing data")
      setdbData(data)
    }
      getData()
    return;
  },[gate])

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
  
  function clocking(value)
  {
    //when they clock in, store their time
    
    if(value)
    {
      setButtonText("Clock out")
      var hours = new Date().getHours()
      var min = new Date().getMinutes()
      //console.log("clock in")
      clockInFunc(tsContext.currentName,tsContext.currentId,getDay(),timeCheck(hours,min),jobSite,task)
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
  if(requiredText != null && requiredText2!=null)
    {
      return true;
    }
    else if(requiredText == null && requiredText2 == null)
    {
      Alert.alert("Please Enter Jobsite and Select Task");
      return false;
    }
    else if(requiredText == null)
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
    <Text style={styles.totalTimeText} > Total time: </Text>
    <Text></Text>
    <Text> </Text>
    <Text style={styles.textLabel} > Enter Jobsite: </Text>
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
        setTask(tsk);
        setOther(false);
        setOtherText("");
        setRequiredText2(true);

        if(tsk === "") {
          setRequiredText2(null);
        }
        if(tsk === "Other") {
          setRequiredText2(null);
          setOther(true);
          setOtherText("Please Enter Work");
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

    }}
    />
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

