import React, { useState, useEffect, Component } from 'react';
import {Platform,StyleSheet,Text,View,TextInput,Button, Alert, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import { getTimesheetsByID, getOpenJobsites, displayAllEmployees } from './databaseFunctions';
import { useContext } from 'react';
import AppContext from '../Context.js';
import {getCoordFromAddress,getStreetAddress,getDistFromSite,getOurCoords} from '../Screens/geoFunctions'
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
// state variable array that holds all objects for the clock in markers 
const [clockInMarkers,setClockInMarkers]=useState([]);
// state variable array that holds all objects for the clock out markers 
const [clockOutMarkers,setClockOutMarkers]=useState([]);
// state variable array that holds all jobsite coordinates
const [openJobsitesCoords,setOpenJobsitesCoords]=useState([]);
// state var for the where the map initially displays (Coordinates for Portland)
const [mapRegion, setmapRegion] = useState({
    latitude: 45.523064,
    longitude: -122.676483,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
});

    // refresh button to update map
     async function refresh(){
      // get all open jobsites
      var jobsitesQuery = await firebase.firestore().collection('jobsites').get();
      var allJobsites =  jobsitesQuery.docs;
      // empty array for all employees last timesheet
      var realtimeTimesheets= [];
      // get all employees in database
      var allEmployees =  await displayAllEmployees();
      // empty array for all employee ID's 
      var employeeIDArray=[];

      // gets all employee numbers and stores it into employeeIDArray
      for(let  looper =0;looper<allEmployees.length;looper++){
        
        employeeIDArray.push((allEmployees[looper]).employeeID);

      }

      // gets the last timesheet for all employees
      for(let iterator = 0 ;iterator < employeeIDArray.length; iterator++){
         let latestTimesheet = await getTimesheetsByID(employeeIDArray[iterator]);
         for(let employeeTimesheetIterator=0;employeeTimesheetIterator<latestTimesheet.length;employeeTimesheetIterator++){
          realtimeTimesheets.push(latestTimesheet[employeeTimesheetIterator]);
         }
      }
      // array for clock in objects
      var clockInArray= [];
      // array for clock in objects
      var clockOutArray = [];
      // gets the jobsite name and address if they match
       for(let i=0;i<realtimeTimesheets.length ;i++){
        // stores timesheet
        var recordData = (realtimeTimesheets[i]);
        // gets jobsite number for that timesheet
        var jobsiteNum= recordData.jobSite;
        // variable for the Jobsite name
        var jobsiteName = "";
        // variable for the Jobsite address
        var jobsiteAddress = "";
        
        for( let k=0;k<allJobsites.length;k++){
         let singleJobsite = (allJobsites[k]).data();
         // if jobsite numbers match up set jobsite name and number
         if(singleJobsite.jobNum == jobsiteNum){
          jobsiteName= singleJobsite.jobName;
          jobsiteAddress = singleJobsite.address +" "+singleJobsite.city+" "+singleJobsite.state+ " " + singleJobsite.zip;
          
        }
          
        }

        // get jobsite coords from the address
        let jobsiteCoords = await getCoordFromAddress(jobsiteAddress);
        // get the clock in distance from jobsite 
        let cinDistFromSite = await getDistFromSite(jobsiteCoords[0], jobsiteCoords[1], recordData.ClockInLatitude, recordData.ClockInLongitude)
        // get the clock out distance from jobsite 
        let coutDistFromSite = await getDistFromSite(jobsiteCoords[0], jobsiteCoords[1], recordData.ClockOutLatitude, recordData.ClockOutLongitude)

        // clock in object for marker
        var ClockInObject ={
          latitudeClockIn:recordData.ClockInLatitude,
          longitudeClockIn:recordData.ClockInLongitude,
          empName:recordData.name,
          jobsite:jobsiteName,
          task:recordData.task,
          clockInTime:recordData.clockIn,
          distJobsite:cinDistFromSite.toFixed(2)
        }

        // clock out object for marker
        var ClockOutObject ={
          latitudeClockOut:recordData.ClockOutLatitude,
          longitudeClockOut:recordData.ClockOutLongitude,
          empName:recordData.name,
          jobsite:jobsiteName,
          task:recordData.task,
          clockOutTime:recordData.clockOut,
          distJobsite:coutDistFromSite.toFixed(2)
        }
        
        // makes sure object has coordinates before pushing to array
        if(recordData.ClockInLatitude!==null && recordData.ClockInLongitude!==null  ){
          clockInArray.push(ClockInObject);
        }
        if(recordData.ClockOutLatitude!==null && recordData.ClockOutLongitude!==null  ){
          clockOutArray.push(ClockOutObject);
        }

       }

       // set state variable with the clock in objects
       setClockInMarkers(clockInArray);
       // set state variable with the clock in objects
       setClockOutMarkers(clockOutArray);

            // gets all open jobsites
            var jobsites = await getOpenJobsites();
            // array that stores all open jobsite coordiantes
            var siteCoordArr = [];
            

            for(let i=0; i < jobsites.length ; i++) {
              // object that stores name, longitude, and latitude for jobsite
              var latLongNameObject ={
                name:null,
                longitude:null,
                latitude:null
              }
              // gets jobsite coordinates from address
              let coords = await getCoordFromAddress(jobsites[i].address);
              // sets name, longitude, and latitude for jobsite
              latLongNameObject.latitude = coords[0];
              latLongNameObject.longitude = coords[1];
              latLongNameObject.name = jobsites[i].label;
              // add jobsite object to array
              siteCoordArr.push(latLongNameObject);
            }
            
            // stores open jobsite coordinates
            setOpenJobsitesCoords(siteCoordArr);
      }
 
  return (
    <View style={styler.fullPage}>
      {/* refresh button to update map */}
      <Button onPress={()=>refresh()}title="refresh"/>
      <Text> </Text>

      {/* Map with marker for current location */}
      <MapView style={styler.map} region={mapRegion} > 
        {/* draws all clock in markers */}
        {clockInMarkers.map(coordData=>
          <MapView.Marker 
          pinColor={'green'}
          coordinate={{latitude: coordData.latitudeClockIn, longitude: coordData.longitudeClockIn }}>
          <MapView.Callout>
            <View style={{height: 100, width: 200}}>
              <Text>Employee: {coordData.empName} </Text>
              <Text>Jobsite: {coordData.jobsite}</Text>
              <Text>Task: {coordData.task}</Text>
              <Text>Clock in time: {coordData.clockInTime} </Text>
              <Text>Distance from jobsite: {coordData.distJobsite} miles</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
        )}
        {/* draws all clock out markers */}
        {clockOutMarkers.map(coordData=>
          <MapView.Marker 
          coordinate={{latitude: coordData.latitudeClockOut, longitude: coordData.longitudeClockOut }}>
          <MapView.Callout>
            <View style={{height: 100, width: 200}}>
              <Text>Employee: {coordData.empName} </Text>
              <Text>Jobsite: {coordData.jobsite}</Text>
              <Text>Task: {coordData.task}</Text>
              <Text>Clock out time: {coordData.clockOutTime} </Text>
              <Text>Distance from jobsite: {coordData.distJobsite} miles</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
        )}
        {/* draws all jobsite markers */}
        {openJobsitesCoords.map(geoInfo => 
          <Marker pinColor={'blue'} coordinate={{latitude: geoInfo.latitude, longitude: geoInfo.longitude}} title= {geoInfo.name} />
        )}
      </MapView>

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
          height: Dimensions.get('window').height/1.4,
        },

        });
        











