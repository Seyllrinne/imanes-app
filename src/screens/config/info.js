import { View, Text, Button } from "react-native";
const Info=({ navigation, route })=><View>
    <Text>La información es muy importante</Text>
    <Button
        title="Volver Atrás"
        onPress={() => navigation.goBack()}
    />
</View>
export default Info;