import React from 'react';

import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getTimesheets, getTimesheetsForID,displayAllEmployees, findUserByEmail, getEmployeeByID, returnDailyClockRecords } from '../navigation/Screens/databaseFunctions'
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { Alert } from 'react-native';
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
  
test('getTimesheets works correctly', () => {
    return getTimesheets().then(result=>{
   return firebase.firestore().collection('clocking').get().then(testResult=>{
       //this is actual number of clocking records in database
   let actualCount=(testResult.docs).length;
   //comparing the actual clocking records count to the one returned by my function
   expect(result.length).toBe(actualCount);
   expect(result.length).not.toBe(actualCount-2);
   expect(result.length).not.toBe(actualCount+2);


   })
    
    }); 

});


test('getTimesheetsForID works correctly', () => {
   return getTimesheetsForID(227).then(result=>{
       //gets set of clock records for a given employee id
    result.forEach(clockRecord=>{
        //checks each clock record in the set to see if they have the correct
        //employee ID

        expect(clockRecord.employeeID).toBe(227);
        expect(clockRecord.employeeID).not.toBe(255);
    //checks if each clock record has the right fields
        expect((clockRecord["clockID"])!==null).toBe(true);
        expect((clockRecord["clockIn"])!==null).toBe(true);
        expect((clockRecord["clockOut"])!==null).toBe(true);
        expect((clockRecord["date"])!==null).toBe(true);
        expect((clockRecord["employeeID"])!==null).toBe(true);
        expect((clockRecord["hoursWorked"])!==null).toBe(true);
        expect((clockRecord["name"])!==null).toBe(true);
        //this nested for loop tests if
        //the clock records retreived have duplicate clock IDs for the same employee
        //if there are no duplicate clock ID's
        //then the test passes
        //otherwise test fails
   let arrayOfClockID=result.map(record=>record.clockID);
   console.log(arrayOfClockID);
   for(duplicate in arrayOfClockID){
       let countOfDuplicate=0;
  for(elem in arrayOfClockID ){
  if(duplicate===elem){
    countOfDuplicate=countOfDuplicate+1;
  }

  }
  console.log(countOfDuplicate);
  expect(countOfDuplicate<2).toBe(true);
}



    })
       //gets set of clock records for a given employee id

    return getTimesheetsForID(55).then(result=>{
        //checks each clock record in the set to see if they have the correct
        //employee ID
        result.forEach(clockRecord=>{
            expect(clockRecord.employeeID).toBe(55);
            expect(clockRecord.employeeID).not.toBe(53);
    
        })
 
       })

   })
  

});

test('displayAllEmployees works correctly',()=>{
    return displayAllEmployees().then(result=>{
        return firebase.firestore().collection('employees').get().then(testResult=>{
            //the real number of employees in the database
        let actualNumEmployees=(testResult.docs).length;
        //comparing the actual number of employees to output of function
        expect(result.length).toBe(actualNumEmployees);
        expect(result.length).not.toBe(actualNumEmployees/2);
        expect(result.length).not.toBe(actualNumEmployees*2);
     
        })
         
         });    

});

test('findUserByEmail works correctly', () => {
    return findUserByEmail("silvak23@up.edu").then(result=>{
        //gets employee records with given email
     result.forEach(employeeRecord=>{
         //checks employee record to see if it has correct email 
         //queried for
         expect(employeeRecord.email).toBe("silvak23@up.edu");
         expect(employeeRecord.email).not.toBe("pranav@aol.com");
     //checks if the employee has all the correct fields
     //in their record
         expect((employeeRecord["email"])!==null).toBe(true);
         expect((employeeRecord["employeeID"])!==null).toBe(true);
         expect((employeeRecord["name"])!==null).toBe(true);
         expect((employeeRecord["password"])!==null).toBe(true);
         expect((employeeRecord["role"])!==null).toBe(true);
       
     })
         //gets employee records with a different email

     return findUserByEmail("a@a.com").then(result=>{
         //checks each clock record in the set to see if they have the correct
         //employee ID
         result.forEach(employeeRecord=>{
             expect(employeeRecord.email).toBe("a@a.com");
             expect(employeeRecord.email).not.toBe("pranav@aol.com");
     
         })
  
        })
 
    })
   
 
 });

 test('getEmployeeByID works correctly', () => {
    return getEmployeeByID(227).then(result=>{
        //gets employee  with given ID
     result.forEach(employeeRecord=>{
         //checks employee record to see if it has correct ID
         //queried for
         expect(employeeRecord.employeeID).toBe(227);
         expect(employeeRecord.employeeID).not.toBe(227);
     //checks if the employee has all the correct fields
     //in their record
         expect((employeeRecord["email"])!==null).toBe(true);
         expect((employeeRecord["employeeID"])!==null).toBe(true);
         expect((employeeRecord["name"])!==null).toBe(true);
         expect((employeeRecord["password"])!==null).toBe(true);
         expect((employeeRecord["role"])!==null).toBe(true);
       
     })
         //gets employee records with a different ID

     return getEmployeeByID(55).then(result=>{
        //checks employee record to see if it has correct ID
         //queried for
         result.forEach(employeeRecord=>{
             expect(employeeRecord.employeeID).toBe(55);
             expect(employeeRecord.employeeID).not.toBe(59);
     
         })
  
        })
 
    })
   
 
 });

 test('returnDailyClockRecords works correctly', () => {
    return returnDailyClockRecords(227,"7-15-22").then(result=>{
        //gets clock record of given employee on a given date
     result.forEach(clockRecord=>{
        //checks to see if employee records fall under the correct date
        //and the correct employee ID
         expect(clockRecord.date).toBe("7-15-22");
         expect(clockRecord.employeeID).toBe(227);
         expect(clockRecord.employeeID).not.toBe(225);
         expect(clockRecord.date).not.toBe("6-6-94");

     //checks if clock records queried for have all the
     //correct fields

     expect((clockRecord["clockID"])!==null).toBe(true);
     expect((clockRecord["clockIn"])!==null).toBe(true);
     expect((clockRecord["clockOut"])!==null).toBe(true);
     expect((clockRecord["date"])!==null).toBe(true);
     expect((clockRecord["employeeID"])!==null).toBe(true);
     expect((clockRecord["hoursWorked"])!==null).toBe(true);
     expect((clockRecord["name"])!==null).toBe(true);

        
       
     })
         //gets clock records with different date and employee id

     return returnDailyClockRecords(227,"1-22-22").then(result=>{
        //checks clock record to see if it has the correct
        //employee ID and date associated with it
         result.forEach(clockRecord=>{
             expect(clockRecord.employeeID).toBe(227);
             expect(clockRecord.date).toBe("1-22-22");
             expect(clockRecord.employeeID).not.toBe(188);
             expect(clockRecord.date).not.toBe("1-11-22");
     
         })
  
        })
 
    })
   
 
 });




















