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
 export const getEmployeeByName =  async (nameInput) =>{
    var fetchedEmployee=await firebase.firestore()
    .collection('employees')
    .where('name','in',[nameInput])
    .get();
     var nameEmployeeArray=[];
     var nameMessage="";
    for(let i=0;i<(fetchedEmployee.docs).length;i++){
          let data= (fetchedEmployee.docs[i]).data();
          nameEmployeeArray.push(data);
          nameMessage+="\nName: "+ data.name
        +"\nemployeeID: "+data.employeeID
        +"\nemail: "+data.email
        +"\nphone number: "+data.phone
        +"\nage: "+data.age;


    }
        
         console.log(nameEmployeeArray);
         alert(nameMessage);
         return nameEmployeeArray;
      
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
        });




     }

}          
 
 export const clockOut = async(newEmployeeID,
    newClockOutTime)=>{
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
        clockOut:newClockOutTime
    })
     .then(() => {
    console.log('clock record updated!');
    });   




}



}

}      



    
export default DatabaseTesterScreen= ()=>{
//createNewEmployee("Sarita Rajan",239,"stheven@hotmail.com","504-223-3343",54);
//editEmployeeEmail(239,"rajan23@up.edu");
//displayAllEmployees();
(async () => {
    try {
     //let b= await displayAllEmployees();
      //console.log(b);
      //console.log("say hello to my little firend");
      //clockIn("David Le",227,"1-6-22","6:45");
        clockOut(227,"11:00")
     


    } catch (e) {
        // Deal with the fact the chain failed
    }
})();



//console.log(z);





   
  
        
        
           
        
return (
 
    <View style={styler.fullPage}> 
           
         

    <Text>name of employee you wanna grab </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>
    <Button title='submit'/>

    <Button title='get all employees'/>


    <Text>name of employee you want to create </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>

    <Text>ID of employee you want to create </Text>
    <TextInput style={styler.inputStyle}> </TextInput>
   
    <Text>email of employee you want to create </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>

    <Text>phone number of employee you want to create </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>

    <Text>age of employee you want to create </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>
    <Button  title='submit'/>

    <Text>ID of employee you want to update </Text>
    <TextInput  style={styler.inputStyle}> </TextInput>
   

    <Text> Email you want to update with</Text>
    <TextInput style={styler.inputStyle}> </TextInput>
    <Button  title='submit'/>




       {/*}        
       {this.state.employeeArray.map((employee,index)=>
       <View key={index}>
           <Text>{employee.name} {employee.email} {employee.phone} {employee.age}</Text>
           </View>
           )}
       */}
           
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
    




