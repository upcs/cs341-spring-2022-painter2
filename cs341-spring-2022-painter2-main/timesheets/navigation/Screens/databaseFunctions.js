import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
//import * as firebase from 'firebase';

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
  
     Alert.alert("User Created")
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
    //console.log("databaseFunctions: Timesheets fetched");
    return timesheetsArray;


    }

//Returns an array of all the employees
    export const getAllEmployees = async () =>{

        var allEmployees= await firebase.firestore()
        .collection('employees')
        .get();
        var employeesArray=[];
        for(let i=0;i<(allEmployees.docs).length;i++){
            let employeeData=(allEmployees.docs[i]).data();
            employeesArray.push(employeeData);
        }
        //console.log("databaseFunctions: users fetched");
        const sortedEmps = employeesArray.sort(compare);
        ////console.log("databaseFunctions: sortedArray - ", sortedEmps);
        return sortedEmps;
}

function compare( a, b ) {
  if ( a.name.toLowerCase() < b.name.toLowerCase() ){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase() ){
    return 1;
  }
  return 0;
}

    // gets timesheets by ID
    export const getTimesheetsByID = async (inputID) =>{
      var allTimesheets= await firebase.firestore()
              .collection('clocking')
              .where('employeeID', '==', inputID)
              .get();
      var timesheetsArray=[];
      for(let i=0;i<(allTimesheets.docs).length;i++){
        let timesheetsData=(allTimesheets.docs[i]).data();
        timesheetsArray.push(timesheetsData);
      }
      //var lastTimesheet = timesheetsArray.length - 1;
      var latestClockID = 0;
      for (let i=0;i<timesheetsArray.length;i++){
        singleTimehseet=timesheetsArray[i];
        //console.log(singleTimehseet.clockID);
        if(singleTimehseet.clockID > latestClockID){
          //console.log("if statement is true");
          latestClockID = singleTimehseet.clockID;
        }
      }
      //console.log("LatestClockID: " + latestClockID);
      var latestTimesheet=[];
      for(let i=0;i<timesheetsArray.length;i++){
        if(timesheetsArray[i].clockID==latestClockID){
          latestTimesheet.push(timesheetsArray[i]);
        }
      }
      //console.log("This is the latest timesheet");
      //console.log(latestTimesheet[0]);
      return latestTimesheet;

    }


