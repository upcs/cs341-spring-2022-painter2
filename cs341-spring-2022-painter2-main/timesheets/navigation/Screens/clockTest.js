import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
import { clockInFunc, clockOut } from './databaseFunctions';
//this is a tester creen to simulate clock ins and clock outs

export default ClockTesterScreen=()=>{
    //all these are state variable for the values in the input text fields
//state var for employee name
    const[nameIn,setNameIn]=useState("");
    //state var for employee id
    const [employeeIDIn,setIDIn]=useState(0);
    //state var for date if clock in

    const[dateIn,setDateIn]=useState("");
    //state var for time of clock in
    const [timeIn,setTimeIn]=useState("");
    
    //state var for employee id of clock out
    const [employeeIDOut,setIDOut]=useState(0);
    //state var for time of clock out

    const [timeOut,setTimeOut]=useState("");
    //amount of time worked between time of clock in and time of clock out
    const[hoursWorked,setHoursWorked]=useState(0);



    return(
    <View> 
        {/* all these are textinputs that get the fields for the state variables listed about */}
<TextInput onChangeText={(val)=>setIDIn(parseInt(val)) }style={styler.inputStyle}placeholder="ID of employee"> </TextInput>

<TextInput onChangeText={(val)=>setNameIn(val) }style={styler.inputStyle}placeholder="Name of Employee"> </TextInput>
<TextInput onChangeText={(val)=>setDateIn(val) }style={styler.inputStyle}placeholder="Date"> </TextInput>
<TextInput onChangeText={(val)=>setTimeIn(val) }style={styler.inputStyle}placeholder="Clock In Time"> </TextInput>
{/* calls clock in function baseed don test input fields */}
<Button onPress={()=>clockIn(nameIn,employeeIDIn,dateIn,timeIn)} style={styler.buttonStyle} title="Clock In"> </Button>


<TextInput onChangeText={(val)=>setIDOut(parseInt(val)) } style={styler.inputStyle}placeholder="ID of employee"> </TextInput>
<TextInput onChangeText={(val)=>setTimeOut(val) }style={styler.inputStyle}placeholder="Clock Out Time"> </TextInput>
<TextInput onChangeText={(val)=>setHoursWorked(parseFloat(val)) }style={styler.inputStyle}placeholder="Hours Worked"> </TextInput>
{/* calls clcock out function with text input fields as parameters */}
<Button onPress={()=>clockOut(employeeIDOut,timeOut,hoursWorked)} style={styler.buttonStyle} title="Clock Out"> </Button>



    </View>



    );

}

const styler = StyleSheet.create({
    fullPage:{
    flex:1,
    backgroundColor:'#cdf',
    alignItems:'center',
    justifyContent:'center',
    
    },
    inputStyle:{
    borderWidth:1,
    borderColor:'#777',
    padding:8,
    margin: 0,
    width:200,
    

    
    }
    ,

    buttonStyle:{
        borderWidth:1,
        borderColor:'#777',
        padding:8,
        margin: 0,
        width:200,

    }
    
    
    });