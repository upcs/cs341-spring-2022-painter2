import * as React from 'react';
import { Text, View, StyleSheet, StatusBar} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
    
export default function TimesheetScreen({ navigation}) {
    const data = require("./data.json");

      const Item = ({ name }) => (
        <View style={styles.item}>
          <Text styles={styles.title}>{name}</Text>
        </View>
      );
        
      const renderItem = ({ item }) => (
        <Item name={item.name +": " + item.date}/>
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
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
    });