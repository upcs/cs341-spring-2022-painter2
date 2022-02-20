import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//The Home Screen


export default function HomeScreen() {
    const [jobSite, setJobSite] = useState(' ');
    const [clockIn, setClock] = useState(null);
    const [color, setColor] = useState('green');
    const [buttonText, setButtonText] = useState("Clock in");

    const [clockInTime, setClockInTime] = useState("");
    const [clockOutTime, setClockOutTime] = useState("");

    const [requiredText, setRequiredText] = useState(null);

    useEffect(() => {
            if(clockIn)
            {
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                var sec = new Date().getSeconds()
                if(hours > 0 && hours<=12)
                    setClockInTime(
                    hours + ":" + min + ":" + sec + " am"
                )
                else if(hours>12)
                    setClockInTime(
                    hours-12 + ":" + min + ":" + sec + " pm"
                )
                else if(hours == 0)
                {
                    setClockInTime(
                     12 + ":" + min + ":" + sec + " am"
                     )
                }
                setColor('red')
                setClockOutTime()

            }
            if(clockIn == false){
                var hours = new Date().getHours()
                var min = new Date().getMinutes()
                var sec = new Date().getSeconds()

                setColor('green')

                if(hours > 0 && hours<=12)
                    setClockOutTime(
                    hours + ":" + min + ":" + sec + " am"
                )
                else if(hours>12)
                    setClockOutTime(
                    hours-12 + ":" + min + ":" + sec + " pm"
                )
                else if(hours == 0)
                {
                    setClockOutTime(
                    12 + ":" + min + ":" + sec + " am"
                )
                }
            }

        }, [clockIn])


  function clockInClockOut()
  {
    setClock(!clockIn)
    return clockIn ? setButtonText("Clock in")  : setButtonText("Clock out")

  }
  return (
    <View style={styles.container}>

      <Text> Clock in time: {clockInTime} </Text>
      <Text> </Text>
      <Text> Clock out time: {clockOutTime} </Text>
      <Text> </Text>


      <Text> Enter Jobsite: </Text>
      <TextInput
      style={styles.input}
      placeholder="e.g. Apartment "
      /* required text field */
      onChangeText={text => {

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
      <Text> Enter work: </Text>
      <TextInput
        style= {styles.input}
        placeholder='e.g. Power washing'
      />

      <Button color ={color} title ={buttonText} onPress={() => {
      if(requiredText != null)
      {
        clockInClockOut();
      }
      else{
        Alert.alert("Please Enter Jobsite");
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
    }



});

