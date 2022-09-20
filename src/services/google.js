import * as Google from 'expo-auth-session/providers/google';
import {auth} from './firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {useContext, useEffect } from 'react';
import {TouchableOpacity,Image} from "react-native";
import { createGSesion } from './users';
import {AppContext} from '../application/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as IconG } from '../../assets/G.png';
//web:984603348869-vr719vmv708q2391gup19o3a3j4uk761.apps.googleusercontent.com
//ios:984603348869-823ktvnou2g5iee9flvpig9t5iu835ij.apps.googleusercontent.com
//android:
const SignInWithGoogle=()=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {clientId: '984603348869-vr719vmv708q2391gup19o3a3j4uk761.apps.googleusercontent.com'},
    );
    useEffect(()=>{
        (async()=>{
            try{if(response?.type==='success'){
                const { id_token } = response.params;
                const credential = GoogleAuthProvider.credential(id_token);
                const result=await signInWithCredential(auth,credential);
                const sesion=await createGSesion(result.user.uid,result.user.email);
                const R=await AsyncStorage.setItem('@storage_Key', sesion);
                setUserState({sesion});
            }}catch(e){alert(e)}
        })();
    },[response]);
    return (
        <TouchableOpacity
            style={{padding: 20,backgroundColor: "#D9D9D9",borderRadius: 100,width: 60,height:60,alignItems:"center",justifyContent:"center"}}
            disabled={!request}
            title="GOOGLE LOGIN"
            onPress={() => {
                promptAsync();
            }}
        >
            <Image source={IconG} style={{height:30,width:30}}/>
        </TouchableOpacity>

    );
};
export default SignInWithGoogle;