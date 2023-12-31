import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { handleFetchPosts } from 'functions/feed/posts';
import Text from 'components/text';
import SafeAreaView from 'components/view';

const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        localHandleFetchPosts();
    }, []);

    const localHandleFetchPosts = async () => {
        const posts = await handleFetchPosts();
        console.log(posts);
        setPosts(posts);
    };

    const mockRenderItem = ({ item }) => {
        return (
            <Text>{item.text}</Text>
        );
    };

    return (
        <SafeAreaView>
            <FlatList 
                style={{width: '100%', height: '100%'}}
                data={posts}
                renderItem={mockRenderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default FeedScreen;
