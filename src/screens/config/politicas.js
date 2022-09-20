import { View, Text, Button } from "react-native";
const Politics=({ navigation, route })=><View>
    <Text>La Politica no es muy importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>;
export default Politics;