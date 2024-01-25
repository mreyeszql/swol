import SafeAreaView from "components/view";
import Text from "components/text";
import { TouchableOpacity, Text as RNText, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView, TextInput, StyleSheet, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { resetPassword } from 'aws-amplify/auth';


const ForgotPasswordUsernameScreen = ({ navigation, route }) => {
    const { email } = route.params;
    const [localEmail, setLocalEmail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLocalEmail(email);
    }, []);

    const localHandleNext = async () => {
        try {
            const { nextStep } = await resetPassword({ username: localEmail });
            if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
               navigation.navigate('ForgotPasswordNewPassword', { email: localEmail  });
            }
        } catch (error) {
            setError("I don't recognize that email :/");
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
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
                <Text style={styles.title}>EMAIL</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    placeholder="Email"
                    value={localEmail}
                    onChangeText={(text) => setLocalEmail(text)}
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

export default ForgotPasswordUsernameScreen;