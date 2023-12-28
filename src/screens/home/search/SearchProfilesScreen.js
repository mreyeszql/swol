import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import { generateClient } from "aws-amplify/api";
import { handleFetchAuth, handleFetchProfiles } from "functions/utils/profile";
import { handleFriendRequest } from "functions/utils/friends";

const SearchProfilesScreen = () => {
    const client = generateClient();
    const [localProfile, setLocalProfile] = useState({});
    const [profiles, setProfiles] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        localHandleFetchAuth();
    }, []);

    const localHandleFetchAuth = async () => {
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };
    
    useEffect(() => {
        localHandleFetchProfiles();
    }, [searchText, localProfile]);

    const localHandleFetchProfiles = async () => {
        if (searchText === '') {
            setProfiles([]);
        } else {
            const updatedProfiles = await handleFetchProfiles(client, localProfile, searchText);
            setProfiles(updatedProfiles);
        }
    };

    const localHandleFriendRequest = async (profile, receiverProfileId, senderProfileId) => {
        await handleFriendRequest(client, profile, receiverProfileId, senderProfileId);
        localHandleFetchAuth();
    }

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text>{item.username}</Text>
                <Button 
                    title={item.connectionType}
                    onPress={() => localHandleFriendRequest(item, item.id, localProfile.id)}
                />
            </View>
        );
    };

    return (
        <View>
            <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
                data={profiles}
                renderItem={mockRenderItem}
                keyExtractor={(item) => item.id.toString()}
                // onEndReached={loadMore}
                // onEndReachedThreshold={0.1}
            />
        </View>
    );
};

export default SearchProfilesScreen;