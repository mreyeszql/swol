import { useState, useEffect } from "react";
import SafeAreaView from "components/view";
import { Button, View, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { handleSignOut } from "functions/authentication/signout";
import { Feather, AntDesign } from '@expo/vector-icons'; 
import Text from "components/text";
import { SettingsTextInput } from "components/settings";
import { fetchUserAttributes, updateUserAttributes, updatePassword, deleteUser } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import { deleteProfile, updateProfile } from "graphql/mutations";
import { launchImageLibraryAsync } from 'expo-image-picker';
import { uploadData, getUrl } from "aws-amplify/storage";




const SettingsScreen = ({ navigation }) => {

    const [username, setUsername] = useState('mreyes');
    const [email, setEmail] = useState('mreyes@gmail.com');
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [localProfileSubId, setLocalProfileSubId] = useState(null);

    useEffect(() => {
        localHandleGetCurrentUser();
    }, []);

    const localHandleGetCurrentUser = async () => {
        const { preferred_username, email, sub } = await fetchUserAttributes();
        setLocalProfileSubId(sub);
        setEmail(email);
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

    const localHandleChangePassword = async () => {
        try {
            await updatePassword({ oldPassword, newPassword });
        } catch (err) {
            console.log(err);
        }
    };

    const localHandleChangeUsernameEmail = async () => {
        try {
            const old_attributes = await fetchUserAttributes();
            if (old_attributes.preferred_username !== username.toLowerCase() || old_attributes.email !== email.toLowerCase()) {
                await updateUserAttributes({
                    userAttributes: {
                        preferred_username: username.toLowerCase(),
                        email: email.toLowerCase()
                    }
                });

                client = generateClient();
                const query = `
                query MyQuery {
                    profilesByOwnerId(ownerId: "${old_attributes.sub}") {
                    items {
                        id
                    }
                    }
                }
                `;
                const profile = await client.graphql({
                    query: query,
                });

                await client.graphql({
                    query: updateProfile,
                    variables: {
                        input: {
                            id: profile.data.profilesByOwnerId.items[0].id,
                            username: username.toLowerCase()
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const localHandleDeleteAccount = async () => {
        try {
            const old_attributes = await fetchUserAttributes();
            client = generateClient();
            const query = `
            query MyQuery {
                profilesByOwnerId(ownerId: "${old_attributes.sub}") {
                items {
                    id
                }
                }
            }
            `;
            const profile = await client.graphql({
                query: query,
            });

            await client.graphql({
                query: deleteProfile,
                variables: {
                    input: {
                        id: profile.data.profilesByOwnerId.items[0].id,
                    }
                }
            });

            await deleteUser();
            navigation.navigate('Initial');
            
        } catch (err) {
            console.log(err);
        }
    };

    const localHandleSignOut = async () => {
        const result = handleSignOut();
        if (result) {
            navigation.navigate('Initial');
        }
    };

    const localHanldePickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);

            client = generateClient();
            const query = `
            query MyQuery {
                profilesByOwnerId(ownerId: "${localProfileSubId}") {
                items {
                    id
                }
                }
            }
            `;
            const profile = await client.graphql({
                query: query,
            });
            
            const pictureData = await fetch(result.assets[0].uri).then((response) => response.arrayBuffer());
            const base = result.assets[0].uri.split('/').pop();
            const pictureKey = "profilepics/" + profile.data.profilesByOwnerId.items[0].id + "/" + base;
            await uploadData({
                key: pictureKey,
                data: pictureData,
            }).result;

            await client.graphql({
                query: updateProfile,
                variables: {
                    input: {
                        id: profile.data.profilesByOwnerId.items[0].id,
                        imageUrl: pictureKey
                    }
                }
            });
        }
      };

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback 
                onPress={() => Keyboard.dismiss()}
            >
                <View style={{height: "100%", width: "100%"}}>
                    <View style={{paddingHorizontal: 12, backgroundColor: 'black', paddingTop: 50, marginTop: -50, zIndex: 1, marginBottom: 16}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>SETTINGS</Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Feather name="x" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: "100%", height: 1, backgroundColor: 'white', marginTop: 16}} />
                    </View>
                    <SafeAreaView style={{paddingHorizontal: 12, flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
                        <KeyboardAvoidingView 
                            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                            style={{
                            flex: 1}}
                            keyboardVerticalOffset={64}
                        >
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 26}}>
                                <TouchableOpacity
                                    onPress={() => localHanldePickImageAsync()}
                                    style={{borderWidth: 1, borderRadius: 100, padding:4, borderColor: 'white'}}
                                >
                                    <Image 
                                        style={{height: 100, width: 100, borderRadius: 50}}
                                        defaultSource={require('../../../../assets/img/avatar.png')}
                                        source={{uri: imageUri}}
                                    />
                                    <View style={{position: 'absolute', transform: [{translateX: 76}, {translateY: 76}], backgroundColor: '#6388EC', borderRadius: 50}}> 
                                        <AntDesign name="pluscircle" size={30} color="white"/>
                                    </View>
                                </TouchableOpacity>
                                <View style={{justifyContent: 'flex-end', flex: 1, flexDirection: 'row'}}>
                                    <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8}}>
                                        <Text>Request QR Codes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{fontFamily: "Inter-Bold", fontSize: 20, marginBottom: 16}}>ACCOUNT</Text>
                            <View style={{width: "100%", height: 1, backgroundColor: 'white', marginBottom: 16}} />
                            <View>
                                <SettingsTextInput style={{marginBottom: 16}} setText={setUsername} text={username} label="Username" placeholder="@username"/>
                                <SettingsTextInput style={{marginBottom: 16}} setText={setEmail} text={email} label="Email" placeholder="example@email.com" />
                            </View>
                            <View style={{marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableOpacity
                                    onPress={() => localHandleChangeUsernameEmail()}
                                    style={{borderWidth: 1, borderColor: 'grey', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5}}
                                >
                                    <Text style={{fontSize: 16, color: 'grey'}}>Change</Text>
                                </TouchableOpacity>
                            </View>
                    
                            <Text style={{fontFamily: "Inter-Bold", fontSize: 20, marginBottom: 16}}>CHANGE PASSWORD</Text>
                            <View style={{width: "100%", height: 1, backgroundColor: 'white', marginBottom: 16  }} />
                            <View>
                                <SettingsTextInput style={{marginBottom: 16}} setText={setOldPassword} text={oldPassword} label="Old Password" placeholder="password" secureTextEntry={true} />
                                <SettingsTextInput style={{marginBottom: 16}} setText={setNewPassword} text={newPassword} label="New Password" placeholder="password" secureTextEntry={true} />
                            </View>
                            <View style={{marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableOpacity
                                    onPress={() => localHandleChangePassword()}
                                    style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5}}
                                >
                                    <Text style={{fontSize: 16, color: 'gray'}}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </KeyboardAvoidingView>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => localHandleSignOut()}
                                >
                                    <Text style={{fontSize: 20}}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "100%", height: 1, backgroundColor: 'grey', marginVertical: 16}} />
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => localHandleDeleteAccount()}
                                >
                                    <Text style={{fontSize: 16, color: 'grey'}}>Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default SettingsScreen;