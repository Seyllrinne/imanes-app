import { useContext} from 'react';
import { AppContext } from '../application/provider';
import { Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from '../services/users';
export default function ImagePickerExample() {
    const { user, event } = useContext(AppContext);
    const [userState, setUserState] = user;
    const [eventState, setEventState] = event;
    const uploadImageAsync=async(uri)=>{
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        return blob;
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.cancelled){
            const P=await uploadImageAsync(result.uri);
            uploadImage(P,userState.sesion);
        };
    };
    return <>
        <Button title="Pick an image from camera roll" onPress={()=>pickImage()} />
    </>
};    

