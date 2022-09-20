import {View,Text,FlatList,TextInput,TouchableOpacity,StatusBar,ActivityIndicator} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import Picker from '../components/picker';
import {updateUser,getUserBySesion} from '../services/users';
import {getPlanByCreatorId,deletePlanById} from '../services/plans';
import {Ionicons} from '@expo/vector-icons';
import {ProfileContainer,Title,ProfileImageContainer,ProfileImage,Edit} from '../styles/profile-style';
const Perfil=({navigation,route})=>{
    const {user,event}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [eventState,setEventState]=event;
    ///////////////////////////////////////////////
    const [newName,setNewName]=useState(null);
    const [description,setDescription]=useState(null);
    const [image,setImage]=useState(null);
    const [friends,setFriends]=useState([]);
    ////////////////////////////////////
    const [plans,setPlans]=useState([]);
    useEffect(()=>{
        getUserBySesion(userState.sesion)
            .then(res=>{setFriends(res.friends);setImage(res.uploadedPicture);getPlanByCreatorId(res.id)
                .then(res2=>setPlans(res2))});
    },[eventState]);
    const eraseFriend=async input=>{
        const S=await getUserBySesion(userState.sesion);
        const P=friends.map(obj=>obj.id).indexOf(input);
        friends.splice(P,1);
        updateUser(S.id,{friends});
        setEventState(!eventState);
    };
    const editar=async()=>{
        const S=await getUserBySesion(userState.sesion);
        updateUser(S.id,{name:newName});
        setEventState(!eventState);
    };
    const erasePlan=input=>{
        deletePlanById(input);
        setEventState(!eventState);
    }
    return <ProfileContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content" 
            translucent={false}/>
        <Title>PERFIL</Title>
        <ProfileImageContainer>
            {(image===null)?<Text><ActivityIndicator/>LOADING</Text>:<ProfileImage source={{uri:image}}/>}
        </ProfileImageContainer>
        <Picker/>
        <Edit>
            <Ionicons name="person-outline" size={24} color="#fd9b4b" style={{ flex: 1 }} />
            <View style={{ flex: 3 }}>
                <Text>Nombre</Text>
                <TextInput onChangeText={text=>{setNewName(text)}} placeholder={userState.name} />
            </View>
            <TouchableOpacity onPress={() => editar()} style={{ flex: 1 }}><Text>Editar</Text></TouchableOpacity>
        </Edit>
        <Text>My Friends:</Text>
        <FlatList
            data={friends}
            renderItem={({item})=><Text>{item.name} 
                Bloquear 
                <TouchableOpacity onPress={()=>eraseFriend(item.id)}>
                    <Text>Eliminar</Text>
                </TouchableOpacity>
            </Text>}
            keyExtractor={item=>item.id}
            ListEmptyComponent={()=><Text>No se econtraron datos</Text>}
        />
        <Text>My Plans:</Text>
        <FlatList
            data={plans}
            renderItem={({ item }) => <Text>{item.name}
                <TouchableOpacity onPress={()=>erasePlan(item.id)}>
                    <Text>Eliminar</Text>
                </TouchableOpacity>
            </Text>}
            keyExtractor={item => item.id}
            ListEmptyComponent={()=><Text>No se econtraron datos</Text>}
        />
        <Text>Valoraciones</Text>
        <Text>Editar Perfil</Text>
    </ProfileContainer>}
export default Perfil;