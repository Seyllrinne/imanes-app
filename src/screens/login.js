import {View,Text,TextInput,TouchableOpacity,StatusBar,Image} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import {signIn} from '../services/users';
import BotonGoogle from '../services/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoginContainer,LoginInput,BotonEntrar,TextoBoton,BotonOlvidar,TextoOlvidar} from "../styles/login-style";
import { default as IconLogin } from '../../assets/iconLogin.png';
import { default as IconF } from '../../assets/F.png';
const Login=({navigation,route})=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);
    useEffect(()=>{
        getCredentials();
    },[]);
    const getCredentials=async()=>{
        try{
            const sesion = await AsyncStorage.getItem('@storage_Key');
            if(sesion!==null)setUserState({sesion});
        }catch(e){
            return e;
        };
    };
    const login=async()=>{
        const sesion=await signIn(name,pass);
        if(typeof(sesion)==="object")alert("Error");
        else {
            await AsyncStorage.setItem('@storage_Key', sesion);
            setUserState({sesion});
        };
    };
    return <LoginContainer>
            <StatusBar animated={true}
                backgroundColor="#fff"
                barStyle="light-content" 
                translucent={false}/>
            <Image source={IconLogin} style={{height:270,width:220}}/>
            <LoginInput onChangeText={name => setName(name)} placeholder="Email" placeholderTextColor="#EA4335" />
            <LoginInput onChangeText={pass => setPass(pass)} placeholder="Contraseña" secureTextEntry={true} placeholderTextColor="#EA4335" />
            <BotonEntrar onPress={login}><TextoBoton>Entrar</TextoBoton></BotonEntrar>
            <BotonOlvidar><TextoOlvidar>¿Has olvidado la contraseña?</TextoOlvidar></BotonOlvidar>
            <View style={{flexDirection: "row",justifyContent:"space-between", alignItems: "center"}}>
                <View style={{flex:1,alignItems:"center"}}>
                    <BotonGoogle/>
                </View>
                <View style={{flex:1,alignItems:"center"}}>
                    <TouchableOpacity
                    style={{padding:20,backgroundColor:"#D9D9D9",borderRadius:100,width:60,height:60,alignItems:"center",justifyContent:"center"}}
                        onPress={()=>alert("FACEBOOK")}
                    >
                        <Image source={IconF} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text>¿No tienes una cuenta?</Text>
            <BotonEntrar><TextoBoton>Regístrate</TextoBoton></BotonEntrar>
    </LoginContainer>;
};
export default Login;