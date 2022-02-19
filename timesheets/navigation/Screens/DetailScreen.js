import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/timesheetStyle.js';



export default function DetailScreen() {
    
    return (
        <View>
            <TouchableOpacity style={styles2.container} onPress={() => alert("editing")}>
                <Ionicons name= "create-outline" size={40}/>
            </TouchableOpacity>
           
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    2/18/2022{"\n"}Phi Nguyen 
                    {"\n"}Editing
                </Text>
            </View> 
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: -5,
      position: 'absolute',
      zIndex: 1,
    }
  
  })