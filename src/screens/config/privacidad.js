import { View, Text, Button } from "react-native";
const Private=({ navigation, route })=><View>
    <Text>La Privacidad es muy importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>;
export default Private;