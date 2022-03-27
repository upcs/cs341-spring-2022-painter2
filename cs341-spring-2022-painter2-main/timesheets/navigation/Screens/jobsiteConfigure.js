import React, { useState,useEffect } from "react";
import { StyleSheet, Text,  View, TextInput,Button,Pressable,  TouchableHighlight, Alert, Linking} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import {getAllJobsites,addJobsite,closeJobsite, openJobsite} from './databaseFunctions'
import { FlatList } from 'react-native'

export default function JobsiteConfigure(){
const [address,setAddress]=useState("");
//these are all setter fields for inputs that go into creating a new jobsite
const [customer,setCustomer]=useState("");
const [jobName,setJobName]=useState("");
const [jobDelete,setJobDelete]=useState("");
const [jobsiteCollection,setJobsiteCollection]=useState("");
const [jobOpen,setJobOpen]=useState("");


useEffect(() => {
//useeffect executes only once when page mounts
   getAllJobsites().then((jobsiteData) => {
      let addressArr=[];
       for(let i=0;i<jobsiteData.docs.length;i++){
//string of jobsite data is fetched from the database
//a string is fetched because setting an array of data causes an infinite
//loop of reads from the database
          let jobRecord=(jobsiteData.docs[i]).data();
//each  different jobsite separated by the delimiter "?", and
//each field of info from a single jobsite is separated by "|" delimiter
          addressArr+=  jobRecord.address+ "|"+jobRecord.customer +"|"+jobRecord.jobName+"|"+jobRecord.jobNum+"|"+jobRecord.status+"?";   
          
       }
    
       setJobsiteCollection(addressArr);
       console.log(jobsiteCollection);

      
   });
 

    


 },[]);
 async function reRender(){
    //reRender function does the samee thing as the code in the useeffect
    //the only difference is that the code is called everytime a button onpress event is triggered
    //so that the flatlist with jobsites gets re-rendered as the database changes
   getAllJobsites().then((jobsiteData) => {
      let addressArr=[];
       for(let i=0;i<jobsiteData.docs.length;i++){
          let jobRecord=(jobsiteData.docs[i]).data();
          addressArr+=  jobRecord.address+ "|"+jobRecord.customer +"|"+jobRecord.jobName+"|"+jobRecord.jobNum+"|"+jobRecord.status+"?";   
          
       }
       setJobsiteCollection(addressArr);
       console.log(jobsiteCollection);
      

      
   });


}
//calls add jobsite function and re-renders flatlist
async function addJobsiteHandler(inputAddress,inputCustomer,inputJobName){
   await addJobsite(inputAddress,inputCustomer,inputJobName);
   await reRender();
   

}
//calls close jobsite function and re-renders flatlist

async function closeJobsiteHandler(inputJobNum){
   await closeJobsite(inputJobNum);
   await reRender();
   

}
//calls close jobsite function and re-renders flatlist

async function openJobsiteHandler(inputSiteNum){
   await openJobsite(inputSiteNum);
   await reRender();

}





    const styles = StyleSheet.create ({
        container: {
          
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: 'white',
          
        },
       
        titleStyle:{
         fontSize: 20,
         fontWeight: "bold",
         fontFamily: "Times New Roman",
         backgroundColor: "red",
         paddingLeft:10,
         paddingRight:10,
         paddingTop:10,
         paddingBottom:10,
         marginBottom:5,
         borderWidth:5,
         borderColor:"black",
         borderRadius:20

       


      },
      jobsiteStyle:{
         fontSize: 10,
         fontWeight: "bold",
         fontFamily: "Verdana",
         backgroundColor: "rgb(151, 188, 247)",
        
         borderWidth:5,
         borderColor:"black",
         marginBottom:0,
        

      },
      inputStyle:{
         height: 40,
         width:350,
         margin: 12,
         borderWidth: 1,
         padding: 10,
       marginBottom:0
      },
      pickerStyle:{
         flex:1,
       marginTop:0,
       marginBottom:0,
       width:350,
       height:30


      },
      rowStyle:{
      borderWidth:5,
      borderColor:"red",
    

      },
      cellStyle:{
      margin:5

      },

      buttonStyle:{
      padding:5,
      borderWidth:5,
      backgroundColor:"green",
      borderRadius:10,
      marginBottom:5

      }

,
      listTitle:{
         padding:5,
         borderWidth:5,
         backgroundColor:"pink",
         fontSize:20
   
   
         },
         flatStyle:{
         height: 150,
   
         flexGrow: 0
         }

       
     })   

return(
   <View style ={styles.container}> 
 
   <Text style={styles.jobsiteStyle}> Enter In Address of Jobsite</Text>
   <TextInput
        style={styles.inputStyle}
      onChangeText={(val)=>{ setAddress(val)}} 
      />
       

   
      <Text style={styles.jobsiteStyle}> Enter In Customer of Jobsite</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(val)=>{ setCustomer(val)}} 
      
      />
       <Text style={styles.jobsiteStyle}> Enter In Jobsite Name</Text>
      <TextInput
       style={styles.inputStyle}
       onChangeText={(val)=>{ setJobName(val)}} 
       
      /> 

<Pressable onPress={()=>addJobsiteHandler(address,customer,jobName)}style={styles.buttonStyle} >
      <Text >submit</Text>
    </Pressable> 
     <Text style={styles.jobsiteStyle}> Enter in Jobsite Number to Close</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(val)=>{ setJobDelete(val)}}
      />

<Pressable onPress={()=>closeJobsiteHandler(parseInt(jobDelete))}style={styles.buttonStyle} >
      <Text >submit</Text>
    </Pressable> 




    <Text style={styles.jobsiteStyle}> Enter in Jobsite Number to Open</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(val)=>{ setJobOpen(val)}}
      />

<Pressable onPress={()=>openJobsiteHandler(parseInt(jobOpen))}style={styles.buttonStyle} >
      <Text >submit</Text>
    </Pressable> 






    <Text style={styles.listTitle}>List of Jobsites in Database </Text> 
    <FlatList
    style={styles.flatStyle}
    keyExtractor={(item)=>item}
   data={jobsiteCollection.toString().split("?")}

   renderItem={({item})=>(
  <View style={styles.cellStyle}>
  <Text style={styles.rowStyle}>Jobsite Address: {item.split("|")[0]}</Text>
  <Text style={styles.rowStyle}>Jobsite Customer: {item.split("|")[1]}</Text>
  <Text style={styles.rowStyle}>Jobsite Name:  {item.split("|")[2]}</Text>
  <Text style={styles.rowStyle}>Jobsite Number: {item.split("|")[3]}</Text>
  <Text style={styles.rowStyle}>Jobsite Status: {item.split("|")[4]}</Text>

   </View>


   )}/>
     
  

   </View>


);


// {this.state.people.map((person, index) => (
//    <p>Hello, {person.name} from {person.country}!</p>
// ))}






}