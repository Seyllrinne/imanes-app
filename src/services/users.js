import {db,auth,storage} from './firebase';
import { getDatabase, onValue, set } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {collection,getDocs,query,doc,getDoc,addDoc,deleteDoc,updateDoc,setDoc,where} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
const itemsCollection = collection(db,'Users');
// CREATE
export const createUser=(obj)=>addDoc(itemsCollection, obj).id;
// UPDATE
export const updateUser = async (id, obj) => {
    await updateDoc(doc(itemsCollection, id),obj)
};
// READ
export const getUsers= async () => {
    const result = await getDocs(query(itemsCollection));
    return getArrayFromCollection(result);
};
// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getUserByName = async (name) => {
    const result = await getDocs(query(itemsCollection, where('name', '==', name)));
    return getArrayFromCollection(result);
};
export const getUserById = async (id) => {
    const result = await getDoc(doc(itemsCollection, id));
    return result.data();
};
// DELETE
export const deleteUserById = async (id) => {
    await deleteDoc(doc(itemsCollection, id));
};
//Recuperar Array
const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
};
//ACCESS
export const accessUser=async(name)=>{
    const result=await getDocs(query(itemsCollection, where('name', '==', name)));
    if(result.docs.length==0){
        const a=await addDoc(itemsCollection,{name});
        return a.id;
    }
    return result.docs[0].id;
};
export const signUp = async (email,password) => {
    const URL="https://firebasestorage.googleapis.com/v0/b/imanes-app.appspot.com/o/blank_profile.png?alt=media&token=64e63c8c-67b4-44cb-bcc6-7bd039329e89";
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(itemsCollection, user.uid),{name:email,uploadedPicture:URL});
        return user.uid;
    } catch (err) {
        return err; 
    }
};
export const signIn=async(email,password)=>{
    try{
        const result = await signInWithEmailAndPassword(auth, email, password);
        const sesion=createSesion(result.user.uid);
        return sesion;
    }catch(e){
        return e;
    };
};
//export const getCurrentUserId = async () => await auth.currentUser?.uid;
export const logout=async()=>await signOut(auth);
export const uploadImage = async (file, sesion) => {
    const UID=await getUserBySesion(sesion);
    const storageRef = ref(storage, `/files/${UID.id}/perfil`);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(async (data) => {
        const url = await getDownloadURL(data.ref);
        await updateDoc(doc(itemsCollection, UID.id), { uploadedPicture: url });
    })
};
export const getUserBySesion=async sesion=>{
    const result = await getDocs(query(itemsCollection, where('sesion', '==', sesion)));
    return getArrayFromCollection(result)[0];
}
export const createSesion=async(id)=>{
    const sesion=makeId();
    const R=await updateUser(id,{sesion});
    return sesion;
};
export const createGSesion=async(id,email)=>{
    const sesion=makeId();
    const exist=await getUserById(id);
    if(typeof(exist)==="object"){
        await updateUser(id,{sesion});
    }
    else{
        const URL="https://firebasestorage.googleapis.com/v0/b/imanes-app.appspot.com/o/blank_profile.png?alt=media&token=64e63c8c-67b4-44cb-bcc6-7bd039329e89";
        await setDoc(doc(itemsCollection,id),{name:email,uploadedPicture:URL,sesion});
    };
    return sesion;
};
const makeId=()=>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (;result.length<=50;){
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
};

/*export const setupHighscoreListener=userId=>{
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    onValue(reference,snapshot=>{
        const highscore = snapshot.val().highscore;
        console.log("New high score: "+highscore);
    });
};*/