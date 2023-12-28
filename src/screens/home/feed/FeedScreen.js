import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { handleFetchPosts } from 'functions/feed/posts';

const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        localHandleFetchPosts();
    }, []);

    const localHandleFetchPosts = async () => {
        const posts = await handleFetchPosts();
        setPosts(posts);
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
