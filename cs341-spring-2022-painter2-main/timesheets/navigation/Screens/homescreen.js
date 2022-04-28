import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clockInFunc, clockOutFunc,returnDailyClockRecords, getTimesheetsByID, getOpenJobsites, coutUpdateCoords, cinUpdateCoords } from './databaseFunctions'
import { getOurCoords  } from './geoFunctions'
import { useContext } from 'react';
import AppContext from '../Context.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

//The Home Screen
export default function HomeScreen() {
  const [jobSite, setJobSite] = useState(' ');
  const [task, setTask] = useState(' ');
  const [clockIn, setClock] = useState(true);
  const [buttonText, setButtonText] = useState("Clock in");
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
  
  //gets the current day
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
    return hours + ":" + min + ":" +"00 "+ "am"
  }
  else if(hours>12)
  {
    return hours-12 + ":" + min + ":"+"00 "+ "pm"
  }
  else if(hours == 0)
  {
    return  12 + ":" + min + ":" +"00 "+ "am"
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
      //stores the total minutes work for later
      let dbHours = (hours)*60 + min;
      setTime(dbHours);
      console.log(timeCheck(hours,min))
      // clock users information into database
      clockInFunc(tsContext.currentName,tsContext.currentId,getDay(),timeCheck(hours,min),jobSite,task,0,0);
      (async () =>{
        // gets your longitude and latitude when you clock in
        let lat=((await getOurCoords())[0]);
        let long=((await getOurCoords())[1]);
        // update database with your coordinates
        cinUpdateCoords(tsContext.currentId, lat, long);
      })()
    }
    // clock out
    else
    {
      setButtonText("Clock in")
      // gets hours and minutes and calculates total time
      let hours = new Date().getHours()
      let min = new Date().getMinutes()
      let dbhours = hours*60 + min
      dbhours =(dbhours-time)/60
      
      //rounds hours to 2 decimal places
      dbhours = Number((dbhours).toFixed(2));
      // clocks out person and uploads to database
      clockOutFunc(tsContext.currentId,timeCheck(hours,min),dbhours, 0, 0);
      (async () =>{
        // get their coordinates when they clock out
        let coutLat = ((await getOurCoords())[0]);
        let coutLong = ((await getOurCoords())[1]);
        // upload coordinates to database
        coutUpdateCoords(tsContext.currentId, coutLat, coutLong);
      })()
    }
          
  }
 
//a function to make sure the user fulfills all the require
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
//activates the clocking in stuff when the clock button is pressed
const onClock = () =>{
  if(inputCheck())
  {
    setGate(!gate)//update flatlist
    setClock(!clockIn)//current clock in or clock out states
    clocking(clockIn)//does the actual clocking in/ clocking out function
  }
  

};


return (
  <View style={styles.container}>
    <Text style={styles.totalTimeText} > Total Hours Worked Today: {totalHoursWorked}  </Text>
    <View style={{backgroundColor:'#DDD'}}>
    <DropDownPicker
      style={{marginVertical: 10}}
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

        //checks to see if the user satisfied the select task requirement
        if(tsk === "") {
          setRequiredText2(null);
        }
        //activates the textfield so users can manually input a task that doesnt appear on the select menu
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
    
      <View style = {{flexDirection:"row", justifyContent:"space-evenly", alignItems: 'center'}}>
      
      <TextInput
        editable={other}
        style={[styles.input, otherText == "" ? 
        {backgroundColor: '#AAA'} : {backgroundColor: '#FFF'}]}
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
    
     
    </View>
    <TouchableOpacity
      style={{padding:15,
        backgroundColor:'white',
        alignItems:"center", 
        borderWidth:1, 
        borderRadius:8,
        alignSelf:'center',
        paddingHorizontal: 80,
        marginBottom:5}}
      onPress={onClock}
    >
      <Text style ={{fontSize:20, color:'green'}}>{buttonText}</Text>
    </TouchableOpacity>
    

    {/* the flat list column banners */}
    <View>
    <View style={{flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#ab0e0e',
                paddingLeft: 8,
                alignItems: 'center'
                 }}>
     <Text style={styles.timeText}>IN</Text>
     <Text style={styles.timeText}>OUT</Text>
     <View style={{flexDirection: 'row', alignItems: 'center'}}>
     <Text style={styles.timeText}>TIME</Text>
     {/*refresh buttop*/}
     <TouchableOpacity
        style={{alignItems:"center", marginLeft: 10}}
        onPress={()=> {
          setGate(!gate)

        }}
      >
    <Ionicons name={'ios-refresh-circle'} size={40} style={{color:'#FFF'}}/>
    </TouchableOpacity>
    </View>
     </View>
     </View>
      {/* the flatlist itself */}
    <FlatList
      data={dbData}
      
      keyExtractor={(item) => item.clockID}
      renderItem={ ({item}) => 
      
        <View style = {styles.listWrapper}>
          
          <Text style={{fontSize: 18}}>{item.clockIn}</Text>
          <Text style={{fontSize: 18, paddingRight: 15}}>{item.clockOut}</Text>
          <Text style={{fontSize: 18, paddingRight: 30}}>{item.hoursWorked} hours</Text>
        </View>
      }
    />
    </View>
   
  </View>

);

}
const styles = StyleSheet.create({
  container: {
  flex:1,
  },
  input: {
      borderWidth:1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200,
      borderRadius: 8
      
  },
  selectMenu: {
    flex: 1,
    backgroundColor: "white",
    width: 200,
  },
  totalTimeText: {
    textAlign: 'center',
    backgroundColor: "#ab0e0e",
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    padding: 10,

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
  timeText: {
    fontSize: 20,
    fontWeight:'bold',
    color: 'white',
  },
  listWrapper:{
    flexDirection: 'row',
    flexWrap:'wrap',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    padding: 5
  },
  time: {
    color:'#ab0e0e',
          fontSize:16,
          padding: 2,
      textShadowRadius: 1,
      textShadowColor: '#000000',
      textShadowOffset: {width: 0, height: 1}
  }
});
