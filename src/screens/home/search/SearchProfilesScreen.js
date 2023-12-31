import { useEffect, useState } from "react";
import { View, TextInput, FlatList, Button, TouchableOpacity } from 'react-native';
import { generateClient } from "aws-amplify/api";
import { handleFetchAuth, handleFetchProfiles } from "functions/utils/profile";
import { handleFriendRequest, handleConnectionRequests } from "functions/utils/friends";
import SafeAreaView from "components/view";
import Text from "components/text";

const SearchProfilesScreen = () => {
    const client = generateClient();
    const [localProfile, setLocalProfile] = useState({});
    const [profiles, setProfiles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const friendRequests = localProfile.incomingRequests?.items
                            .filter((item) => !item.accepted)
                            .map((item) => {
                                return {...item, connectionType: "accept"};
                            });

    useEffect(() => {
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        console.log("localHandleFetchAuth");
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };
    
    useEffect(() => {
        localHandleFetchProfiles();
    }, [searchText, localProfile]);

    const localHandleFetchProfiles = async () => {
        console.log("localHandleFetchProfiles");
        if (searchText === '') {
            setProfiles([]);
        } else {
            const updatedProfiles = await handleFetchProfiles(client, localProfile, searchText);
            setProfiles(updatedProfiles);
        }
    };

    const localHandleFriendRequest = async (profile, receiverProfileId, senderProfileId) => {
        console.log("localHandleFriendRequest");
        await handleFriendRequest(client, profile, receiverProfileId, senderProfileId);
        localHandleFetchAuth();
    }

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 30, height: 30,backgroundColor: 'gray', marginRight: 10, borderRadius: 15}}/>
                    <Text style={{textTransform: 'lowercase'}}>{item.username}</Text>
                </View>
                <TouchableOpacity
                    style={{borderWidth: 1, borderColor: 'white', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3}}
                    onPress={() => localHandleFriendRequest(item, item.id, localProfile.id)}
                >
                    <Text>{item.connectionType}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 28, height: '100%'}}>
                <TextInput
                    style={{color: 'white', borderColor: 'white', padding: 6, fontFamily: 'Inter-Bold', borderBottomColor: 'white', borderBottomWidth: 1, fontSize: 30}}
                    placeholderTextColor="grey"
                    placeholder="Add SWOLMates..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                {searchText ? (
                    <FlatList
                    data={profiles}
                    renderItem={mockRenderItem}
                    keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    <View>
                        <Text style={{paddingTop: 10}} >Requests ({friendRequests?.length ? friendRequests.length : 0})</Text>
                        <FlatList
                            style={{height: '100%'}}
                            data={friendRequests}
                            renderItem={mockRenderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchProfilesScreen;