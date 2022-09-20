import { View, Text, Button } from "react-native";
const Help=({ navigation, route })=><View>
    <Text>Ayudar es importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>
export default Help;