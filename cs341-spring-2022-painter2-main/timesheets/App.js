import * as React from 'react';
import AppContext from './navigation/Context';
import { useState } from 'react';
import MainContainer from './navigation/MainContainer';

export default function App(){
    const [currName, setCurrName] = useState('');
    const [currEmail, setCurrEmail] = useState('');
    const [currRole, setCurrRole] = useState('');
    const [currId, setCurrId] = useState(-1);
    const [tcInfo,setTCInfo]=useState([]);
    const [currLang, setCurrLang] = useState("EN");


    const userSetting = {
        currentName: currName,
        currentEmail: currEmail,
        currentRole: currRole,
        currentId: currId,
        timecardInfo: tcInfo,
        currentLang: currLang,
        setCurrName,
        setCurrEmail,
        setCurrRole,
        setCurrId,
        setTCInfo,
        setCurrLang
    }

    return (
        <AppContext.Provider value={userSetting}>
                <MainContainer/>
        </AppContext.Provider>
    );
}
