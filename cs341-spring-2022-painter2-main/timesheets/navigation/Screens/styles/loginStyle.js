import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#A00000'
    },
    title: {
        fontSize:40,
        alignItems: 'center',
        marginBottom:20,
        color:'#FFFFFF',
    },
    touchable: {
        fontSize: 20,
        color:'#FFFFFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        borderBottomWidth: 1,
        width:300,
        height:60,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:5,
        borderColor: '#FF0000',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        width:250,
        borderRadius:0,
      },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginText: {
        color: 'white',
      },
    inputLineIcon: {
        marginLeft: 5,
        color:'#A00000',
    },
    notes: {
        color:'#FFFFFF',
        textAlign:'center',
        marginBottom: 25,
        paddingHorizontal: 30
    }
});
