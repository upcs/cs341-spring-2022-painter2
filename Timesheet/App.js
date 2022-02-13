import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
import firestore from "@react-native-firebase/firestore";
 

class App extends Component{
    state = {
        employeeArray:[],
        message:""


    }

    constructor(props){
        super(props);
        //this.getEmployeeByID();
        //this.displayAllEmployees();
        //this.getEmployeeByName("william riley");
        this.createNewEmployee("edwin hubble",143,"hubbleRocks@gmail.com","503-445-3321",48);

        

    }






    getEmployeeByID = async () => {
        const matchingByID= await firestore().collection("employees").doc('abc').get();
        console.log(matchingByID);

    }
    createNewEmployee= async (nameInput,employeeIDInput,emailInput,phoneInput,ageInput) => {
    firestore()
    .collection("employees")
    .add({
    name:nameInput,
    employeeID:employeeIDInput,
    email:emailInput,
    phone:phoneInput,
    age:ageInput    
    });

    }



    displayAllEmployees = async () =>{
        console.log("in am n getByEmployeeName");
        firestore()
        .collection('employees')
        .get()
        .then(querySnapshot => {
            console.log('Total Employees: ', querySnapshot.size);
            let array=[];
            let message="";

            querySnapshot.forEach(documentSnapshot => {
              console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              
              var docData=documentSnapshot.data();
              array.push(docData);
              message=message+"\n Name : "+docData.name
              +"\n Email : "+docData.email
              +"\n Phone : "+docData.phone
              +" Age : "+docData.age;   
          

        
            this.setState({employeeArray:array});

          });
          alert(message);
         });
        }

         getEmployeeByName = async (nameInput) =>{
            console.log("in am n getByEmployeeName");
            firestore()
            .collection('employees')
            .where('name','in',[nameInput])
            .get()
            .then(querySnapshot => {
                console.log('Total Employees: ', querySnapshot.size);
                let arrayTwo=[];
                let messageTwo="";
                querySnapshot.forEach(documentSnapshot => {
                  console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                  var docData=documentSnapshot.data();
                  arrayTwo.push(docData);

                  messageTwo=messageTwo+"\n Name : "+docData.name
                  +"\n Email : "+docData.email
                  +"\n Phone : "+docData.phone
                  +" Age : "+docData.age;             
    
                });
                Alert.alert(messageTwo);
                this.setState({employeeArray:arrayTwo});
              });
             }

    
    

    render(){
        return(
            <View style={styler.fullPage}>            
               {this.state.employeeArray.map((employee,index)=>
               <View key={index}>
                   <Text>{employee.name} {employee.email} {employee.phone} {employee.age}</Text>
                   </View>
                   )}
            </View>
        );




    }

}

const styler = StyleSheet.create({
    fullPage:{
    flex:1,
    backgroundColor:'#cdf',
    alignItems:'center',
    justifyContent:'center'
    
    },
    inputStyle:{
    borderWidth:1,
    borderColor:'#777',
    padding:8,
    margin: 10,
    width:200,
    
    
    }
    
    
    });
    




export default App;
