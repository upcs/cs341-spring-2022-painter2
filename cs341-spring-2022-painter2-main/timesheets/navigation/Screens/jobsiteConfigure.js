import React, { useState,useEffect } from "react";
import { StyleSheet, Text,  View, TextInput,Button,Pressable,  TouchableHighlight, Alert, Linking} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import {getAllJobsites,addJobsite} from './databaseFunctions'
import { FlatList } from 'react-native'

export default function JobsiteConfigure(){
const [address,setAddress]=useState("");
// address:addressInp,
// customer:customerInp,
// jobName:jobNameInp,
// jobYear:year,
// jobNum: jobsites.size + 101,
// status: "Open"
const [customer,setCustomer]=useState("");
const [jobName,setJobName]=useState("");
const [jobDelete,setJobDelete]=useState("");
const [jobsiteCollection,setJobsiteCollection]=useState("");

useEffect(() => {

   getAllJobsites().then((jobsiteData) => {
      let addressArr=[];
       for(let i=0;i<jobsiteData.docs.length;i++){
          let jobRecord=(jobsiteData.docs[i]).data();
          addressArr+=  jobRecord.address+ "|"+jobRecord.customer +"|"+jobRecord.jobName+"?";   
          
       }
    
       setJobsiteCollection(addressArr);
       console.log(jobsiteCollection);

      
   });
 

    


 });

function clickHandler(){
   addJobsite(address,customer,jobName);
   setJobsiteCollection(jobsiteCollection+address+"|"+customer+"|"+jobName+"?");

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
         height: 30,
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
       <Text style={styles.jobsiteStyle}> Enter In Job Name</Text>
      <TextInput
       style={styles.inputStyle}
       onChangeText={(val)=>{ setJobName(val)}} 
       
      /> 

<Pressable onPress={()=>clickHandler()}style={styles.buttonStyle} >
      <Text >submit</Text>
    </Pressable> 
     <Text style={styles.jobsiteStyle}> Enter in Job Number to Delete</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(val)=>{ setJobDelete(val)}}
      />
<Pressable style={styles.buttonStyle} >
      <Text >submit</Text>
    </Pressable> 

    <Text style={styles.listTitle}>List of Pre-Existing Jobs in Database </Text> 
    <FlatList
    keyExtractor={(item)=>item}
   data={jobsiteCollection.split("?")}

   renderItem={({item})=>(
  <View style={styles.cellStyle}>
  <Text style={styles.rowStyle}> {item.split("|")[0]}</Text>
  <Text style={styles.rowStyle}> {item.split("|")[1]}</Text>
  <Text style={styles.rowStyle}> {item.split("|")[2]}</Text>

   </View>


   )}/>
     
  

   </View>


);


// {this.state.people.map((person, index) => (
//    <p>Hello, {person.name} from {person.country}!</p>
// ))}






}