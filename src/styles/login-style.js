import styled from 'styled-components/native';
import {TextInput, TouchableOpacity} from 'react-native';
export const LoginContainer=styled.View`
    flex: 1;
    background-color: #fff;
    align-items:center;
    justify-content: center;
`
export const LoginInput=styled.TextInput`
    background-color:#F1EBEB;
    height:40px;
    width:305px;
    border-radius:12px;
    color:#000;
    font-size:16px;
    border: 0.5px solid #B8B8B8;
    box-shadow: 0 0 12px black;
    padding-left: 15px;
    margin-bottom:10px;
`;
export const BotonEntrar=styled.TouchableOpacity`
    background-color:#FA512F;
    width: 210px;
    height: 50px;
    border-radius: 50px;
    align-items:center;
    justify-items:center;
`
export const TextoBoton=styled.Text`
    color:#fff;
    font-weight: 700;
    font-size: 20px;    
    align-items:center;
    line-height: 27px;
    margin-top:10px;
`
export const BotonOlvidar=styled.TouchableOpacity`

`
export const TextoOlvidar=styled.Text`
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #EA4335;
`