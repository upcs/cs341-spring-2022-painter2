import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
import { clockIn, clockOut } from './databaseFunctions';


export default ClockTesterScreen=()=>{
    //all these are state variable for the values in the input text fields

    const[nameIn,setNameIn]=useState("");
    const [employeeIDIn,setIDIn]=useState(0);

    const[dateIn,setDateIn]=useState("");
    const [timeIn,setTimeIn]=useState("");
    

    const [employeeIDOut,setIDOut]=useState(0);
    const [timeOut,setTimeOut]=useState("");
    const[hoursWorked,setHoursWorked]=useState(0);



    return(
    <View> 
<TextInput onChangeText={(val)=>setIDIn(parseInt(val)) }style={styler.inputStyle}placeholder="ID of employee"> </TextInput>
<TextInput onChangeText={(val)=>setNameIn(val) }style={styler.inputStyle}placeholder="Name of Employee"> </TextInput>
<TextInput onChangeText={(val)=>setDateIn(val) }style={styler.inputStyle}placeholder="Date"> </TextInput>
<TextInput onChangeText={(val)=>setTimeIn(val) }style={styler.inputStyle}placeholder="Clock In Time"> </TextInput>
<Button onPress={()=>clockIn(nameIn,employeeIDIn,dateIn,timeIn)} style={styler.buttonStyle} title="Clock In"> </Button>


<TextInput onChangeText={(val)=>setIDOut(parseInt(val)) } style={styler.inputStyle}placeholder="ID of employee"> </TextInput>
<TextInput onChangeText={(val)=>setTimeOut(val) }style={styler.inputStyle}placeholder="Clock Out Time"> </TextInput>
<TextInput onChangeText={(val)=>setHoursWorked(parseFloat(val)) }style={styler.inputStyle}placeholder="Hours Worked"> </TextInput>

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