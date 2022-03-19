import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
//import * as firebase from 'firebase';

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
//creates a new employee record in the database with 
//the paramters name, ID, email address,phonenumber and age
  export const createNewEmployee= async(nameInput,emailInput,passwordInput,roleInput)=>  {
   //gets all records corresponding to a certain employee ID
   const d = new Date()
   let id = d.getTime(); 
    var employees= await firebase.firestore()
    .collection('employees')
    .where('employeeID','==', d)
    .get();
    var sameIDCount=(employees.docs).length;
   
     

    //if there is a record aldready under the ID given, 
    //then a new employee record is not created
    //otherwise the record is created
     if(sameIDCount==0){
    firebase.firestore()
    .collection("employees")
    .add({
    name:nameInput,
    employeeID:id,
    email:emailInput,
    password:passwordInput,
    role:roleInput    
    });

     }
  

    }

    //gets all the timesheets
    export const getTimesheets = async () =>{
  
    var allTimesheets= await firebase.firestore()
    .collection('clocking')
    .get();
    var timesheetsArray=[];
    for(let i=0;i<(allTimesheets.docs).length;i++){
        let timesheetsData=(allTimesheets.docs[i]).data();
       timesheetsArray.push(timesheetsData);
    }
    console.log("Timesheets fetched");
    return timesheetsArray;


      }



//edits email field of record in the database
export const editEmployeeEmailHelper= async (docIDInput,emailInput)=>{
    //console.log(docIDInput);
    firebase.firestore()
       .collection('employees')
       .doc(docIDInput)
       .update({
           email:emailInput
       })
        .then(() => {
       //console.log('User updated!');
       });   
 
 
 
   }
   //edits an employee record that it finds with the employeeID input
   //takes this record and changes the data in the email address field
   export const editEmployeeEmail =  async (IDInput,emailInput) =>{
       
    firebase.firestore()
       .collection('employees')
       .where('employeeID','==',IDInput)
       .get()
       .then(querySnapshot => {
           let firstDocument=querySnapshot.docs[0];
           //the document id of the corresponding document is retreived
           //this doc id is fed into helper function, that takes 
           //document ID as a parameter
           //helper function essentially handles the editing part
           editEmployeeEmailHelper(firstDocument.id,emailInput);
 
 
       });
 
 
 
       /*
       firestore()
       .collection('employees')
       .doc(docID)
       .update({
           email:emailInput
       })
        .then(() => {
       console.log('User updated!');
       });
       */
 
   }
 
 
 
 
   //displays the information of all employee records
   export const displayAllEmployees = async () =>{
       //gets all employee records from collection employees
     var allEmployees= await firebase.firestore()
     .collection('employees')
     .get();
     var employeeArray=[];
     var alertEmployeeInfo="";
     for(let i=0;i<(allEmployees.docs).length;i++){
         let employeeData=(allEmployees.docs[i]).data();
        employeeArray.push(employeeData);
        alertEmployeeInfo+="\nName: "+ employeeData.name
        +"\nemployeeID: "+employeeData.employeeID
        +"\nemail: "+employeeData.email
        //for each record prints alert message
        //of employee enformation for each record

     }
     //console.log(employeeArray);
     Alert.alert(alertEmployeeInfo);
     return employeeArray;
       }

  //searches for a user by email
  export const findUserByEmail = async(emailInput)=> {
      var fetchedEmployee= await firebase.firestore()
      .collection('employees')
      .where('email','==',emailInput)
      .get();
      emailEmployeeArray = [];
      for(let i = 0; i <(fetchedEmployee.docs).length;i++) {
        let data =(fetchedEmployee.docs[i].data());
        emailEmployeeArray.push(data);
      }
      console.log(emailEmployeeArray);
      return emailEmployeeArray;
  }
  
 //gets employee record based on input paramter for ID
 export const getEmployeeByID =  async (IDInput) =>{
    var fetchedEmployee=await firebase.firestore()
    .collection('employees')
    .where('employeeID','==',IDInput)
    .get();
     var IDEmployeeArray=[];
     var IDMessage="";
    for(let i=0;i<(fetchedEmployee.docs).length;i++){
          let data= (fetchedEmployee.docs[i]).data();
          IDEmployeeArray.push(data);
          IDMessage+="\nName: "+ data.name
        +"\nemployeeID: "+data.employeeID
        +"\nemail: "+data.email;


    }
        
         //console.log(IDEmployeeArray);
         Alert.alert(IDMessage);
         return IDEmployeeArray;
      
            }

