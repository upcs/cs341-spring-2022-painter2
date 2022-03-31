import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import  {Picker}  from '@react-native-picker/picker';
import { clockInFunc, clockOutFunc,returnDailyClockRecords, getTimesheetsByID } from './databaseFunctions'
import { getOurCoords  } from './geoFunctions'
import { useContext } from 'react';
import AppContext from '../Context.js';

//The Home Screen



export default function HomeScreen() {
  const [jobSite, setJobSite] = useState(' ');
  const [clockIn, setClock] = useState(null);
  const [color, setColor] = useState('green');
  const [buttonText, setButtonText] = useState("Clock in");
  const [requiredText, setRequiredText] = useState(null);
  const [requiredText2, setRequiredText2] = useState(null);
  const[selectedValue, setSelectedValue]=useState("");
  const[other,setOther]=useState(false);
  const[otherText,setOtherText] =useState("");
  const[time,setTime]=useState(0);
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
      
      var data = await returnDailyClockRecords("2",getDay())
      
      console.log("getting data")
      //setGate(true)
      setdbData(data)
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
            hours = 9;
            min = 0;
            console.log("clock in");
            setColor('red'); // Changes button color

            (async () =>{
              // let yourLat=(await getOurCoords())[0];
              // let yourLong=(await getOurCoords())[1];
              setLatitude((await getOurCoords())[0]);
              setLongitude((await getOurCoords())[1]);
              console.log("YOUR LATITIUDE: " + latitude);
              console.log("YOUR LONGITUDE: " + longitude);
              //setLocation({latitude: yourLat, longitude: yourLong});

              if(selectedValue == "Other") {
                await clockInFunc("David",2,getDay(),timeCheck(hours,min),jobSite, otherTextVal, latitude, longitude)
                
                for(let i=1; i<4;i++) {
                  console.log("i is: " + i);
                  let tsheet = await getTimesheetsByID(i);
                  console.log(tsheet);
                  let inputName = tsheet[0].name;
                  let inputLong = tsheet[0].longitude;
                  let inputLat = tsheet[0].latitude;
                  const marker = {name: inputName, lat: inputLat, long:inputLong};
                  console.log(marker);
                  setMarkerInfo(marker);
                  hsContext.setTCInfo([...hsContext.timecardInfo, markerInfo]);
                }
                console.log(hsContext.timecardInfo[0]);
                console.log(hsContext.timecardInfo[1]);
                console.log(hsContext.timecardInfo[2]);
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
                await clockInFunc("David",2,getDay(),timeCheck(hours,min),jobSite, otherTextVal, latitude, longitude)
                
                for(let i=1; i<4;i++) {
                  console.log("i is: " + i);
                  let tsheet = await getTimesheetsByID(i);
                  console.log(tsheet);
                  let inputName = tsheet[0].name;
                  let inputLong = tsheet[0].longitude;
                  let inputLat = tsheet[0].latitude;
                  const marker = {name: inputName, lat: inputLat, long:inputLong};
                  console.log(marker);
                  setMarkerInfo(marker);
                  //hsContext.setTCInfo([markerInfo]);
                  console.log("timecard info: ");
                  //console.log( hsContext.timecardInfo);
                  //hsContext.setTCInfo([markerInfo]);
                  //let tmp = (hsContext.timecardInfo);
                  hsContext.setTCInfo(testArray => [...testArray, markerInfo]);
                }
                console.log("TESTTT_________");
                console.log(hsContext.timecardInfo[0]);
                console.log(hsContext.timecardInfo[1]);
                console.log(hsContext.timecardInfo[2]);
                
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
                //console.log("TEST TEST2: " + hsContext.tcInfo[1]);
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
              hours = 17;
              min = 0;
              setColor('green'); //changes button color
                var dbhours = hours*60 + min;
                dbhours =(dbhours-time)/60;
                setTotalTime(prevTime=>prevTime + dbhours);
              
              (async () =>{
                setLatitude((await getOurCoords())[0]);
                setLongitude((await getOurCoords())[1]);
                console.log("YOUR LATITIUDE: " + latitude);
                console.log("YOUR LONGITUDE: " + longitude);
              
                console.log("clocking out")
                 await clockOutFunc(2,timeCheck(hours,min),dbhours, latitude, longitude)

                for(let i=1; i<4;i++) {
                  console.log("i is: " + i);
                  let tsheet = await getTimesheetsByID(i);
                  console.log(tsheet);
                  let inputName = tsheet[0].name;
                  let inputLong = tsheet[0].longitude;
                  let inputLat = tsheet[0].latitude;
                  const marker = {name: inputName, lat: inputLat, long:inputLong};
                  console.log(marker);
                  setMarkerInfo(marker);
                  //hsContext.setTCInfo([markerInfo]);
                  let tmp = (hsContext.timecardInfo);
                  hsContext.setTCInfo(tmp => [...tmp, markerInfo]);
                  // {hsContext.timecardInfo.map((a, i) => (
                  //   <p key={i}>{a}</p>
                  // ))}
                }
                console.log(hsContext.timecardInfo[0]);
                console.log(hsContext.timecardInfo[1]);
                console.log(hsContext.timecardInfo[2]);
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
      hours = 9
      min = 0
      console.log("clock in")
      clockInFunc(tsContext.currentName,tsContext.currentId,getDay(),timeCheck(hours,min),jobSite)
      //stores the total minutes work for later
      hours = (hours)*60 + min
      setTime(hours)
    }
    else
    {
      setButtonText("Clock in")
      var hours = new Date().getHours()
      var min = new Date().getMinutes()
      hours = 17
      min = 0
      var dbhours = hours*60 + min
      dbhours =(dbhours-time)/60
      console.log("clocking out")
      clockOutFunc("2",timeCheck(hours,min),dbhours)
    }
          
  }
 
function clockInClockOut()
{
  setClock(!clockIn);
  return clockIn ? setButtonText("Clock in")  : setButtonText("Clock out")


}

return (
  <View style={styles.container}>
    <Text style={styles.totalTimeText} > Total time:{totalTime} </Text>
    <Text></Text>

    <Text> </Text>
    <Text style={styles.textLabel} > Enter Jobsite: </Text>
    <TextInput
    style={styles.input}
    placeholder="e.g. Apartment "
    /* required text field */
    onChangeText={text => {
    //if text input is empty, null
    if(text === "")
    {
      setRequiredText(null);
    }
    else
    {
      setRequiredText(true);
      setJobSite(text);
    }
    }}
    />
    <View style={{ height: 175, padding: 20 }}>
      <Picker
        selectedValue={selectedValue}
        style={styles.selectMenu} itemStyle= {{height:150}}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          setOther(false);
          setOtherText("");
          setRequiredText2(true);
          //if the didn't select a task return null
          if(itemValue ==="")
          {

            setRequiredText2(null);

          }
          //if they select "other" task, activate text input box to allow them to enter in task
          if(itemValue === "Other")
          {
            setRequiredText2(null);
            setOther(true);
            setOtherText("Please Enter work");
          }
          if(itemValue !== "Other" && itemValue !=="") {
            setOtherTextVal(itemValue);
          }
        }}
        >
          <Picker.Item label ="Select Task" value = "" />
          <Picker.Item label ="Pressure Wash" value ="Pressure Wash" />
          <Picker.Item label ="Painting" value = "Painting" />
          <Picker.Item label ="Prep" value = "Prep" />
          <Picker.Item label ="cleanup" value = "Cleanup" />
          <Picker.Item label ="Travel" value = "Travel" />
          <Picker.Item label ="Delivery" value = "Delivery" />
          <Picker.Item label ="Office" value = "Office" />
          <Picker.Item label ="Shop" value = "Shop" />
          <Picker.Item label ="Other" value = "Other" />

        </Picker>
    </View>

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
            setOtherTextVal(text);
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

    <Button color ={color} title ={buttonText}  onPress={() => {

    if(requiredText != null && requiredText2!=null)
    {
      //console.log("button pressed");
      setTestGate(false)
      //console.log(testGate)
      
      clockInClockOut();
    }

    else if(requiredText == null && requiredText2 == null)
    {
      Alert.alert("Please Enter Jobsite and Select Task");
    }
    else if(requiredText == null)
    {
      Alert.alert("Please Enter Jobsite");
    }
    else if(requiredText2 == null && other ==true)
    {

      Alert.alert("Please type in Task")
    }
    else if(requiredText2== null && selectedValue==="")
    {
      Alert.alert("Please select Task")
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

