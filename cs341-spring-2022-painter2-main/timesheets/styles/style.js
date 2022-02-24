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
      padding: 20,
      borderWidth:1,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#fff'
    },
    bodyText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    timeText: {
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: 15,
    },
    body: {
      padding: 15,
      borderWidth:1,
    }
  });