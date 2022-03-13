import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
 import {Platform,StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';

export default function DatabaseTesterScreen() {
  //state variable for text field of site location, siteLocation
  //state var for coordinates of site location, siteCoord
  // state var for your location,yourLocation
  //state var for your coordinates,yourCoord
  //state var for distance between yourself and site,distanceFromSite
const [siteLocation,setSiteLocation]=useState("");
const[siteCoord,setSiteCoord]=useState([]);
const[yourLocation,setYourLocation]=useState("");
const [yourCoord,setYourCoord]=useState([]);
const [distanceFromSite,setDistanceFromSite]=useState(0);
  
      async function getOurCoords(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        
        let locationServiceEnabled = await Location.hasServicesEnabledAsync();
        
          if (!locationServiceEnabled) {
        
            Alert.alert("Your Location services are turned off. Turn them on Please");
            return;
          }
        
      let coords = await Location.getCurrentPositionAsync({});
      console.log("Latitude is: "+coords.coords.latitude)
      console.log("Longitude is: "+coords.coords.longitude)
     // 45.41567513430611, -122.74994738832297 
     let arrCoord=[];
     arrCoord.push(coords.coords.latitude);
     arrCoord.push(coords.coords.longitude);
     return arrCoord;

    }

    async function getDistFromSite(siteLat,siteLong){
      let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permission to access location was denied');
  return;
}

let locationServiceEnabled = await Location.hasServicesEnabledAsync();

  if (!locationServiceEnabled) {

    Alert.alert("Your Location services are turned off. Turn them on Please");
    return;
  }
  
      // 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(long2 – long1)]
      let ourLoc= await getOurCoords();
      let xRad1=(siteLat/180)*Math.PI;
      let xRad2=(ourLoc[0]/180)*Math.PI;
      let yRad1=(siteLong/180)*Math.PI;
      let yRad2=(ourLoc[1]/180)*Math.PI;
      let productOfSines=Math.sin(xRad1)*Math.sin(xRad2);
      let productOfCosines=Math.cos(xRad1)*Math.cos(xRad2)*Math.cos(yRad2-yRad1);
      let distance=3963.00*Math.acos(productOfSines+productOfCosines);
       console.log("Your distance from the site is: "+distance+" miles");
       return distance;
      
  
      }
  async function getStreetAddress(inputLat,inputLong){
    let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permission to access location was denied');
  return;
}

let locationServiceEnabled = await Location.hasServicesEnabledAsync();

  if (!locationServiceEnabled) {

    Alert.alert("Your Location services are turned off. Turn them on Please");
    return;
  }
  
    let coordCollection = await Location.reverseGeocodeAsync({
      latitude:inputLat,
      longitude:inputLong
    });
let streetInfo="";
let cityName=""
let stateName="";
let zipCode="";
coordCollection.forEach(record=>{
  streetInfo=record.name;
  cityName=record.city;
  stateName=record.region;
  zipCode=record.postalCode;
});
let streetAddress=streetInfo+" "+cityName+" "+stateName+" "+zipCode;
console.log("The street Address is :" +streetAddress);
return streetAddress;
  }
   
  async function getCoordFromAddress(inputStreetLocation){
    let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permission to access location was denied');
  return;
}

let locationServiceEnabled = await Location.hasServicesEnabledAsync();

  if (!locationServiceEnabled) {

    Alert.alert("Your Location services are turned off. Turn them on Please");
    return;
  }
  
  
    let extractedCoord = await Location.geocodeAsync(inputStreetLocation);
    let extractedLatitude=0;
    let extractedLongitude=0;
    extractedCoord.forEach(each=>{
      extractedLatitude=each.latitude;
      extractedLongitude=each.longitude;
    });

    let extractedCoordArray=[extractedLatitude,extractedLongitude];
    console.log("lat : "+extractedLatitude+" long: "+extractedLongitude);
    return extractedCoordArray;
  
 



  }

