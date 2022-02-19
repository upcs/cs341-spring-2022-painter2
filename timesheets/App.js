import * as React from 'react';
import react from 'react';
import { Text, View, Image, Button } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from './navigation/MainContainer';
const { URLSchemes } = AppAuth;

//creates the navigation bar

const LoginPage = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Button title="Sign in with Google"
       onPress={() => props.defaultIn()} />
          <Ionicons name={'ios-log-in'} size={50}/>
    </View>
  )
}

export default class App extends React.Component {
    
  constructor(props) {
      super(props)
      this.state = {signedIn: false, name: "", photoUrl: ""}
  }
  
  /*SIGN IN FUNCTION --Not being used-- */
  signIn = async () => {
      try {
        const result = await GoogleSignIn.signInAsync({
          iosClientId: '5699070269-c7aa7d19sd11phu97enoej9uv9gjk326.apps.googleusercontent.com',
          androidClientId: '5699070269-i41csk7jjigklrvae86mpc2gb4207ncd.apps.googleusercontent.com',
          scopes: ["profile", "email"]
        })
        if (result.type === "success") {
          this.setState({
            signedIn: true,
            name: result.user.name,
            photoUrl: result.user.photoUrl
          })
        } else {
          console.log("cancelled")
        }
  } catch (e) {
        console.log("error", e)
      }
  }
  
  /*Default Sign In*/
  defaultIn = async () => {
      this.setState({
          signedIn: true
      })
  }
  
  render() {
      return (
              <View style={{ flex: 1, justifyContent: 'center'}}>
              {this.state.signedIn ? <MainContainer/> :
                <LoginPage defaultIn={this.defaultIn}/>
              }
              </View>
      )
  }
}
