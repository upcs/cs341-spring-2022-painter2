import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../navigation/Screens/homescreen';

test('HomeScreen renders correctly', () => {
    const homescreen = renderer.create(<HomeScreen/>).toJSON;
    expect(homescreen).toMatchSnapshot
})
