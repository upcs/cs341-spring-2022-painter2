import * as React from 'react';
import { Text, View} from 'react-native';
    
export default function HomeScreen({ navigation}) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => alert('This is the HomeScreen')}>Timesheets Page</Text>
      </View>
    )
}

