import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { handleFetchAuth } from 'functions/utils/profile';
import { generateClient } from 'aws-amplify/api';
import { listPosts } from 'graphql/queries';

const FeedScreen = ({ navigation }) => {
    const client = generateClient();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        localHandleFetchPosts();
    }, []);

    const localHandleFetchPosts = async () => {
        const profile = await handleFetchAuth();
        const incomingFriends = profile.data.profilesByOwnerId.items[0].incomingRequests.items
            .filter(profile => {
                return profile.accepted;
            })
            .map(profile => {
                return { id: profile.profileOutgoingRequestsId };
            })
        const outgoingFriends = profile.data.profilesByOwnerId.items[0].outgoingRequests.items
            .filter(profile => {
                return profile.accepted;
            })
            .map(profile => {
                return { id: profile.profileIncomingRequestsId };
            });

        const friends = incomingFriends.concat(outgoingFriends);
        
        const result = await client.graphql({
            query: listPosts,
            variables: {
                filter: {
                    or: friends
                }
            }
        });
        setPosts(result.data.listPosts.items)
    };

    const mockRenderItem = ({ item }) => {
        return (
            <Text>{item.text}</Text>
        );
    };

    return (
        <View>
            <FlatList 
                style={{width: '100%', height: '100%'}}
                data={posts}
                renderItem={mockRenderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default FeedScreen;
