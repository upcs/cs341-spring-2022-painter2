import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput,Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
class App extends Component{

    state = {
       
        employeeArray:[],
        message:"",
        //ID of fetched document
        docID:"",
        //id param that is used to fetch record
        getByID:"",
        //name param used to fetch record
        getByName:"",
        //all these 5 params below are used to create a new employee and write
        //that employee to the database
        createEmployeeID:"",
        createEmployeeName:"",
        createEmployeeEmail:"",
        createEmployeePhone:"",
        createEmployeeAge:0,

        //the two params below are used to update an employee record with a new email address
        changeEmployeeID:"",
        changeEmployeeEmail:""


    }
    //constructor method
    constructor(props){
        super(props);
    }





    //gets document from database based on document ID
    getEmployeeByID = async () => {
        const matchingByID= await firestore().collection("employees").doc('abc').get();
        let messageThree=matchingByID.age;
        console.log(messageThree);

    }
    //creates new employee record based on given information inputs
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
//edits email field of record in the database
    editEmployeeEmailHelper= async(docIDInput,emailInput)=>{
     console.log(docIDInput);
        firestore()
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
    editEmployeeEmail =  async (IDInput,emailInput) =>{
       
        firestore()
        .collection('employees')
        .where('employeeID','==',IDInput)
        .get()
        .then(querySnapshot => {
            firstDocument=querySnapshot.docs[0];
            //the document id of the corresponding document is retreived
            //this doc id is fed into helper function, that takes
            //document ID as a parameter
            //helper function essentially handles the editing part
            this.editEmployeeEmailHelper(firstDocument.id,emailInput);


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
    displayAllEmployees = async () =>{
        firestore()
        .collection('employees')
        .get()
        .then(querySnapshot => {
            //prints total number of employees
            console.log('Total Employees: ', querySnapshot.size);
            let array=[];
            let message="";
             
            querySnapshot.forEach(documentSnapshot => {
             
              var docData=documentSnapshot.data();
              array.push(docData);
              //message string appended with values of document to later
              //be sent to the screen as an alert message
              message=message+"\n Name : "+docData.name
              +"\n EmployeeID : "+docData.employeeID
              +"\n Email : "+docData.email
              +"\n Phone : "+docData.phone
              +" Age : "+docData.age;  
         

       

          });
          //sets class variable to array of employees retreived from query
          this.setState({employeeArray:array});
          //alerts all employees information to screen
          Alert.alert(message);
         });
        }
//gets employee record based on input paramter for name
         getEmployeeByName = async (nameInput) =>{
            console.log("in am n getByEmployeeName");
            firestore()
            .collection('employees')
            .where('name','in',[nameInput])
            .get()
            .then(querySnapshot => {
                let arrayTwo=[];
                let messageTwo="";
//for each loops through all matching employee documents
                querySnapshot.forEach(documentSnapshot => {
                  var docData=documentSnapshot.data();
                  arrayTwo.push(docData);
//message string is appended with all fields from retreived document
                  messageTwo=messageTwo+"\n Name : "+docData.name
                  +"\n EmployeeID : "+docData.employeeID
                  +"\n Email : "+docData.email
                  +"\n Phone : "+docData.phone
                  +" Age : "+docData.age;            
   
                });
//employee information alerted to screen
                Alert.alert(messageTwo);
//class variable with array of queried employee information
//this class variable is reset with the most recent query
                this.setState({employeeArray:arrayTwo});
              });
             }

            /* this.getEmployeeByID();
             this.displayAllEmployees();
             this.getEmployeeByName("william riley");
             this.createNewEmployee("phi nguyen",256,"phirocks@gmail.com","503-435-3321",19);
             this.editEmployeeEmail(256,"philikesbaking@yahoo.com");*/
   

    render(){
       
        return(
       
           
            <View style={styler.fullPage}> 
           
         

            <Text>name of employee you wanna grab </Text>
            <TextInput onChangeText={(val)=>this.setState({getByName:val})} style={styler.inputStyle}> </TextInput>
            <Button onPress={()=>this.getEmployeeByName(this.state.getByName)}title='submit'/>

            <Button onPress={()=>this.displayAllEmployees()}title='get all employees'/>


            <Text>name of employee you want to create </Text>
            <TextInput onChangeText={(val)=>this.setState({createEmployeeName:val})} style={styler.inputStyle}> </TextInput>

            <Text>ID of employee you want to create </Text>
            <TextInput onChangeText={(val)=>this.setState({createEmployeeID:val})} style={styler.inputStyle}> </TextInput>
           
            <Text>email of employee you want to create </Text>
            <TextInput onChangeText={(val)=>this.setState({createEmployeeEmail:val})} style={styler.inputStyle}> </TextInput>

            <Text>phone number of employee you want to create </Text>
            <TextInput onChangeText={(val)=>this.setState({createEmployeePhone:val})} style={styler.inputStyle}> </TextInput>

            <Text>age of employee you want to create </Text>
            <TextInput onChangeText={(val)=>this.setState({createEmployeeAge:val})} style={styler.inputStyle}> </TextInput>
            <Button onPress={()=>this.createNewEmployee(this.state.createEmployeeName,this.state.createEmployeeID,this.state.createEmployeeEmail,this.state.createEmployeePhone,this.state.createEmployeeAge)} title='submit'/>

            <Text>ID of employee you want to update </Text>
            <TextInput onChangeText={(val)=>this.setState({changeEmployeeID:val})} style={styler.inputStyle}> </TextInput>
           

            <Text> Email you want to update with</Text>
            <TextInput onChangeText={(val)=>this.setState({changeEmployeeEmail:val})} style={styler.inputStyle}> </TextInput>
            <Button onPress={()=>this.editEmployeeEmail(this.state.changeEmployeeID,this.state.changeEmployeeEmail)} title='submit'/>




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
   




export default App;