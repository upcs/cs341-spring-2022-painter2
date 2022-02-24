import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
//import * as firebase from 'firebase';

import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



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

  export const createNewEmployee= async(nameInput,employeeIDInput,emailInput,phoneInput,ageInput)=>  {
    var employees= await firebase.firestore()
    .collection('employees')
    .where('employeeID','==',employeeIDInput)
    .get();
    var sameIDCount=(employees.docs).length;
    
     


     if(sameIDCount==0){
    firebase.firestore()
    .collection("employees")
    .add({
    name:nameInput,
    employeeID:employeeIDInput,
    email:emailInput,
    phone:phoneInput,
    age:ageInput    
    });

     }
  

    }



//edits email field of record in the database
export const editEmployeeEmailHelper= async (docIDInput,emailInput)=>{
    console.log(docIDInput);
    firebase.firestore()
       .collection('employees')
       .doc(docIDInput)
       .update({
           email:emailInput
       })
        .then(() => {
       console.log('User updated!');
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
   export const editClockIn = async (Id,newTime) => {
       firebase.firestore()
       .collection('clocking')
       .where('clockID','==',Id)
       .get()
       .then(querySnapshot => {
           editClockInHelper(querySnapshot.docs[0].id,newTime)
       })
   }

   export const editClockInHelper= async (docIDInput,newTimeIn)=>{
    console.log(docIDInput);
    firebase.firestore()
       .collection('clocking')
       .doc(docIDInput)
       .update({
           clockIn:newTimeIn
       })
        .then(() => {
       console.log('Time in Updated!');
       });   
   }

   export const editClockOut = async (Id,newTime,) => {
    firebase.firestore()
    .collection('clocking')
    .where('clockID','==',Id)
    .get()
    .then(querySnapshot => {
        editClockInHelper(querySnapshot.docs[0].id,newTime)
    })
}

export const editClockOutHelper= async (docIDInput,newTimeOut)=>{
 console.log(docIDInput);
 firebase.firestore()
    .collection('clocking')
    .doc(docIDInput)
    .update({
        clockOut:newTimeOut
    })
     .then(() => {
    console.log('Time Out Updated!');
    });   
}
 
 
   export const getTimesheets = async () => {
        const snapshot = await firebase.firestore().collection('clocking').get()
        const timesheetsData = []
        snapshot.forEach(doc => {
            timesheetsData.push(doc.data());
        })
        alert(timesheetsData);
        return timesheetsData;
    }
   //displays the information of all employee records
   export const displayAllEmployees = async () =>{
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
        +"\nphone number: "+employeeData.phone
        +"\nage: "+employeeData.age;
     }
     //console.log(employeeArray);
     alert(alertEmployeeInfo);
     return employeeArray;


       }
 //gets employee record based on input paramter for name
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
        +"\nemail: "+data.email
        +"\nphone number: "+data.phone
        +"\nage: "+data.age;


    }
        
         console.log(IDEmployeeArray);
         alert(IDMessage);
         return IDEmployeeArray;
      
            }


 export const clockIn= async(newName,newEmployeeID,newDate
,newClockInTime)=>{
    var clockRecords= await firebase.firestore()
    .collection('clocking')
    .where('employeeID','==',newEmployeeID)
    .get();

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
     
         maxClockID=maxClockID+1;
      var employeeClockOutData = ((clockRecords.docs[index]).data()).clockOut;
      if(!(employeeClockOutData==="420")){
        firebase.firestore()
        .collection("clocking")
        .add({
        name:newName,
        employeeID:newEmployeeID,
        date:newDate,
        clockID:maxClockID,
        clockIn:newClockInTime,
        clockOut:"420", 
        hoursWorked:0  
        });
      }
    
    }


    else if((clockRecords.docs).length==0){
        firebase.firestore()
        .collection("clocking")
        .add({
        name:newName,
        employeeID:newEmployeeID,
        date:newDate,
        clockID:0,
        clockIn:newClockInTime,
        clockOut:"420",
        hoursWorked:0  
   
        });




     }

}          
 
 export const clockOut = async(newEmployeeID,
    newClockOutTime,newHoursWorked)=>{
var clockRecords= await firebase.firestore()
.collection('clocking')
.where('employeeID','==',newEmployeeID)
.get()

console.log((clockRecords.docs).length);

if((clockRecords.docs).length!=0){
var maxClockID=-100;
var index=-100;
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
var clockDocumentID=(clockRecords.docs[index]).id;
if(clockOutField==="420"){
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


export const returnDailyClockRecords= async (newEmployeeID,newDate)=>{
   var dateRecords= await firebase.firestore()
   .collection('clocking').where('employeeID','==',newEmployeeID)
   .get();
  
 var clocksForDateArray= [];
 for(let i=0;i<(dateRecords.docs).length;i++){
  let currentClockRecord=(dateRecords.docs[i]).data();
 

  if(currentClockRecord.date===newDate){
    clocksForDateArray.push(currentClockRecord);

  }


 }
 //console.log(clocksForDateArray);
return clocksForDateArray;



}