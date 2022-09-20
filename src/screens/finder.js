import {Text,FlatList,TouchableOpacity,TextInput,StatusBar,ActivityIndicator,View,Image} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import {getUsers,updateUser,getUserBySesion} from "../services/users";
import {FinderContainer,FinderLoadingContainer,Buscador} from "../styles/finder-style";
const Adder=({navigation,route})=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [users,setUsers]=useState(null);
    const [search,setSearch]=useState("");
    useEffect(()=>{
        getUserBySesion(userState.sesion).then(res=>{getUsers().then(res2=>setUsers(res2.filter(obj=>obj.id!==res.id)))});
    },[]);
    const add=async(input)=>{
        const data=await getUserBySesion(userState.sesion);
        if(data.friends===undefined)data.friends=[input];
        else{
            const P=data.friends.map(obj=>obj.id);
            if(P.indexOf(input.id)===-1)data.friends.push(input);
            else alert("Ya está añadido");
        };
        updateUser(data.id,{friends:data.friends});
    };
    const filter=()=>{
        if(search.length<1)return [];
        return users.filter(obj=>obj.name.substr(0,search.length).toLowerCase()===search.toLowerCase().slice(0,8))
    };
    if(users===null) return <FinderLoadingContainer>
        <ActivityIndicator size="large" color="#fd9b4b" />
        <Text>LOADING</Text>
    </FinderLoadingContainer>;
    return <FinderContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        <Buscador style={{
            marginHorizontal: 16,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        }} onChangeText={search=>setSearch(search)} placeholder="Username"/>
        <FlatList
            data={filter()}
            renderItem={({item})=>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                    marginHorizontal: 16,
                    marginTop: 5,
                backgroundColor: '#a1a1a1',
                padding: 10,
                borderRadius: 8
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Image source={{ uri: item.uploadedPicture }} style={{height:40,width:40,borderRadius:100, marginRight: 10}}/>
                    <Text>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={()=>{add({id:item.id,name:item.name})}}>
                    <Text>Añadir</Text>
                </TouchableOpacity>
            </View>}
            keyExtractor={item =>item.id}
        />
    </FinderContainer>
};
export default Adder;