async function handler(siteInput){
 let siteCoordinates= await getCoordFromAddress(siteInput);
 setSiteCoord(siteCoordinates);
  let yourLat=(await getOurCoords())[0];
  let yourLong=(await getOurCoords())[1];
  setYourLocation(await getStreetAddress(yourLat,yourLong));
  setYourCoord([yourLat,yourLong]);
  setDistanceFromSite(await getDistFromSite(siteCoordinates[0],siteCoordinates[1]))
}



 
  return (
    <View style={styler.fullPage}>
      <Text> Enter Site Address</Text>
    <TextInput onChangeText={(val)=>{setSiteLocation(val)}}style={styler.inputStyle}> </TextInput>
    <Button onPress={()=>handler(siteLocation)}title="Get Info About Site"/>
    <Text>Coordinates of Job site are : ({siteCoord[0]},{siteCoord[1]})</Text>
    <Text>Your Current Location is  : {yourLocation}</Text>
    <Text>Your Current Coordinates Are  : ({yourCoord[0]},{yourCoord[1]}) </Text>
    <Text>Your Distance From The Job site is  : {distanceFromSite} miles</Text>

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
        
























// import React, {Component, useState} from 'react';
// import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
// import {createNewEmployee,editEmployeeEmail,editEmployeeEmailHelper,
// displayAllEmployees,getEmployeeByID,clockIn,clockOut,returnDailyClockRecords} from "./databaseFunctions";
    
// export default DatabaseTesterScreen= ()=>{

// //all these are state variable for the values in the input text fields

// const [nameText,setName]=useState("");
// const [IDText,setID]=useState(0);
// const [emailText,setEmail]=useState("");
// const [phoneText,setPhone]=useState("");
// const [ageText,setAge]=useState(0);

// const [grabIDText,setGrabID]=useState("");
// const [changeIDText,setChangeID]=useState("");
// const [changeEmailText,setChangeEmail]=useState("");












   
  
        
        
           
        
// return (
 
//     <View style={styler.fullPage}> 
           
         

//     <Text>ID of employee you wanna grab </Text>
//     <TextInput onChangeText={(val) => setGrabID(parseInt(val)) } style={styler.inputStyle}> </TextInput>
//     <Button onPress={()=>getEmployeeByID(grabIDText)} title='submit'/>

//     <Button onPress={ ()=> displayAllEmployees()}title='get all employees'/>


//     <Text>name of employee you want to create </Text>
//     <TextInput onChangeText={(val)=> setName(val)} style={styler.inputStyle}> </TextInput>

//     <Text>ID of employee you want to create </Text>
//     <TextInput onChangeText ={(val)=> setID(parseInt(val)) }style={styler.inputStyle}> </TextInput>
   
//     <Text>email of employee you want to create </Text>
//     <TextInput onChangeText ={(val)=> setEmail(val)}style={styler.inputStyle}> </TextInput>

//     <Text>phone number of employee you want to create </Text>
//     <TextInput onChangeText ={(val)=> setPhone(val)}  style={styler.inputStyle}> </TextInput>

//     <Text>age of employee you want to create </Text>
//     <TextInput  onChangeText ={(val)=> setAge(parseInt(val))}style={styler.inputStyle}> </TextInput>
//     <Button onPress={()=>createNewEmployee(nameText,IDText,emailText,phoneText,ageText)} title='submit'/>

//     <Text>ID of employee you want to update </Text>
//     <TextInput   onChangeText ={(val)=> setChangeID(parseInt(val))}style={styler.inputStyle}> </TextInput>
   

//     <Text> Email you want to update with</Text>
//     <TextInput  onChangeText ={(val)=> setChangeEmail(val)} style={styler.inputStyle}> </TextInput>
//     <Button onPress={()=>editEmployeeEmail(changeIDText,changeEmailText)} title='submit'/>


       
           
//     </View>

// );



    

// }

// const styler = StyleSheet.create({
//     fullPage:{
//     flex:1,
//     backgroundColor:'#cdf',
//     alignItems:'center',
//     justifyContent:'center',
    
//     },
//     inputStyle:{
//     borderWidth:1,
//     borderColor:'#777',
//     padding:8,
//     margin: 0,
//     width:200,
    

    
//     }
    
    
//     });
    



