import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import SafeAreaView from "components/view";
import Text from "components/text";
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from "aws-amplify/auth";

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
                if (profile_list[0]?.experience) {
                    if (profile_list[0]?.profileGymId) {
                        navigation.navigate('Tabs');
                    } else {
                        navigation.navigate('SelectGym', { profile_id: profile_list[0].id });
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
                    <Text style={styles.lowText}>By continuing, you agree to our Terms of Use and Privacy Policy</Text>
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
    lowText: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 10
    }
  });

export default InitialScreen;