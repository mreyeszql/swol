import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import SafeAreaView from "components/view";
import Text from "components/text";
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from "aws-amplify/auth";
import { openURL } from "expo-linking";

const InitialScreen = ({ navigation }) => {

    useEffect(() => {
        localHandleCheckSession();
    }, []);

    const localHandleCheckSession = async () => {
        try {
            const { username, userId } = await getCurrentUser();
            client = generateClient();
            const query = `
            query MyQuery {
                profilesByOwnerId(ownerId: "${userId}") {
                items {
                    id
                    experience
                    profileGymId
                    username
                }
                }
            }
            `;
            const profile = await client.graphql({
                query: query,
            });
    
            const profile_list = profile.data.profilesByOwnerId.items;
            if (profile_list[0]?.username) {
                if (profile_list[0]?.experience >= 0 && profile_list[0]?.experience <= 10) {
                    if (profile_list[0]?.profileGymId) {
                        navigation.navigate('Tabs');
                    } else {
                        navigation.navigate('SpecifyTypeGym', { profile_id: profile_list[0].id });
                    }
                } else {
                    navigation.navigate('ExperienceLevel', { sub: userId });
                }
            } else {
                navigation.navigate('CreateUsername', { email: username, sub: userId })
            }
            
        } catch (err) {
            console.log(err);
        }
    };
        
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
                <View>
                    <TouchableOpacity style={[styles.textInput, {backgroundColor: 'white'}]} onPress={() => navigation.navigate("Signup")}>
                        <Text style={[styles.text, {color: 'black'}]}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInput} onPress={() => navigation.navigate("Signin")}>
                        <Text style={styles.text}>Log In</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                        <Text style={{fontSize: 10}}>By continuing, you agree to our </Text>
                        <TouchableOpacity onPress={() => openURL('https://www.swol.app/terms')}>
                            <Text style={{fontSize: 10,textDecorationLine: 'underline'}}>Terms of Use</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 10}}> and </Text>
                        <TouchableOpacity onPress={() => openURL('https://www.swol.app/privacy')}>
                            <Text style={{fontSize: 10,textDecorationLine: 'underline'}}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 16,
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        width: '100%', 
        height: '100%'
    },
    textInput: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 16,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 15,
        padding: 10,
        fontSize: 16,
    },
    text: {
        fontFamily: 'Inter',
    },
    logo: {
      marginBottom: 50,
      width: 150, 
      height: 150, 
      alignSelf: 'center'
    },
  });

export default InitialScreen;