import React, { useState,useEffect } from "react";
import { StyleSheet, Text,  View, TextInput,Button,Pressable,  TouchableHighlight, Alert, Linking, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import tstyles from './styles/timesheetStyle.js';
import {getAllJobsites,addJobsite,closeJobsite, openJobsite} from './databaseFunctions'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

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
       //console.log("Jobsite: jobs-",jobsiteCollection);

      
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
       //console.log(jobsiteCollection);
      

      
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
            flex:1,
            justifyContent: 'flex-start',
           justifyContent: 'center',
           backgroundColor: 'white',
          
        },
       
        titleStyle:{
         fontSize: 20,
         fontWeight: "bold",
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
         fontSize: 20,
         fontWeight: "bold",
          textAlign: 'center',
          margin: 1
      },
      inputStyle:{
         height: 30,
         width:350,
         margin: 3,
         borderWidth: 1,
          borderColor: '#ab0e0e',
          borderRadius: 5,
         padding: 5,
          alignSelf: 'center'
      },
      pickerStyle:{
         flex:1,
       marginTop:0,
       marginBottom:0,
       width:350,
       height:30
      },
      rowTitleStyle:{
        color:'#ab0e0e',
          fontWeight: 'bold',
          fontSize:25,
          padding: 2,
      textShadowRadius: 1,
      textShadowColor: '#000000',
      textShadowOffset: {width: 1, height: 1}
      },
    rowStyle:{
        fontWeight: 'bold',
        padding: 4
    },
      cellStyle:{
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
          alignItems: 'center',
      },
      buttonStyle:{
      padding:5,
      backgroundColor:"#ab0e0e",
          color:'#FFFFFF',
      borderRadius:5,
      margin:10,
          alignSelf: 'center'
      },
    listBody: {
        alignItems: 'flex-end',
    },
    header: {
      backgroundColor: '#ab0e0e',
      alignItems: 'center',
      padding: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#fff',
    },
})
//this onclick listener calls the open jobsite functions and alerts 
//the user to confirm the opening and closing action
    const onClickListener = (siteID, what) => {
        if (what == "open"){
            openJobsiteHandler(siteID);
        } else {
            closeJobsiteHandler(siteID);
        }
        return;
    }
    //opens or closes this jobsite and calls the onclick listener to do this
    const changeSite = async(siteID, what) => {
        Alert.alert('Confirm', 'Open/Close this job?', [{
                text: 'Cancel',
                onPress: () => reRender(),
                style: 'cancel',
        }, { text: 'OK', onPress: () => onClickListener(siteID, what) },]);
    }
// refreshes page
    async function refreshFunction(){
      await reRender();


    }
    
return(
   <View style={styles.container}> 

           
          {/* refresh button */}
            <View style={{padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 0
                }}>
             
                <TouchableOpacity
                  style={{alignItems:"center", marginLeft: 5}}
                  onPress={()=> {
                   refreshFunction();
                  }}
                >
                <Ionicons name={'ios-refresh-circle'} size={50} style={{color:'#ab0e0e'}}/>
                </TouchableOpacity>
              </View>




           


       <View style={styles.header}>
         <Text style={styles.headerText}>Jobsites</Text>
       </View>
       {/* this flatlist renders an interactive menu
        of all jobsites from which you can edit and delete */}
    <FlatList
    keyExtractor={(item)=>item.split("|")[3]}
   data={jobsiteCollection.toString().split("?")}

   renderItem={({item})=>
       (
        item.length <= 0? null:(
        <View style={{borderBottomWidth: 2, padding:3}}>
        <View style={styles.cellStyle}>
            <View style={{justifyContent: "flex-start"}}>
                <Text style={styles.rowTitleStyle}>{item.split("|")[2]}</Text>
        <Text style={{padding: 4,fontSize:18}}>{item.split("|")[1]}</Text>
            </View>
            <View style={styles.listBody}>
                                {item.split("|")[4] == 'Open'?
                                    (<Ionicons name={'ios-checkmark-circle'} 
                                    size={40} style={{color:'#00A000'}}/>):
                                    (
                                    <Ionicons name={'ios-close-circle'} 
                                    size={40} style={{color:'#ab0e0e'}}/>)}
        <Text style={{padding:4,textAlign:'right'}}>#{item.split("|")[3]}</Text>
            </View>
        </View>
        <Text style={styles.rowStyle}>{item.split("|")[0]}</Text>
            </View>)
   )}/>
     
  

   </View>


);







}
