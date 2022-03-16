import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert,FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import  {Picker}  from '@react-native-picker/picker';
import { color } from 'react-native-reanimated';
import {clockInFunc, clockOutFunc, returnDailyClockRecords} from './databasefunctions';
//The Home Screen


export default function HomeScreen() {
    const [jobSite, setJobSite] = useState(' ');
    const [clockIn, setClock] = useState(false);
    const [color, setColor] = useState('green');
    const [buttonText, setButtonText] = useState("Clock in");
    const [requiredText, setRequiredText] = useState(null);
    const [requiredText2, setRequiredText2] = useState(null);
    const[selectedValue, setSelectedValue]=useState("");
    const[other,setOther]=useState(false);
    const[otherText,setOtherText] =useState("");
    const[time,setTime]=useState(0);
    const[totalTime,setTotalTime]=useState(0);
    
    function getDay()
    {
      var month = new Date().getMonth()
      var day = new Date().getDate()
      var year = new Date().getFullYear()
      month = month +1
      var string = month+"/"+day+"/"+year
      return string
    }
    const[count,setCounter] =useState(0);
    useEffect(() => {
            //when they clock in, store their time
            if(clockIn)
            {
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                hours = 9
                min = 6

            
                clockInFunc("David","2",getDay(),timeCheck(hours,min),jobSite)
                setColor('red') // Changes button color
                
                
                //stores the total minutes work for later
                hours = (hours)*60 + min
                setTime(hours)
            }
            //when they clock out, store their time
            if(clockIn == false){
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                hours = 17
                min = 13
                setColor('green') //changes button color
                var dbhours = hours*60 + min
                dbhours =(dbhours-time)/60
                setCounter(prevCount=>prevCount +1)
                clockOutFunc("2",timeCheck(hours,min),dbhours)
            }
        }, [clockIn])

    
    const[dbData,setdbData] = useState();
    useEffect(()=>{
      const getData = async() => {
        
        data = await returnDailyClockRecords("2",getDay())
        const length = data.length
        
        
        setdbData(data)
      }
      getData()
      
      return;
    },[dbData])


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
        renderItem={({item}) =>
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


