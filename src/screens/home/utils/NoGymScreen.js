import Text from "components/text";
import SafeAreaView from "components/view";
import { View, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { generateClient } from "aws-amplify/api";
import { updateProfile } from "graphql/mutations";

const NoGymScreen = ({ navigation, route }) => {
    const { profile_id } = route.params;

    const localHandleHomeGym = async () => {
        const client = generateClient();
        await client.graphql({
            query: updateProfile,
            variables: { input: {
                id: profile_id,
                profileGymId: "home",
            }}
        });
        navigation.navigate('Tabs');
    };
    return (
        <SafeAreaView>
            <View style={{padding: 16}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', paddingBottom: 80}}>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectGym', { profile_id })}>
                        <Text style={{
                            fontFamily: 'Inter-Bold',
                            color: 'white',
                            fontSize: 48,
                            marginBottom: 4,
                            textDecorationLine: 'underline',
                        }}>Look up my gym in maps</Text>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'Inter-Bold',
                         color: 'white',
                         fontSize: 52,
                         marginBottom: 4,}}>OR</Text>
                    <TouchableOpacity onPress={localHandleHomeGym}>
                        <Text style={{
                            fontFamily: 'Inter-Bold',
                            color: 'white',
                            fontSize: 48,
                            marginBottom: 4,
                            textDecorationLine: 'underline',
                        }}>I work out at home</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    );
};

export default NoGymScreen;