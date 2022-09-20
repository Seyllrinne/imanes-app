import { View, Text, Button } from "react-native";
const Pass=({ navigation, route })=><View>
    <Text>Cambia la contraseña</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>;
export default Pass;