import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import SafeAreaView from "components/view";
import Text from "components/text";

const InitialScreen = ({ navigation }) => {
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
    }
  });

export default InitialScreen;