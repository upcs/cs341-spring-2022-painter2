import React, { useState, useEffect, Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {Platform,StyleSheet,Text,View,TextInput,Button, Alert, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 


export default function DatabaseTesterScreen() {
  //state variable for text field of site location, siteLocation
  //state var for coordinates of site location, siteCoord
  // state var for your location,yourLocation
  //state var for your coordinates,yourCoord
  //state var for distance between yourself and site,distanceFromSite
const [siteLocation,setSiteLocation]=useState("");
const [siteCoord,setSiteCoord]=useState([]);
const [yourLocation,setYourLocation]=useState("");
const [yourCoord,setYourCoord]=useState([]);
const [distanceFromSite,setDistanceFromSite]=useState(0);

// state var for the where the map initially displays (Coordinates for Portland)
const [mapRegion, setmapRegion] = useState({
    latitude: 45.523064,
    longitude: -122.676483,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
});

// State var for users current location
const [location, setLocation] = React.useState(null)
const [error, setError] = React.useState(null)
const [siteMarker, setSiteMarker] = useState({
  latitude: 0,
  longitude: 0,
});

      // gets the users current location and sets it to location
      React.useEffect(() => {
        (async () =>{
            let { status } = await Location.requestPermissionsAsync();
            if(status !== 'granted'){
                setError('Permission to access location was denied');
                return;
            }
            const locate = await Location.getCurrentPositionAsync({});
            setLocation(locate.coords)
            // let siteCoord = (await getOurCoords())
            // setSiteMarker({latitude: siteCoord[0], longitude: siteCoord[1]})
            // console.log(siteMarker)

        })()
      }, []);
  
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
      //console.log("Latitude is: "+coords.coords.latitude)
      //console.log("Longitude is: "+coords.coords.longitude)
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
       //console.log("Your distance from the site is: "+distance+" miles");
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
//console.log("The street Address is :" +streetAddress);
return streetAddress;
  }
   

//this async function is a click handler

async function handler(siteInput){
 let siteCoordinates= await getCoordFromAddress(siteInput);
 //gets coordinates of jobsite entered into input text field
 setSiteCoord(siteCoordinates);
  let yourLat=(await getOurCoords())[0];
  let yourLong=(await getOurCoords())[1];
  //gets your actual current street address and displays to screen
  setYourLocation(await getStreetAddress(yourLat,yourLong));
  //gets your current latitude corrdinates at displays
  setYourCoord([yourLat,yourLong]);
  //displays your distance from jobsite you entered into text field
  setDistanceFromSite(await getDistFromSite(siteCoordinates[0],siteCoordinates[1]))
  //let siteCoord = (await getOurCoords())
  setSiteMarker({latitude: siteCoord[0], longitude: siteCoord[1]})
  console.log(siteMarker)
}



 
  return (
    <View style={styler.fullPage}>
      <View
        style={{flexDirection: "row", height: 30 }}>
        <Text style={styler.headerText}> Enter Site Address: </Text>
        <TextInput onChangeText={(val)=>{setSiteLocation(val)}}style={styler.inputStyle}> </TextInput>
      </View>
      <Button onPress={()=>handler(siteLocation)}title="Get Info About Site"/>

      <Text style={styler.line}>_______________________________________________</Text>

      <Text> </Text>


      {/* Map with marker for current location */}
      <MapView style={styler.map} region={mapRegion} > 
        <Marker coordinate={location} title='yourMarker' />
        <Marker coordinate={siteMarker} title='SiteMarker'>
          <FontAwesome name="map-marker" size={40} color="#1F1BEA" />
        </Marker>
      </MapView>

      <Text> </Text>

      <Text style={styler.labelText}> Current Location:</Text>
      <Text style={styler.boldText}> {yourLocation} </Text>
      <Text style={styler.text}> ({yourCoord[0]},{yourCoord[1]}) </Text>

      <Text> </Text>
      <Text> </Text>

      <Text style={styler.labelText}> Coordinates of Job site:</Text>
      <Text style={styler.text}> ({siteCoord[0]},{siteCoord[1]}) </Text>

      <Text> </Text>

      <Text style={styler.labelText}> Distance from job site:</Text>
      <Text style={styler.text}> {distanceFromSite.toFixed(2)} miles</Text>


      {/* <Text style={styler.labelText}>Coordinates of Job site are : ({siteCoord[0]},{siteCoord[1]})</Text> */}
    
      {/* <Text style={styler.labelText}>Your Current Location is  : {yourLocation}</Text>
      <Text style={styler.labelText}>Your Current Coordinates Are  : ({yourCoord[0]},{yourCoord[1]}) </Text> */}
      {/* <Text style={styler.labelText}>Your Distance From The Job site is  : {distanceFromSite} miles</Text> */}

    </View>

  );
}

const styler = StyleSheet.create({
        fullPage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        },
        inputStyle:{
        borderWidth:1,
        borderColor:'#777',
        padding:8,
        margin: 0,
        width:190,
        },
        headerText:{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black',
        },
        labelText:{
          fontWeight: 'bold',
          fontSize: 22,
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: '#ab0e0e',
          color: '#fff'
        },
        line:{
          fontWeight: 'bold',
          color: 'black'
        },
        text: {
          textAlign: 'center',
          fontSize: 20,
          color: 'black'
        },
        boldText: {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black'
        },
        map: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height/4,
        },

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
    



