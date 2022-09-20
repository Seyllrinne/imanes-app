import { View, Text, FlatList } from "react-native";
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../application/provider';
import { getUserById } from '../services/users';
import Seguridad from './config/seguridad';
import Privacidad from './config/privacidad';
import Ayuda from './config/ayuda';
import Info from './config/info';
import Contra from './config/contra';
import Report from './config/report';
import Politicas from './config/politicas';
import ConfigHome from './config/configHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Config=({ navigation, route }) => {
    const { user } = useContext(AppContext);
    const [userState, setUserState] = user;
    const Stack = createNativeStackNavigator();
    return <Stack.Navigator>
        <Stack.Screen name="ConfigHome" component={ConfigHome} options={{ headerShown: false }} />
        <Stack.Screen name="Privacidad" component={Privacidad} options={{ headerShown: false }} />
        <Stack.Screen name="Seguridad" component={Seguridad} options={{ headerShown: false }} />
        <Stack.Screen name="Ayuda" component={Ayuda} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
        <Stack.Screen name="Contra" component={Contra} options={{ headerShown: false }} />
        <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
        <Stack.Screen name="Politicas" component={Politicas} options={{ headerShown: false }} />
    </Stack.Navigator>;
};
export default Config;