//edits email field of record in the database
export const editEmployeeEmailHelper = async (docIDInput,emailInput)=>{
    ////console.log(docIDInput);
    firebase.firestore()
       .collection('employees')
       .doc(docIDInput)
       .update({
           email:emailInput
       })
        .then(() => {
       //console.log('databaseFunctions: User updated!');
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
       //console.log('User updated!');
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
     ////console.log(employeeArray);
    //  Alert.alert(alertEmployeeInfo);
     return employeeArray;
       }

  //searches for a user by email
  export const findUserByEmail = async(emailInput)=> {
      var fetchedEmployee= await firebase.firestore()
      .collection('employees')
      .where('email','==',emailInput)
      .get();
      var emailEmployeeArray = [];
      for(let i = 0; i <(fetchedEmployee.docs).length;i++) {
        let data =(fetchedEmployee.docs[i].data());
        emailEmployeeArray.push(data);
      }
      //console.log('db: userfound-', emailEmployeeArray);
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
,newClockInTime, newJobSite, newTask, ciLatitude, ciLongitude, editedBy)=>{
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
   
     //console.log(maxClockID);
         //clock id of newly inserted clock in record is incremented by one
         //so that all clock IDs of a give employee remain unique
         maxClockID=maxClockID+1;
         
      var employeeClockOutData = ((clockRecords.docs[index]).data()).clockOut;
      //if employee has the string 420 in the clockOut field of the 
      //most recent clock in record, then the employee is not allowed to clock in
      //otherwise employee is allowed to clock in
      //the 420 represents a clocked in time that has no corresponding
      //clock out time
      
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
        hoursWorked:0, 
        task:newTask,
        ClockInLatitude:ciLatitude,
        ClockInLongitude:ciLongitude,
        ClockOutLatitude: null,
        ClockOutLongitude: null,
        editedBy:null
        });
      
    
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
          jobSite:newJobSite, 
          hoursWorked:0, 
          task:newTask,
          ClockInLatitude:ciLatitude,
          ClockInLongitude:ciLongitude,
          ClockOutLatitude: null,
          ClockOutLongitude: null
        });




     }

}          
 //function clocks out an employee by editing the clockOut time 
 //field of a record, so that it changes from the string 420 
 //to an actual valid clockOut time
 export const clockOutFunc = async(newEmployeeID,
    newClockOutTime,newHoursWorked, newLatitude, newLongitude)=>{
//gets all clock records for a given employee
var clockRecords= await firebase.firestore()
.collection('clocking')
.where('employeeID','==',newEmployeeID)
.get()

//console.log((clockRecords.docs).length);
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

//console.log(maxClockID);
//console.log(index);

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
        hoursWorked:newHoursWorked,
        ClockOutLatitude:newLatitude,
        ClockOutLongitude:newLongitude
    })
     .then(() => {
    //console.log('clock record updated!');
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
 ////console.log(clocksForDateArray);
return clocksForDateArray;
}


//adds a jobsite to the database
export const addJobsite = async(addressInp, customerInp, jobNameInp) => {
  const year = new Date().getFullYear().toString().substring(2);
  var jobsites = await firebase.firestore().collection('jobsites').where('jobYear','==',year).get();

  firebase.firestore().collection('jobsites').add(
    {
      address:addressInp,
      customer:customerInp,
      jobName:jobNameInp,
      jobNum: year + "-" + (jobsites.size + 101),
      status: "Open"
    }
  );
}

//finds an employee by ID and chagnes their role
export const changeRole = async(id, newRole) => {
    //console.log('databaseFunctions: role change - ', newRole + id )
    var emp = await firebase.firestore().collection('employees').where('employeeID','==',id).get();
    ////console.log('databaseFunctions: employee - ', employee)
    //console.log('databaseFunctions: employee - ', emp.docs)
    var docID = emp.docs[0].id;
    firebase.firestore().collection('employees').doc(docID).update({role:newRole});
    //console.log('databaseFunctions: User role updated!');
  }


//finds an employee by ID and changes clock in time

export const changeClockIn = async(newClockIn,id,clockID,editName) => {
  var employee = await firebase.firestore().collection('clocking').where('employeeID','==',id).where('clockID','==',clockID).get();
  employee.forEach(emp => {
    if(emp.clockID == clockID) {
      return emp;
    }
  })
  var docID = employee.docs[0].id
  //console.log(docID)
  firebase.firestore().collection('clocking').doc(docID).update({clockIn:newClockIn,editedBy:editName});
}  
//finds an employee by ID and changes clock out time

export const changeClockOut = async(newClockOut,id,clockID,editName) => {
  var employee = await firebase.firestore().collection('clocking').where('employeeID','==',id).where('clockID','==',clockID).get();

  employee.forEach(emp => {
    if(emp.clockID == clockID) {
      return emp;
    }
  })

  var docID = employee.docs[0].id
  //console.log(docID)
  firebase.firestore().collection('clocking').doc(docID).update({clockOut:newClockOut,editedBy:editName});
}  
//finds an employee by ID and changes clock in time

export const changeJobSite = async(newJobSite,id,clockID,editName) => {
  var employee = await firebase.firestore().collection('clocking').where('employeeID','==',id).where('clockID','==',clockID).get();
  employee.forEach(emp => {
    if(emp.clockID == clockID) {
      return emp;
    }
  })
  var docID = employee.docs[0].id
  //console.log(docID)
  await firebase.firestore().collection('clocking').doc(docID).update({jobSite:newJobSite,editedBy:editName});
}
export const changeHoursWorked = async(newHoursWorked,id,clockID,editName) => {
  var employee = await firebase.firestore().collection('clocking').where('employeeID','==',id).where('clockID','==',clockID).get();
  employee.forEach(emp => {
    if(emp.clockID == clockID) {
      return emp;
    }
  })
  var docID = employee.docs[0].id
  //console.log(docID)
  await firebase.firestore().collection('clocking').doc(docID).update({hoursWorked:newHoursWorked});
}

//finds an employee by id and removes them from database
export const removeEmployee = async(id) => {
  var employee = await firebase.firestore().collection('employees').where('employeeID','==',id).get();
  var docID = employee.docs[0].id;
  firebase.firestore().collection('employees').doc(docID).delete();
}

//finds a timesheet by id and removes it from database
export const removeTimesheet = async(id,clockID) => {
  var employee = await firebase.firestore().collection('clocking').where('employeeID','==',id).get();
  employee.forEach(emp => {
    if(emp.clockID == clockID) {
      return emp;
    }
  })
  var docID = employee.docs[0].id;
  firebase.firestore().collection('clocking').doc(docID).delete();
}
//sets the status field of a jobsite to "Closed"
export const closeJobsite = async(inpJobNum) => {
  var jobs = await firebase.firestore().collection('jobsites').where('jobNum','==',inpJobNum).get();
  var jobID = jobs.docs[0].id
  firebase.firestore().collection('jobsites').doc(jobID).update({status:"Closed"});
}
//sets the status field of a jobsite to "Open"
export const openJobsite = async(inpJobNum) => {
  var jobs = await firebase.firestore().collection('jobsites').where('jobNum','==',inpJobNum).get();
  var jobID = jobs.docs[0].id
  firebase.firestore().collection('jobsites').doc(jobID).update({status:"Open"});
}
//gets all jobsite data recods
export const getAllJobsites = async() => {
  var allJobsites = await firebase.firestore().collection('jobsites').get();
return allJobsites;
}

export const getOpenJobsites = async() => {
  var jobsites = await firebase.firestore().collection('jobsites').where("status",'==',"Open").get();
  var jobsiteArr = [];
  for(let i=0;i<(jobsites.docs).length;i++){
    let jobsitesData=(jobsites.docs[i]).data();

    jobsiteArr.push({"label": jobsitesData.jobName, "value": jobsitesData.jobNum, "address": jobsitesData.address});

}

//console.log(jobsiteArr);
//console.log("Jobsites fetched");
return jobsiteArr;

}
export const getEmployeeList = async() => {
  var employees = await firebase.firestore().collection('employees').get();
  var employeeList = [];
  for(let i=0;i<(employees.docs).length;i++){
    let employeesData=(employees.docs[i]).data();
    employeeList.push({"label": employeesData.name, "value": employeesData.name});
}
return employeeList;
//console.log("Jobsites fetched");
}

//authentification function that adds employee as firebase user
//used to send out timesheet emails
export const addFireBaseUser = async(emailInput, passInput, name, en)=>{
  try {
    await auth.createUserWithEmailAndPassword(emailInput,passInput)
  } catch (err){
    return Error(err);
  }
  await createNewEmployee(name, emailInput, en, "Employee");
  return true;
}

export const signInUser=async(emailInput,passInput)=>{
  try {
    await auth.signInWithEmailAndPassword(emailInput,passInput)
  } catch (err){
    return Error(err);
  }
  return true;
}

export const signOutUser = async() => {
  auth.signOut();
}

export const coutUpdateCoords = async(newEmployeeID,
 newLatitude, newLongitude)=>{
//gets all clock records for a given employee
var clockRecords= await firebase.firestore()
.collection('clocking')
.where('employeeID','==',newEmployeeID)
.get()

//console.log((clockRecords.docs).length);
//if amount of clock records for an employee is zero a then we cant update coordinates
//otherwise, if there are clock in records, then a updating clock out coordinates is possible
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

////console.log(maxClockID);
////console.log(index);

var coutLatitude=((clockRecords.docs[index]).data()).ClockOutLatitude;
var coutLongitude=((clockRecords.docs[index]).data()).ClockOutLongitude;
//document id of most recent clock in record is fetched
//so that clock out time of the corresponding record
//can be modified 
var clockDocumentID=(clockRecords.docs[index]).id;
//if both latitude and longitude is 0
//that means that the coordinates have not ben updated yet
//so update the coordinates
//otherwise, the coordinates wont be updated
if(coutLatitude===0 && coutLongitude===0){
  firebase.firestore()
  .collection('clocking')
  .doc(clockDocumentID)
  .update({
      ClockOutLatitude:newLatitude,
      ClockOutLongitude:newLongitude
  })
   .then(() => {
  //console.log('coords updated!');
  });   




}



}

}      

