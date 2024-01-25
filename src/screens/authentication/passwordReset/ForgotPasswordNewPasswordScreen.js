import SafeAreaView from "components/view";
import Text from "components/text";
import { TouchableOpacity, Text as RNText, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView, TextInput, StyleSheet, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { confirmResetPassword } from 'aws-amplify/auth';


const ForgotPasswordNewPasswordScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);

    const [error, setError] = useState(null);

    const localHandleNext = async () => {
        if (password1 === password2 && password1 !== "") {
            if (password1.length >= 8) {
                navigation.navigate('ForgotPasswordConfirmCode', { email, password: password1 });
            } else {
                setError("Anyone could guess that weak ass password :|");
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        } else {
            setError("You gave me two different passwords there :/");
            setTimeout(() => {
                setError(null);
            }, 5000);
        };
    };
    
    return (
        <SafeAreaView>
        <TouchableWithoutFeedback 
            onPress={() => Keyboard.dismiss()}
        >
            <View style={{padding: 16}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View>
                <Text style={styles.title}>PASSWORD</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    placeholder="Password"
                    secureTextEntry
                    value={password1}
                    onChangeText={(text) => setPassword1(text)}
                />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    placeholder="Repeat password"
                    secureTextEntry
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                />
                <View>
                    <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                    <RNText styles={styles.text}>
                        Next
                    </RNText>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 32}}>
                    <Text style={{color: error ? '#6388EC' : 'black', fontSize: 16}}>{error ? error : '|'}</Text>
                    </View>
                </View>
                </View>
            </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'Inter-Bold',
      color: 'white',
      fontSize: 50,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    container: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    textInput: {
      textTransform: 'lowercase',
      fontFamily: 'Inter-Light',
      color: 'white',
      marginVertical: 12,
      borderWidth: 0.5,
      borderColor: 'white',
      borderRadius: 15,
      padding: 10,
      fontSize: 16,
    },
    text: {
      fontFamily: 'Inter-Light'
    },
    next: {
      marginTop: 28 - 12,
      backgroundColor: 'white',
      width: 90,
      height: 30,
      alignSelf: 'flex-end',
      borderRadius: 10,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    },
    logo: {
      marginBottom: 50,
      width: 125, 
      height: 125, 
      alignSelf: 'center'
    }
  });

export default ForgotPasswordNewPasswordScreen;