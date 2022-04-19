import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    header: {
      backgroundColor: '#ab0e0e',
      alignItems: 'center',
      padding: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#fff'
    },
    bodyText: {
      fontWeight: 'bold',
      fontSize: 15,
        flex: 1
    },
    timeText: {
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: 15,
    },
    body: {
      padding: 15,
      borderWidth:1,
    },
    searchBackground: {
      backgroundColor: '#ffffff',
      fontSize: 15,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000000'   
    },
    alertText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ab0e0e'
    },
listBody: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0
},
conStyle: {
    padding: 0,
    margin: 0
},
listText: {
    fontWeight: 'bold',
  fontSize: 25,
    color: '#ab0e0e',
    textShadowRadius: 1,
    textShadowColor: '#000000',
textShadowOffset: {width: 1, height: 1}
},

inputLineIcon: {
    marginLeft: 15,
    color:'#ab0e0e',
},
searchBarContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    height:40,
    flexDirection: 'row',
    alignItems:'center'
},
searchBar: {
    marginLeft:5,
    flex:1,
},
timeText1: {
    fontSize:16,
    fontWeight:'bold',
    color:'#ab0e0e'
},
timeText2: {
    fontSize:16,
    fontStyle:'italic',
    fontWeight:'normal',
    color:'#000'
}
    
  });
