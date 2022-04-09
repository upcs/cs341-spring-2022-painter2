import qs from 'qs'
import { Linking } from 'react-native'

export async function sendEmail(to,subject,body) {
    
    let url = `mailto:${to}`;

    const query = qs.stringify({
        subject: subject,
        body: body,
    });

    if(query.length){
        url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);

    if(!canOpen) {
        throw new Error('Provided url can not be handled');
    }

    return Linking.openURL(url);

}