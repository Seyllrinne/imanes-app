import { useContext } from 'react';
import {TouchableOpacity,View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import Perfil from '../../screens/perfil';
import Login from '../../screens/login';
import Signup from '../../screens/signup';
import Create from '../../screens/create';
import Finder from '../../screens/finder';
import Config from '../../screens/config';
import Notification from '../../screens/notifications';
import { Entypo, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../../application/provider';
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen=()=><ProfileStack.Navigator>
    <ProfileStack.Screen 
        name="Profile" 
        component={Perfil}
        options={({ navigation }) => ({
            title: 'IMANES',
            headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Config')}>
                <View>
                    <AntDesign name="setting" size={24} color="#000" />
                </View>
            </TouchableOpacity>,
            tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        })}
    />
    <ProfileStack.Screen 
        name="Config" 
        component={Config} 
    />
</ProfileStack.Navigator>

const NavTab=()=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    if (userState.sesion === null)return <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff'
    }}>
        <Tab.Screen 
            name="LOGIN" 
            component={Login}
            options={{
                title: '',
                tabBarIcon: ({color}) => <MaterialCommunityIcons name="login" size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="SIGNUP" 
            component={Signup}
            options={{
                title:'SIGNUP',
                tabBarIcon: ({color}) => <FontAwesome name="sign-in" size={24} color={color} />
            }}
        />

    </Tab.Navigator>
    return <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel : false,
            activeTintColor: 'white',
            inactiveTintColor: 'black',
            tabBarActiveBackgroundColor: '#fff',
            tabBarInactiveBackgroundColor: '#fff'
    }}>
        <Tab.Screen 
            name="HOME" 
            component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="FINDER" 
            component={Finder}
            options={{
                title: 'IMANES',
                tabBarIcon: ({ color }) => <Entypo name="magnifying-glass" size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="CREATE" 
            component={Create}
            options={{
                title: 'IMANES',
                tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />
            }}
        />
        <Tab.Screen
            name="NOTIFICATION"
            component={Notification}
            options={{
                title: 'IMANES',
                tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={24} color={color} />
            }}
        />
        <Tab.Screen 
            name="PROFILE" 
            component={ProfileStackScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Ionicons name="ios-person-circle-outline" size={24} color={color} />
            }}
        />
    </Tab.Navigator>
};
export default NavTab;