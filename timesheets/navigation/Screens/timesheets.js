import * as React from 'react';
import { Text, View} from 'react-native';
    
export default function TimesheetScreen({ navigation}) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={() => navigation.navigate('Home')}>Timesheets Page</Text>
          </View>
        )
    }

