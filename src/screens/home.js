import {Text,TouchableOpacity,FlatList, Dimensions,ActivityIndicator,StatusBar} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import {getPlans} from '../services/plans';
import Modal from "react-native-modal";
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Icons from '../components/markers';
import {mapStyle} from '../styles/map-style';
import {HomeContainer} from '../styles/home-style';
import {getUserBySesion} from "../services/users";
const Home= ({navigation,route})=>{
    //AppContext
    const {user,event}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [eventState,setEventState]=event;
    //Modal visible
    const [visible,setVisible]=useState(false);
    //Carga datos para usuario
    const [events,setEvents]=useState(null);
    //Geolocalización
    const [geo,setGeo]=useState(null);
    const [errorMsg,setErrorMsg]=useState(null);
    ///////////////////////////////////////////
    useEffect(()=>{
        (async()=>{
            let {status}=await Location.requestForegroundPermissionsAsync();
            if (status!=='granted'){
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location=await Location.getCurrentPositionAsync({});
            setGeo(location);
        })();
        getPlans().then(res=>filtro(res).then(res2=>setEvents(res2)));
    },[]);
    useEffect(()=>{
        getPlans().then(res=>filtro(res).then(res2=>setEvents(res2)));
    },[eventState]);
    const filtro=async(input)=>{
        let eventos=[];
        const SESION=await userState.sesion;
        const DATA=await getUserBySesion(SESION);
        const ID=await DATA.id;
        input.forEach(obj=>{
            const P=obj.guests.map(obj2=>obj2.id);
            if(P.indexOf(ID)>-1)eventos.push(obj);
        });
        return eventos;
    };
    if (geo===null||events===null) return <HomeContainer>
        <ActivityIndicator size="large" color="#fd9b4b" />
        <Text>LOADING</Text>
    </HomeContainer>   
    return <HomeContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content" 
            translucent={false}
        />
        <MapView
            customMapStyle={mapStyle}
            style={{width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: geo.coords.latitude,
                longitude: geo.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }}
            mapType="standard"
        >
            <Marker
                    pinColor="#f78b41"
                    key="1"
                    coordinate={{
                        latitude:geo.coords.latitude,
                        longitude:geo.coords.longitude
                    }}
            >
            </Marker>
            {events.map((obj)=><Marker
                        key={obj.id}
                        coordinate={{
                            latitude: obj.geo.lat,
                            longitude: obj.geo.long,
                        }}
                        onPress={()=>setVisible(true)}
            >
                <Icons color={obj.color}/>
                    <Modal isVisible={visible}>
                    <TouchableOpacity onPress={()=>setVisible(false)}><Text>X</Text></TouchableOpacity>
                        <Text>Name: {obj.name}</Text>
                        <Text>Description: {obj.description}</Text>
                        <Text>Invitados: </Text>
                        <FlatList
                            data={obj.guests}
                            renderItem={({item})=><Text>{item.name}</Text>}
                            keyExtractor={((item)=>`A${item.id}`)}
                        />
                    </Modal>
            </Marker>
            )}
        </MapView>
    </HomeContainer>
};
export default Home;