import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import { generateClient } from "aws-amplify/api";
import { listProfiles } from "graphql/queries";
import { createFriendRequest, deleteFriendRequest, updateFriendRequest } from "graphql/mutations";
import { handleFetchAuth } from "functions/utils/profile";

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
            const variables = {
                filter: {
                    username: {
                        contains: searchText
                    },
                    id: {
                        ne: localProfile.id
                    },
                }
            };

            const result = await client.graphql({
                query: listProfiles,
                variables: variables
            });

            const updatedProfiles = result.data.listProfiles.items.map(profile => {
                const incomingRequest = localProfile.incomingRequests.items.filter(request =>
                    request.profileOutgoingRequestsId === profile.id
                );

                const outgoingRequest = localProfile.outgoingRequests.items.filter(request =>
                    request.profileIncomingRequestsId === profile.id
                );

                if (incomingRequest.length > 0) {
                    if (incomingRequest[0].accepted) {
                        return {
                            ...profile,
                            connectionType: "remove",
                            requestId: incomingRequest[0].id,
                        };
                    } else {
                        return {
                            ...profile,
                            connectionType: "accept",
                            requestId: incomingRequest[0].id,
                        };
                    }
                }

                if (outgoingRequest.length > 0) {
                    if (outgoingRequest[0].accepted) {
                        return {
                            ...profile,
                            connectionType: "remove",
                            requestId: outgoingRequest[0].id,
                        };
                    } else {
                        return {
                            ...profile,
                            connectionType: "cancel request",
                            requestId: outgoingRequest[0].id,
                        };
                    }
                }

                return {
                    ...profile,
                    connectionType: "connect",
                    requestId: null,
                };
                
            });
            setProfiles(updatedProfiles);
        }
    };

    const localHandleFriendRequest = async (profile, receiverProfileId, senderProfileId) => {
        if (profile.connectionType === "connect") {
            await client.graphql({
                query: createFriendRequest,
                variables: {
                    input: {accepted: false, profileIncomingRequestsId: receiverProfileId, profileOutgoingRequestsId: senderProfileId}
                }
            });
        } else if (profile.connectionType === "cancel request" || profile.connectionType === "remove") {
            await client.graphql({
                query: deleteFriendRequest,
                variables: {
                    input: {
                        id: profile.requestId
                    }
                }
            });
        } else if (profile.connectionType === "accept") {
            await client.graphql({
                query: updateFriendRequest,
                variables: {
                    input: {
                        id: profile.requestId,
                        accepted: true,
                    }
                }
            });
        }
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