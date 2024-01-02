import SafeAreaView from "components/view";
import { Button } from "react-native";
import { handleSignOut } from "functions/authentication/signout";

const ProfileScreen = ({ navigation }) => {
    const localHandleSignOut = async () => {
        const result = handleSignOut();
        if (result) {
            navigation.navigate('Signin');
        }
    }

    return (
        <SafeAreaView>
            <Button
                title="Sign Out"
                onPress={() => localHandleSignOut()}
            />
        </SafeAreaView>
    );

};

export default ProfileScreen;