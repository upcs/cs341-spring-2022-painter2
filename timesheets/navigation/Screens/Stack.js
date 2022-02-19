import { createStackNavigator } from '@react-navigation/stack';
import TimesheetScreen from './timesheets';
import DetailScreen from './DetailScreen';
import styles from './styles/timesheetStyle.js';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen  name="TimesheetScreen" component={TimesheetScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}