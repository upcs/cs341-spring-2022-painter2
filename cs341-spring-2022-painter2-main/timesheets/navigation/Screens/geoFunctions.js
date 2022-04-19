
import * as Location from 'expo-location';

//function gets your current latitude and longitude coordinates
      export async function getOurCoords(){
        //requests permission to use location services
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        //checks if location services are enabled

        let locationServiceEnabled = await Location.hasServicesEnabledAsync();
        
          if (!locationServiceEnabled) {
        
            Alert.alert("Your Location services are turned off. Turn them on Please");
            return;
          }
        //gets current coordinates as JSON object
      let coords = await Location.getCurrentPositionAsync({});
      console.log("Latitude is: "+coords.coords.latitude)
      console.log("Longitude is: "+coords.coords.longitude)
     // 45.41567513430611, -122.74994738832297 
     let arrCoord=[];
     //pushes latitude and longitude extracted from JSON object into an array
     //this array is then returned by the function
     arrCoord.push(coords.coords.latitude);
     arrCoord.push(coords.coords.longitude);
     return arrCoord;

    }
//function gets your distance from given coordinates
    export  function getDistFromSite(siteLat,siteLong,yourLat,yourLong){
      //gets permission from device to use location services
    
  
      
  // 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(long2 – long1)]
  //all these constants go into out formula for calculating distance in miles
     
    //we convert latitude and longitude from units of degrees to units
    //of radians

      let xRad1=(siteLat/180)*Math.PI;
      let xRad2=(yourLat/180)*Math.PI;
      let yRad1=(siteLong/180)*Math.PI;
      let yRad2=(yourLong/180)*Math.PI;
//plug in values into trigonometric formula for global distance
      let productOfSines=Math.sin(xRad1)*Math.sin(xRad2);
      let productOfCosines=Math.cos(xRad1)*Math.cos(xRad2)*Math.cos(yRad2-yRad1);
      let distance=3963.00*Math.acos(productOfSines+productOfCosines);
       console.log("Your distance from the site is: "+distance+" miles");
       //function returns distance
       return distance;
      
  
      }
//function gets the street address of latitude and longitude coordinates
  export async function getStreetAddress(inputLat,inputLong){
    //asks device for permission to use location
    let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permission to access location was denied');
  return;
}
//checks to see if location services are enabled
let locationServiceEnabled = await Location.hasServicesEnabledAsync();

  if (!locationServiceEnabled) {

    Alert.alert("Your Location services are turned off. Turn them on Please");
    return;
  }
  //this reverse geoCode takes latitude and longitude coordinates
  //and outputs a physical address
    let coordCollection = await Location.reverseGeocodeAsync({
      latitude:inputLat,
      longitude:inputLong
    });

let streetInfo="";
let cityName=""
let stateName="";
let zipCode="";
//the fields like street info and zipCode are collected from the 
//returned JSON object of the street address
coordCollection.forEach(record=>{
  streetInfo=record.name;
  cityName=record.city;
  stateName=record.region;
  zipCode=record.postalCode;
});
let streetAddress=streetInfo+" "+cityName+" "+stateName+" "+zipCode;
console.log("The street Address is :" +streetAddress);
//string containing address is returned
return streetAddress;
  }
   

 //function gets the coordinates from a street address string 
  export async function getCoordFromAddress(inputStreetLocation){
    //permission to access location is requested for device
    let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permission to access location was denied');
  return;
}
//checks if location services are enabled
let locationServiceEnabled = await Location.hasServicesEnabledAsync();

  if (!locationServiceEnabled) {

    Alert.alert("Your Location services are turned off. Turn them on Please");
    return;
  }
  
  //geoCodeAsync converts address string into coordinates
    let extractedCoord = await Location.geocodeAsync(inputStreetLocation);
    let extractedLatitude=0;
    let extractedLongitude=0;
    //coordinates are extracted from returned json object
    extractedCoord.forEach(each=>{
      extractedLatitude=each.latitude;
      extractedLongitude=each.longitude;
    });

    let extractedCoordArray=[extractedLatitude,extractedLongitude];
    //array of latitude and longitude are returned 
    console.log("lat : "+extractedLatitude+" long: "+extractedLongitude);
    return extractedCoordArray;
  


  }