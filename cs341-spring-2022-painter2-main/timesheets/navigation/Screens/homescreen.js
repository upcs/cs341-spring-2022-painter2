import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import  {Picker}  from '@react-native-picker/picker';

//The Home Screen


export default function HomeScreen() {
    const [jobSite, setJobSite] = useState(' ');
    const [clockIn, setClock] = useState(null);
    const [color, setColor] = useState('green');
    const [buttonText, setButtonText] = useState("Clock in");
    const [clockInTime, setClockInTime] = useState("");
    const [clockOutTime, setClockOutTime] = useState("");
    const [requiredText, setRequiredText] = useState(null);
    const [requiredText2, setRequiredText2] = useState(null);
    const[selectedValue, setSelectedValue]=useState("");
    const[other,setOther]=useState(false);
    const[otherText,setOtherText] =useState("");
    
    


    useEffect(() => {
            //when they clock in, store their time
            if(clockIn)
            {
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                var sec = new Date().getSeconds()
                //sets time
                setClockInTime(timeCheck(hours,min,sec))
                setColor('red')
                setClockOutTime()
            }
            //when they clock out, store their time
            if(clockIn == false){
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                var sec = new Date().getSeconds()
                setColor('green')
                setClockOutTime(timeCheck(hours,min,sec))
            }
        }, [clockIn])

  function clockInClockOut()
  {
    setClock(!clockIn)
    return clockIn ? setButtonText("Clock in")  : setButtonText("Clock out") 

  }
  //formats the time
  function timeCheck(hours, min,sec)
  {
    if(hours > 0 && hours<=12)
    {         
      return hours + ":" + min + ":" +sec+ "am"
    }
    else if(hours>12)
    {        
      return hours-12 + ":" + min + ":" +sec+ "pm"     
    }
    else if(hours == 0)
    {
      return  12 + ":" + min + ":" +sec+ "am"
    }
  }
 
  
  return (
    <View style={styles.container}>

      <Text> Clock in time: {clockInTime} </Text>
      <Text> </Text>
      <Text> Clock out time: {clockOutTime} </Text>
      <Text> Total time:  </Text>
      <Text> </Text>
      <Text> Enter Jobsite: </Text>
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
      }
      }}
      />
      
      <Picker
        selectedValue={selectedValue}
        style={styles.selectMenu} itemStyle= {{height:150}}
        onValueChange={(itemValue, itemIndex) => {
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
      <Button color ={color} title ={buttonText} onPress={() => {

      

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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center',

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


    }



});


