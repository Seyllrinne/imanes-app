import { View, Text, Button } from "react-native";
const Security=({ navigation, route })=><View>
    <Text>La Seguridad es muy importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>;
export default Security;