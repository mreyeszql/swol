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
import { uploadData, getUrl } from 'aws-amplify/storage';


const FeedScreen = ({ navigation, route }) => {
    const params = route.params;

    const insets = useSafeAreaInsets();
    const client = generateClient();
    const [pictureUri, setPictureUri] = useState(null);
    const [pictureType, setPictureType] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState(null);
    const [localProfile, setLocalProfile] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        localHandleFetchAuth();
        localHandleFetchPosts();
    }, []);

    useEffect(() => {
        if (params?.picture && params?.type) {
            setPictureType(params.type);
            setPictureUri(params.picture.uri);
            setModalVisible(true);
        }
    }, [params?.picture])

    const localHandleFetchAuth = async () => {
        console.log("localHandleFetchAuth");
        const profile = await handleFetchAuth();
        setLocalProfile(profile.data.profilesByOwnerId.items[0]);
    };

    const localHandleFetchPosts = async () => {
        console.log("localHandleFetchPosts");
        let posts = await handleFetchPosts();

        for (let i = 0; i < posts.length; i++) {
            if (posts[i]?.imageUrl) {
                let uri = await localHandleGetImage(posts[i]?.imageUrl, posts[i].author.id);
                posts[i] = {...posts[i], uri }
            }
        }
        setPosts(posts);
        setRefreshing(false);
    };

    const localHandleCloseModal = () => {
        setPictureType(null);
        setPictureUri(null);
        setModalVisible(false);
        setPostText("");
    };

    const localHandleGetImage = async (key, profileId) => {
        console.log("localHandleGetImage");
        let getUrlResult = await getUrl({
            key: "posts/" + profileId + "/" + key
        });
        return getUrlResult.url.toString();
    }

    const mockRenderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 5}}>
                {item.uri && <Image source={{ uri: item.uri }} style={{height: 100, width: 100}} />}
                <Text>{item.text}</Text>
            </View>
        );
    };

    const localHandleCreatePostWithImage = async (text, pictureUri) => {
        console.log("localHandleCreatePostWithImage");
        const base = pictureUri.split('/').pop();
        await client.graphql({
            query: createPost,
            variables: {
                input : {
                    type: "Post",
                    postKind: "Other",
                    text,
                    profilePostsId: localProfile.id,
                    imageUrl: base
                }
            }
        });
        try {
            const pictureData = await fetch(pictureUri).then((response) => response.arrayBuffer());
            await uploadData({
              key: "posts/" + localProfile.id + "/" + base,
              data: pictureData,
            }).result;
          } catch (error) {
            console.log('Error : ', error);
          }
    }

    const localHandleCreatePostWithText = async (text) => {
        console.log("localHandleCreatePostWithText");
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

    const localHandleCreatePost = async (postText, pictureUri) => {
        if (postText !== '') {
            if (pictureUri) {
                localHandleCreatePostWithImage(postText, pictureUri);
            } else {
                localHandleCreatePostWithText(postText);
            }
            localHandleCloseModal();
            localHandleFetchPosts();
        };
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
                        {pictureUri && <Image source={{ uri: pictureUri }} style={[{height: 100, width: 100}, (pictureType === 'front' ? {transform: [{scaleX: -1}]} : {})]} />}
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={{fontFamily: 'Inter-Light', textTransform: 'lowercase', color: 'white', borderWidth: 1, borderColor: 'white', margin: 10, padding: 10, borderRadius: 10}}
                            placeholderTextColor="white"
                            placeholder="Post..."
                            value={postText}
                            onChangeText={(text) => setPostText(text)}
                        />
                        <Button 
                            title="post"
                            onPress={() => localHandleCreatePost(postText, pictureUri)}
                        />
                        <Button 
                            title="close modal"
                            onPress={localHandleCloseModal}
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
