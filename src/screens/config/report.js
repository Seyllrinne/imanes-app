import { View, Text, Button } from "react-native";
const Report=({ navigation, route })=><View>
    <Text>reportar cosas es muy importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>;
export default Report;