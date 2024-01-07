import { useState, useEffect } from "react";
import SafeAreaView from "components/view";
import { Button, View, TouchableOpacity, Image } from "react-native";
import Text from "components/text";
import { Feather } from '@expo/vector-icons'; 
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";


const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        localHandleGetCurrentUser();
    }, []);

    const localHandleGetCurrentUser = async () => {
        const { preferred_username, sub } = await fetchUserAttributes();
        setUsername(preferred_username);

        client = generateClient();
        const query = `
        query MyQuery {
            profilesByOwnerId(ownerId: "${sub}") {
            items {
                id
                imageUrl
            }
            }
        }
        `;
        const profile = await client.graphql({
            query: query,
        });

        const imageUri = profile.data.profilesByOwnerId.items[0]?.imageUrl;
        if (imageUri) {
            let getUrlResult = await getUrl({
                key: imageUri
            });
            setImageUri(getUrlResult.url.toString());
        }
    };
    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 12}}>
                <View style={{flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>PROFILE</Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    >
                        <Feather name="settings" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 16}}/>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 100, padding: 5}}>
                        <Image 
                            style={{height: 150, width: 150, borderRadius: 75}}
                            defaultSource={require('../../../../assets/img/avatar.png')}
                            source={{uri: imageUri}}
                        />
                    </View>
                    <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Inter-Light', fontSize:24, paddingBottom: 16}}>@{username}</Text>
                        <TouchableOpacity 
                            style={{borderColor: 'white', borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8}}
                            onPress={() => navigation.navigate('PersonalRecords', { username })}
                        >
                            <Text style={{fontFamily: 'Inter-Light', fontSize:20}}>my PRs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 16}}>
                    <Text style={{textTransform: 'uppercase', fontFamily: 'Inter-Bold', fontSize: 24}}>Weekly Recap</Text>
                </View>
            </View>
        </SafeAreaView>
    );

};

export default ProfileScreen;