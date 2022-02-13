import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
    
export default function TimesheetScreen() {
    const data = require("./data.json"); // in the future data wull be pulled from the database

      const Item = ({ name }) => (
        <View style={styles.item}>
          <Text styles={styles.title}>{name}</Text>
        </View>
      );
        
      const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => alert("Hours Worked: " + item.timein + " - " + item.timeout)}>
          <Item name={item.name +": " + item.date}/>
        </TouchableOpacity>
      );

        return (
          <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
          </View>
        );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000000",
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 40,
      },
    });
