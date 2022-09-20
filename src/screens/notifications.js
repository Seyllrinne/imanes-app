import {useState,useEffect} from "react";
import {View,Text,StatusBar,TextInput,Button,FlatList,TouchableOpacity} from "react-native";
import {useContext} from 'react';
import {AppContext} from '../application/provider';
import {getUserBySesion} from '../services/users';
import {createMessage,getMessageByReId} from "../services/messages";
const Notifications=({navigation,route})=>{
    const {user,event}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [eventState,setEventState]=event;
    /////////////////////////////////////////////
    const [message,setMessage]=useState("");
    const [messages,setMessages]=useState([]);
    const [friends,setFriends]=useState([]);
    const [receptor,setReceptor]=useState(null);
    ////////////////////////////////////////////
    useEffect(()=>{
        getUserBySesion(userState.sesion).then(res=>{setFriends(res.friends);getMessageByReId(res.id).then(res2=>setMessages(res2))});
    },[]);
    const send=async()=>{
        const DATA=await getUserBySesion(userState.sesion);
        if(receptor!==null&&message!=="")createMessage({receptor,message,emisor:{id:DATA.id,name:DATA.name}});
        else alert("Error, el mensaje no se ha podido enviar.");
    };
    return <View>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        {(messages.length>0)?<FlatList
            data={messages}
            renderItem={({item})=><Text>De {item.emisor.name}: {item.message}</Text>}
            keyExtractor={item=>item.id}
        />:<Text>No tienes notificaciones actualmente.</Text>}
        <FlatList
            data={friends}
            renderItem={({item}) => <Text>{item.name}
                <TouchableOpacity onPress={()=>{setReceptor(item.id)}}>
                    <Text>+</Text>
                </TouchableOpacity>
            </Text>}
            keyExtractor={item =>item.id}
        />
        <TextInput onChangeText={e=>setMessage(e)} placeholder="Message"/>
        <Button title="ENVIAR" onPress={send}/>
    </View>
};
export default Notifications;