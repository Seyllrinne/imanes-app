import { db } from './firebase';
import {collection,getDocs,query,doc,getDoc,addDoc,deleteDoc,updateDoc,where} from "firebase/firestore";
const itemsCollection = collection(db,'Messages');
// CREATE
export const createMessage=(obj)=>addDoc(itemsCollection, obj).id;
// UPDATE
export const updateMessage=async(id,obj)=>{
    await updateDoc(doc(itemsCollection, id), obj)
};
// READ
export const getMessages = async () => {
    const result = await getDocs(query(itemsCollection));
    return getArrayFromCollection(result);
};
// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getMessageByReId=async(receptorId)=>{
    const result = await getDocs(query(itemsCollection, where('receptor', '==', receptorId)));
    return getArrayFromCollection(result);
};
export const getMessageById = async (id) => {
    const result = await getDoc(doc(itemsCollection, id));
    return result.data();
};
// DELETE
export const deleteMessageById = async (id) => {
    await deleteDoc(doc(itemsCollection, id));
};
//Recuperar Array
const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
};
//ACCESS
export const accessMessage = async (name) => {
    const result = await getDocs(query(itemsCollection, where('name', '==', name)));
    if (result.docs.length == 0) {
        const a = await addDoc(itemsCollection, { name });
        return a.id;
    }
    return result.docs[0].id;
};