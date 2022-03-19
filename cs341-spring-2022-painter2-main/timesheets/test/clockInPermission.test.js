
import React from 'react';
import HomeScreen from '../navigation/Screens/homescreen';

const timeCheck = require('../navigation/Screens/homescreen')
test("Clocking in should set clock out", ()=>{
    expect(timeCheck(13,0).toBe("1:00pm"))
})