//clocks in employee by adding a record to the database
//with the employee name, employee ID, date and 
//clock in time as the parameter
 export const clockInFunc= async(newName,newEmployeeID,newDate
,newClockInTime, newJobSite )=>{
    //gets all clock records for a given employee
    var clockRecords= await firebase.firestore()
    .collection('clocking')
    .get();
    //if employee has more than zero clock records
    //then the maximum clock ID of the records is calculated
    if((clockRecords.docs).length!=0){
    var maxClockID=-100;
    var index=-100;
    for(let i=0;i<(clockRecords.docs).length;i++){
         let data= (clockRecords.docs[i]).data();
         if(data.clockID>maxClockID){
            maxClockID=data.clockID;
            index=i;
         }
     }
   
     console.log(maxClockID);
         //clock id of newly inserted clock in record is incremented by one
         //so that all clock IDs of a give employee remain unique
         maxClockID=maxClockID+1;
         
      var employeeClockOutData = ((clockRecords.docs[index]).data()).clockOut;
      //if employee has the string 420 in the clockOut field of the 
      //most recent clock in record, then the employee is not allowed to clock in
      //otherwise employee is allowed to clock in
      //the 420 represents a clocked in time that has no corresponding
      //clock out time
      if(!(employeeClockOutData===null)){
        firebase.firestore()
        .collection("clocking")
        .add({
        name:newName,
        employeeID:newEmployeeID,
        date:newDate,
        clockID:maxClockID,
        clockIn:newClockInTime,
        clockOut:null,
        jobSite:newJobSite, 
        hoursWorked:0  
        });
      }
    
    }

//if there are no clock records for an employee yet
//a clock-in record with clock ID zero is added
    else if((clockRecords.docs).length==0){
        firebase.firestore()
        .collection("clocking")
        .add({
        name:newName,
        employeeID:newEmployeeID,
        date:newDate,
        clockID:0,
        clockIn:newClockInTime,
        clockOut:null,
        hoursWorked:0  
   
        });




     }

}          
 //function clocks out an employee by editing the clockOut time 
 //field of a record, so that it changes from the string 420 
 //to an actual valid clockOut time
 export const clockOutFunc = async(newEmployeeID,
    newClockOutTime,newHoursWorked)=>{
//gets all clock records for a given employee
var clockRecords= await firebase.firestore()
.collection('clocking')
.where('employeeID','==',newEmployeeID)
.get()

console.log((clockRecords.docs).length);
//if amount of clock records for an employee is zero a clock out is not possible
//otherwise, if there are clock in records, then a clock out is possible
if((clockRecords.docs).length!=0){
var maxClockID=-100;
var index=-100;
//records for a given date are filtered out from all records of a certain employee
for(let i=0;i<(clockRecords.docs).length;i++){
var data= (clockRecords.docs[i]).data();
if(data.clockID>maxClockID){
    maxClockID= data.clockID;
    index=i;
}

}

console.log(maxClockID);
console.log(index);

var clockOutField=((clockRecords.docs[index]).data()).clockOut;
//document id of most recent clock in record is fetched
//so that clock out time of the corresponding record
//can be modified 
var clockDocumentID=(clockRecords.docs[index]).id;
//if the clock out field of the record is set to 420
//that means that the employee has not clocked out yet
//so a clock out can be performed
//otherwise, the employee has aldready clockout out and a clock out
//action would not be performed
if(clockOutField===null){
    firebase.firestore()
    .collection('clocking')
    .doc(clockDocumentID)
    .update({
        clockOut:newClockOutTime,
        hoursWorked:newHoursWorked
    })
     .then(() => {
    console.log('clock record updated!');
    });   




}



}

}      

//functions returns all clocking records for a given employee on a given date
export const returnDailyClockRecords= async (newEmployeeID,newDate)=>{
   var dateRecords= await firebase.firestore()
   .collection('clocking').where('employeeID','==',newEmployeeID)
   .get();
  
 var clocksForDateArray= [];
 // converts returned records into readable json objects, appending them to 
 //the back of an array
 for(let i=0;i<(dateRecords.docs).length;i++){
  let currentClockRecord=(dateRecords.docs[i]).data();
 
//if the json object has matching date to the date in question,
//we add that json data to the array
  if(currentClockRecord.date===newDate){
    clocksForDateArray.push(currentClockRecord);

  }


 }
 //console.log(clocksForDateArray);
return clocksForDateArray;



}