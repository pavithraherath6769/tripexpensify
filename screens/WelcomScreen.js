/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../config/firebase'

// Somewhere in your code

// GoogleSignin.configure({
//   webClientId: '1087326471215-v45mh3q8d2j696nuc7k3ukue54ua2obd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  
// });

GoogleSignin.configure({
  webClientId: '713681478913-tvd14diqkvu8ujnf2s5u20g9a602olt4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  
});


export default function WelcomScreen() {
    const navigation = useNavigation();

    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();
        const googleCredentials = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, googleCredentials);
      } catch (error) {
        console.log('got error: ',error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
            <Image source={require('../assets/images/welcome.gif')} className="h-96 w-96 shadow" />
        </View>
        <View className="mx-5 mb-20">
            <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}> Trip Expensify</Text>
            
            <TouchableOpacity onPress={()=> navigation.navigate('SignIn')} className="shadow p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                <Text className="text-center text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} className="shadow p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> signIn()} className="shadow p-3 rounded-full bg-white" >
              <View className="flex-row justify-center items-center space-x-3">
                <Image source={require('../assets/images/googleIcon.png')} className="h-8 w-8" />
                <Text className="text-center text-gray-600 text-lg font-bold">Sign In with Google</Text>
              </View>
                
            </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}