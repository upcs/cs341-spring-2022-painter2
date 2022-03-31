import * as React from 'react';
import LoginContainer from './navigation/LoginContainer';
import AppContext from './navigation/Context';
import { useState } from 'react';

export default function App(){
    const [currName, setCurrName] = useState('');
    const [currEmail, setCurrEmail] = useState('');
    const [currRole, setCurrRole] = useState('');
    const [currId, setCurrId] = useState(-1);
<<<<<<< HEAD
    const [tcInfo,setTCInfo]=useState([]);
=======
    const [currLang, setCurrLang] = useState("EN");
>>>>>>> d3ca51c8c7e36a20273991e3ed4aefb89db44b62


    const userSetting = {
        currentName: currName,
        currentEmail: currEmail,
        currentRole: currRole,
        currentId: currId,
<<<<<<< HEAD
        timecardInfo: tcInfo,
=======
        currentLang: currLang,
>>>>>>> d3ca51c8c7e36a20273991e3ed4aefb89db44b62
        setCurrName,
        setCurrEmail,
        setCurrRole,
        setCurrId,
<<<<<<< HEAD
        setTCInfo
=======
        setCurrLang
>>>>>>> d3ca51c8c7e36a20273991e3ed4aefb89db44b62
    }

    return (
        <AppContext.Provider value={userSetting}>
                <LoginContainer/>
        </AppContext.Provider>
    );
}
