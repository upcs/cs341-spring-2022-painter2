import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/timesheetStyle.js';



export default function DetailScreen({ route, navigation }) {
    
    const [editable, setEditable] = useState(false);
    const {name, date, timein, timeout, id } = route.params;
    return (
        <View>
                 
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {JSON.stringify(date)}{"\n"}{JSON.stringify(name)}
    
                </Text>
            </View> 
            <Button title= "Edit" style={{height:65,marginTop:15,position:"absolute"}}onPress={() => setEditable(!editable)}/>
            { editable ? 
            <TextInput value = {JSON.stringify(timein)}/> :
            <Text>{JSON.stringify(timein)} - {JSON.stringify(timeout)}</Text>}
        </View>
    )
}
