import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Modal, Button, TextInput } from 'react-native';
import { handleFetchPosts } from 'functions/feed/posts';
import Text from 'components/text';
import SafeAreaView from 'components/view';
import { AntDesign } from '@expo/vector-icons'; 
import { createPost } from 'graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { handleFetchAuth } from 'functions/utils/profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const FeedScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const client = generateClient();
    const [posts, setPosts] = useState([]);
    const [localProfile, setLocalProfile] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        localHandleFetchAuth();
        localHandleFetchPosts();
    }, []);

    const localHandleFetchAuth = async () => {
        console.log("localHandleFetchAuth");
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localHandleFetchPosts = async () => {
        console.log("localHandleFetchPosts");
        const posts = await handleFetchPosts();
        setPosts(posts);
        setRefreshing(false);
    };

    const mockRenderItem = ({ item }) => {
        return (
            <Text>{item.text}</Text>
        );
    };

    const [postText, setPostText] = useState(null);

    const localHandleCreatePost = async (text) => {
        console.log("localHandleCreatePost");
        await client.graphql({
            query: createPost,
            variables: {
                input : {
                    type: "Post",
                    postKind: "Other",
                    text,
                    profilePostsId: localProfile.id
                }
            }
        });
    };

    return (
        
        <SafeAreaView style={{marginBottom: insets.bottom * 3 - 12}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <View style={{width: '80%', height: '60%', backgroundColor: 'black', borderWidth: 1, borderRadius: 10, borderColor: 'white'}}>
                        <TextInput
                            style={{fontFamily: 'Inter-Light', color: 'white', borderWidth: 1, borderColor: 'white', margin: 10, padding: 10, borderRadius: 10}}
                            placeholderTextColor="white"
                            placeholder="Post..."
                            value={postText}
                            onChangeText={(text) => setPostText(text)}
                        />
                        <Button 
                            title="post"
                            onPress={() => {
                                localHandleCreatePost(postText);
                                setModalVisible(false);
                                setPostText("");
                                localHandleFetchPosts();
                            }}
                        />
                        <Button 
                            title="close modal"
                            onPress={() => {
                                setModalVisible(false);
                                setPostText("");
                            }}
                        />
                        <Button 
                            title="add pic"
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Camera");
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={{paddingHorizontal: 12, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image 
                        source={require('../../../../assets/logo.png')}
                        style={{width: 40, height: 40}}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <AntDesign name="plus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'white', marginTop: 10}}/>
                <FlatList 
                    style={{width: '100%', height: '100%'}}
                    data={posts}
                    renderItem={mockRenderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={() => {
                        setRefreshing(true);
                        localHandleFetchPosts();
                    }}
                    refreshing={refreshing}
                />
            </View>
        </SafeAreaView>
    );
};

export default FeedScreen;
