import * as React from 'react';
import LoginContainer from './navigation/LoginContainer';
import AppContext from './navigation/Context';
import { useState } from 'react';

export default function App(){
    const [currName, setCurrName] = useState('');
    const [currEmail, setCurrEmail] = useState('');
    const [currRole, setCurrRole] = useState('');
    const [currId, setCurrId] = useState(-1);
    const [tcInfo,setTCInfo]=useState([]);


    const userSetting = {
        currentName: currName,
        currentEmail: currEmail,
        currentRole: currRole,
        currentId: currId,
        timecardInfo: tcInfo,
        setCurrName,
        setCurrEmail,
        setCurrRole,
        setCurrId,
        setTCInfo
    }

    return (
        <AppContext.Provider value={userSetting}>
                <LoginContainer/>
        </AppContext.Provider>
    );
}
