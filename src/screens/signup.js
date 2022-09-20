import { View, Text,StatusBar,TextInput,TouchableOpacity } from "react-native";
import { useState, useContext } from 'react';
import { AppContext } from '../application/provider';
import {signUp} from '../services/users';
import {schedulePushNotification} from '../components/push';
import { SignUpContainer } from "../styles/signup-style";
const SignUp=({ navigation, route }) => {
    const [name,setName]=useState(null);
    const [pass,setPass]=useState(null);
    const funcion=async()=>{
        const P=await signUp(name,pass);
        if(typeof(P)==="object")alert(P.message);
        else alert("Usuario Creado con Éxito");
    }
    return <SignUpContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        <TextInput onChangeText={name => setName(name)} placeholder="Username" />
        <TextInput onChangeText={pass => setPass(pass)} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity onPress={()=>funcion()}><Text>Create User</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>schedulePushNotification()}><Text >Enviar Notifiacion</Text></TouchableOpacity>
    </SignUpContainer>
};
export default SignUp;