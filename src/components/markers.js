import {Image} from "react-native";
import { default as Green } from '../../assets/magnets/magnetGreen.png';
import { default as Pink } from '../../assets/magnets/magnetPink.png';
import { default as Purple } from '../../assets/magnets/magnetPurple.png';
import { default as Yellow } from '../../assets/magnets/magnetYellow.png';
const Icons=({color})=>{
    if (color==="#0f0")return <Image source={Green} style={{ height: 58, width: 41 }} />
    else if (color === "#f0f") return <Image source={Pink} style={{ height: 58, width: 41 }} />
    else if (color === "#ff0") return <Image source={Yellow} style={{ height: 58, width: 41 }} />
    return <Image source={Purple} style={{ height: 58, width: 41 }} />
}
export default Icons;