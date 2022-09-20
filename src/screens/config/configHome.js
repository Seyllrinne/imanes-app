import { View, Button,StatusBar } from "react-native";
import {useContext} from 'react';
import { AppContext } from '../../application/provider';
import { logout } from "../../services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ConfigNav=({ navigation, route }) =>{ 
    const { user, event } = useContext(AppContext);
    const [userState, setUserState] = user;
    const cerrarSesion=async()=>{
        logout();
        const P=await AsyncStorage.setItem('@storage_Key',"")
        setUserState({sesion:null});
    }
    return <View>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        <Button
            title="Privacidad"
            onPress={()=>navigation.navigate('Privacidad')}
        />
        <Button
            title="Seguridad"
            onPress={()=>navigation.navigate('Seguridad')}
        />
        <Button
            title="Ayuda"
            onPress={() => navigation.navigate('Ayuda')}
        />
        <Button
            title="Información"
            onPress={() => navigation.navigate('Info')}
        />
        <Button
            title="Eliminar Cuenta"
            onPress={() => alert("Eliminar Cuenta")}
        />
        <Button
            title="Cambiar Contraseña"
            onPress={() => navigation.navigate('Contra')}
        />
        <Button
            title="Reportar un Problema"
            onPress={() => navigation.navigate('Report')}
        />
        <Button
            title="Políticas de Privacidad"
            onPress={() => navigation.navigate('Politicas')}
        />
        <Button
            title="Cerrar Sesión"
            onPress={()=>cerrarSesion()}
        />
    </View>
};
export default ConfigNav;