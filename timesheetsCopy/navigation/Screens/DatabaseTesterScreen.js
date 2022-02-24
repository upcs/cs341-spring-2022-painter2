import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
import {createNewEmployee,editEmployeeEmail,editEmployeeEmailHelper,
displayAllEmployees,getEmployeeByID,clockIn,clockOut,returnDailyClockRecords} from "./databaseFunctions";
    
export default DatabaseTesterScreen= ()=>{

//all these are state variable for the values in the input text fields

const [nameText,setName]=useState("");
const [IDText,setID]=useState(0);
const [emailText,setEmail]=useState("");
const [phoneText,setPhone]=useState("");
const [ageText,setAge]=useState(0);

const [grabIDText,setGrabID]=useState("");
const [changeIDText,setChangeID]=useState("");
const [changeEmailText,setChangeEmail]=useState("");












   
  
        
        
           
        
return (
 
    <View style={styler.fullPage}> 
           
         

    <Text>ID of employee you wanna grab </Text>
    <TextInput onChangeText={(val) => setGrabID(parseInt(val)) } style={styler.inputStyle}> </TextInput>
    <Button onPress={()=>getEmployeeByID(grabIDText)} title='submit'/>

    <Button onPress={ ()=> displayAllEmployees()}title='get all employees'/>


    <Text>name of employee you want to create </Text>
    <TextInput onChangeText={(val)=> setName(val)} style={styler.inputStyle}> </TextInput>

    <Text>ID of employee you want to create </Text>
    <TextInput onChangeText ={(val)=> setID(parseInt(val)) }style={styler.inputStyle}> </TextInput>
   
    <Text>email of employee you want to create </Text>
    <TextInput onChangeText ={(val)=> setEmail(val)}style={styler.inputStyle}> </TextInput>

    <Text>phone number of employee you want to create </Text>
    <TextInput onChangeText ={(val)=> setPhone(val)}  style={styler.inputStyle}> </TextInput>

    <Text>age of employee you want to create </Text>
    <TextInput  onChangeText ={(val)=> setAge(parseInt(val))}style={styler.inputStyle}> </TextInput>
    <Button onPress={()=>createNewEmployee(nameText,IDText,emailText,phoneText,ageText)} title='submit'/>

    <Text>ID of employee you want to update </Text>
    <TextInput   onChangeText ={(val)=> setChangeID(parseInt(val))}style={styler.inputStyle}> </TextInput>
   

    <Text> Email you want to update with</Text>
    <TextInput  onChangeText ={(val)=> setChangeEmail(val)} style={styler.inputStyle}> </TextInput>
    <Button onPress={()=>editEmployeeEmail(changeIDText,changeEmailText)} title='submit'/>


       
           
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
    
    
    });
    




