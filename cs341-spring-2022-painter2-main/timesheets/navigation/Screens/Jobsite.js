import * as React from 'react';
import { Text,View,StyleSheet } from 'react-native';

export default function JobSite(){



    return(
        <View styles={styles.container}>
            <Text style={styles.textStyle}>Jobsite</Text>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
        //alignItems: "center",
        //justifyContent: 'center',
        },
textStyle: {
    textAlign: 'center',
    backgroundColor: "#ab0e0e",
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: 25,
    borderWidth: 1,
    borderColor: "black",
    color: '#fff',


}


});