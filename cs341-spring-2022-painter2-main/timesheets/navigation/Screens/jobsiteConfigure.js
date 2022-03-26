import React, { useState } from "react";
import { StyleSheet, Text,  View, TextInput,  TouchableHighlight, Alert, Linking} from 'react-native';
import {Picker} from '@react-native-picker/picker'


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
const [jobYear,setJobYear]=useState(0);










    const styles = StyleSheet.create ({
        container: {
          
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: 'white',
          
        },
       
        titleStyle:{
         fontSize: 30,
         fontWeight: "bold",
         fontFamily: "Times New Roman",
         backgroundColor: "red",
         paddingLeft:10,
         paddingRight:10,
         paddingTop:10,
         paddingBottom:10,
         marginBottom:10,
         borderWidth:5,
         borderColor:"black",
         borderRadius:20

       


      },
      jobsiteStyle:{
         fontSize: 20,
         fontWeight: "bold",
         fontFamily: "Verdana",
         backgroundColor: "rgb(151, 188, 247)",
         paddingLeft:5,
         paddingRight:5,
         paddingTop:5,
         paddingBottom:5,
         borderWidth:5,
         borderColor:"black",
         marginBottom:20,
         borderRadius:20

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

      }
       
     })   

return(
   <View style ={styles.container}> 
   <Text style={styles.titleStyle}> Jobsite Configure Page</Text>
   <Text style={styles.jobsiteStyle}> Enter In Address of Jobsite</Text>
   <TextInput
        style={styles.inputStyle}
        defaultValue={address}
       
      />
   <Picker

       style={styles.pickerStyle}
       mode={"dialog"}
        selectedValue={address}
        onValueChange={(itemValue, itemIndex) =>  setAddress(itemValue)}>

        <Picker.Item label="hello" value="hello" />
        <Picker.Item label="world" value="world" />
      </Picker>


     
  

   </View>


);









}