export const cinUpdateCoords = async(newEmployeeID,
  newLatitude, newLongitude)=>{
 //gets all clock records for a given employee
 var clockRecords= await firebase.firestore()
 .collection('clocking')
 .where('employeeID','==',newEmployeeID)
 .get()
 
 //console.log((clockRecords.docs).length);
 //if amount of clock records for an employee is zero a then we cant update coordinates
 //otherwise, if there are clock in records, then a updating clock out coordinates is possible
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
 
 ////console.log(maxClockID);
 ////console.log(index);
 
 var cinLatitude=((clockRecords.docs[index]).data()).ClockInLatitude;
 var cinLongitude=((clockRecords.docs[index]).data()).ClockInLongitude;
 //document id of most recent clock in record is fetched
 //so that clock out time of the corresponding record
 //can be modified 
 var clockDocumentID=(clockRecords.docs[index]).id;
 //if both latitude and longitude is 0
 //that means that the coordinates have not ben updated yet
 //so update the coordinates
 //otherwise, the coordinates wont be updated
 if(cinLatitude===0 && cinLongitude===0){
   firebase.firestore()
   .collection('clocking')
   .doc(clockDocumentID)
   .update({
       ClockInLatitude:newLatitude,
       ClockInLongitude:newLongitude
   })
    .then(() => {
   //console.log('coords updated!');
   });   
 
 
 
 
 }
 
 
 
 }
 
 }      