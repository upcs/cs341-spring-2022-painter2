import React, { useState, useEffect, Component } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {Platform,StyleSheet,Text,View,TextInput,Button, Alert, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 
import { getTimesheetsByID, getOpenJobsites } from './databaseFunctions';
import { useContext } from 'react';
import AppContext from '../Context.js';
import {getCoordFromAddress,getStreetAddress,getDistFromSite,getOurCoords} from '../Screens/geoFunctions'
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {auth} from './firebaseSettings'

//this config key used to connect to firestore database
const firebaseConfig = {
    apiKey: "AIzaSyCVu8npmz8_Mes5xQC6LBYTEBaw55ucAxRJXc",
    authDomain: "timesheetdb-2b167.firebaseapp.com",
    projectId: "timesheetdb-2b167",
    storageBucket: "timesheetdb-2b167.appspot.com",
    messagingSenderId: "533714654432",
    appId: "1:533714654432:web:9a8adf4fa6f391b48f6c85",
    measurementId: "G-S9ZRZDN57B"
  };
  
  // Initialize Firebase
  if(firebase.apps.length==0){
   firebase.initializeApp(firebaseConfig);
  }

export default function DatabaseTesterScreen() {
  //state variable for text field of site location, siteLocation
  //state var for coordinates of site location, siteCoord
  // state var for your location,yourLocation
  //state var for your coordinates,yourCoord
  //state var for distance between yourself and site,distanceFromSite
const [siteLocation,setSiteLocation]=useState("");
const [siteCoord,setSiteCoord]=useState([0,0]);
const [yourLocation,setYourLocation]=useState("");
const [yourCoord,setYourCoord]=useState([0,0]);
const [openJobsitesCoords,setOpenJobsitesCoords]=useState([]);
const [distanceFromSite,setDistanceFromSite]=useState(0);
const dtsContext = useContext(AppContext);

// state var for the where the map initially displays (Coordinates for Portland)
const [mapRegion, setmapRegion] = useState({
    latitude: 45.523064,
    longitude: -122.676483,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
});

// State var for users current location
const [location, setLocation] = useState({
  latitude: 0,
  longitude: 0,
});
const [error, setError] = React.useState(null)
const [siteMarker, setSiteMarker] = useState({
  latitude: 0,
  longitude: 0,
});
const [locationTest, setLocationTest] = useState({
  latitude: 0,
  longitude: 0,
});

const [filteredCoordinates,setFilteredCoordinates]=useState([])

    
     async function refresh(){
     
          var collectionQuery =  await firebase.firestore()
          .collection('clocking').get();

          var realtimeTimesheets=  collectionQuery.docs;
           var length=  realtimeTimesheets.length;
           var coordArray= [];
           for(let i=0;i< length;i++){
            var recordData=  (realtimeTimesheets[i]).data()
            var latLongObject ={
              longitude:recordData.latitude,
              latitude:recordData.longitude
            }
            if(("latitude" in recordData)==true && ("longitude" in recordData)==true){
             coordArray.push(latLongObject);
            }


           }
      
            setFilteredCoordinates(coordArray )
            var alertMessage="";

            for(let j=0;j<coordArray.length;j++){
              alertMessage+="Lat = "+coordArray[j].latitude+", Long= "+coordArray[j].longitude;


            }
           alert(alertMessage)

            var jobsites = await getOpenJobsites();

            // console.log("The open jobsites are: ");
            // console.log(openJobsites[0]);
            // console.log(openJobsites[1]);
            // console.log(openJobsites[2]);
            // console.log(openJobsites[3]);
            // console.log(openJobsites[4]);

            var siteCoordArr = [];
            
            console.log("Number of open Jobsites: " + jobsites.length)
            for(let i=0; i < jobsites.length ; i++) {

              var latLongNameObject ={
                name:null,
                longitude:null,
                latitude:null
              }

              console.log("The value of i: " + i);
              let coords = await getCoordFromAddress(jobsites[i].address);
              latLongNameObject.latitude = coords[0];
              latLongNameObject.longitude = coords[1];
              latLongNameObject.name = jobsites[i].label;
              siteCoordArr.push(latLongNameObject);
            }

            // console.log("The open jobsite coords are: ");
            // console.log(siteCoordArr[0]);
            // console.log(siteCoordArr[1]);
            // console.log(siteCoordArr[2]);
            // console.log(siteCoordArr[3]);
            // console.log(siteCoordArr[4]);
           
            setOpenJobsitesCoords(siteCoordArr);


        

      }
       


     
  
     
async function handler(siteInput){
  let yourLat=(await getOurCoords())[0];
    let yourLong=(await getOurCoords())[1];
    setYourLocation(await getStreetAddress(yourLat,yourLong));
    setYourCoord([yourLat,yourLong]);
  if(siteInput===""){
    return;

  }
  
  
 let siteCoordinates= await getCoordFromAddress(siteInput);

 setSiteCoord(siteCoordinates);
  
  setDistanceFromSite(await getDistFromSite(siteCoordinates[0],siteCoordinates[1]))
  //let siteCoord = (await getOurCoords())
  setSiteMarker({latitude: siteCoord[0], longitude: siteCoord[1]})
  setLocationTest({latitude: yourLat, longitude: yourLong})
  console.log(siteMarker)
  //console.log(siteMarker)
  
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
      <Button onPress={()=>refresh()}title="refresh"/>
      <Text> </Text>
      
      

      {/* Map with marker for current location */}
      <MapView style={styler.map} region={mapRegion} > 
        {dtsContext.timecardInfo.map(geoData => 
          
          <Marker coordinate={{latitude: geoData.lat, longitude: geoData.long}} title= {geoData.name} />
        )}
        {
        filteredCoordinates.map(coordData=>
          <Marker coordinate={{latitude: coordData.latitude, longitude: coordData.longitude}} title="Pranav"   />
           
        )}
        {openJobsitesCoords.map(geoInfo => 
          
          <Marker pinColor={'blue'} coordinate={{latitude: geoInfo.latitude, longitude: geoInfo.longitude}} title= {geoInfo.name} />
        )}

        <Marker coordinate={locationTest} title='yourMarker' />
        <Marker coordinate={siteMarker} title='SiteMarker'>
          <FontAwesome name="map-marker" size={40} color="#1F1BEA" />
        </Marker>
      </MapView>

      <Text> </Text>

      <Text style={styler.labelText}> Current Location:</Text>
      <Text style={styler.boldText}> {yourLocation} </Text>
      {/* <Text style={styler.text}> ({yourCoord[0]},{yourCoord[1]}) </Text> */}

      <Text> </Text>
      {/* <Text> </Text> */}

      {/* <Text style={styler.labelText}> Coordinates of Job site:</Text>
      <Text style={styler.text}> ({siteCoord[0]},{siteCoord[1]}) </Text> */}

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
          height: Dimensions.get('window').height/2.5,
        },

        });
        











