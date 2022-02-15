import React from 'react';
import renderer from 'react-test-renderer';
import TimesheetScreen from '../navigation/Screens/timesheets'

test('Timesheets screen renders correctly', () => {
    const timesheets = renderer.create(<TimesheetScreen/>).toJSON;
    expect(timesheets).toMatchSnapshot
})
