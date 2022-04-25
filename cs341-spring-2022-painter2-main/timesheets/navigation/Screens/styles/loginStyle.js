import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#ab0e0e',
        paddingBottom: 80
    },
    forgot: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor:'#ab0e0e'
    },
    reg: {
        paddingTop: 40,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor:'#ab0e0e'
    },
    title: {
        fontSize:30,
        alignItems: 'center',
        marginBottom:5,
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
        color:'#ab0e0e',
    },
    notes: {
        color:'#FFFFFF',
        textAlign:'center',
        marginBottom: 10,
        paddingHorizontal: 30
    }
});
