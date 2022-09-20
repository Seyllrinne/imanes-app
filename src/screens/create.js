import {useState,useContext,useEffect} from 'react';
import {View,Text,FlatList,TouchableOpacity,TextInput,StatusBar,ActivityIndicator} from "react-native";
import {AppContext} from '../application/provider';
import * as Location from 'expo-location';
import {Picker} from '@react-native-picker/picker';
import {createPlan} from '../services/plans';
import {getUserBySesion} from '../services/users';
import {CreateLoadingContainer,CreateContainer} from "../styles/create-style";
const Finder=({navigation,route})=>{
    const {user,event}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [eventState,setEventState]=event;
    //////////////////////////////////////////////
    const [data,setData]=useState({});
    const [friends, setFriends] = useState([]);
    //Geolocalización
    const [geo, setGeo] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    ////////////////////////////////////////////
    //Crear Evento
    const [name, setName] = useState(null);
    const [description, setDescription] = useState("No description");
    const [guests, setGuests] = useState([]);
    const [color, setColor] = useState("#f00");
    ////////////////////////////////////////
    useEffect(()=>{
        getGeo();
        getUserBySesion(userState.sesion).then(res=>{setFriends(res.friends);setData({id:res.id,name:res.name})});
    }, []);
    const getGeo=async()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        };
        let location = await Location.getCurrentPositionAsync({});
        setGeo(location);
    };
    const addGuests=input=>{
        const p=guests.map(obj=>obj.id);
        if (p.indexOf(input.id) === -1) guests.push(input);
        else alert("Ya está añadido");
        setEventState(!eventState);
    };
    const eraseGuests=input=>{
        let p=guests.map(obj=>obj.id).indexOf(input);
        guests.splice(p, 1);
        setEventState(!eventState);
    };
    const create=async()=>{
        if(guests.length>0&&name!==null){
            guests.push(data);
            createPlan({
                name,
                description,
                geo: {
                    lat: geo.coords.latitude,
                    long: geo.coords.longitude
                },
                guests,
                color,
                creator: data.id,
            });
            alert("Evento creado con éxito");
            setGuests([]);
        }
        else alert("No se ha podido crear el evento. Comprueba los datos introducidos.");
    };
    if (geo===null) return <CreateLoadingContainer>
        <ActivityIndicator size="large" color="#fd9b4b" />
        <Text>LOADING</Text>
    </CreateLoadingContainer>   
    return <CreateContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        <View>
            <Text>Create Event</Text>
            <TextInput onChangeText={e=>setName(e)} placeholder="Name" />
            <Picker
                selectedValue={color}
                onValueChange={e=>setColor(e)}>
                <Picker.Item key={10} value={"#f00"} label="Ocio" />
                <Picker.Item key={11} value={"#00f"} label="Deporte" />
                <Picker.Item key={12} value={"#0f0"} label="Naturaleza" />
                <Picker.Item key={13} value={"#ff0"} label="Espacios Públicos" />
                <Picker.Item key={14} value={"#f0f"} label="Varios" />
            </Picker>
            <TextInput onChangeText={e=>setDescription(e)} placeholder="Description" />
            <Text>Añadir amigos:</Text>
            <FlatList
                data={friends}
                renderItem={({item})=><Text>{item.name}
                    <TouchableOpacity onPress={() => addGuests({ id: item.id, name: item.name })}>
                        <Text>Añadir</Text>
                    </TouchableOpacity>
                </Text>}
                keyExtractor={((item)=>"B"+item.id)}
            />
            <Text>Amigos añadidos:</Text>
            <FlatList
                data={guests}
                renderItem={({item})=><Text>{item.name}
                    <TouchableOpacity onPress={()=>eraseGuests(item.id)}>
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </Text>}
                keyExtractor={((item)=>"C"+item.id)}
            />
            <TouchableOpacity onPress={()=>create()}><Text>Create</Text></TouchableOpacity>
        </View>
    </CreateContainer>
};
export default Finder;