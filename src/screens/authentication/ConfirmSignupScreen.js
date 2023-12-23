import { TextInput, Button, View } from 'react-native';
import React, { useState } from 'react';
import { handleConfirmSignUp } from 'functions/authentication/signup';

const ConfirmSignupScreen =  ({ route, navigation }) => {
    const { email, password, username } = route.params;
    const [confirmationCode, setConfirmationCode] = useState('');

    const localHandleConfirmSignUp = async () => {
        const result = await handleConfirmSignUp({
            email, 
            username,
            confirmationCode,
        })

        if (result) {
            navigation.navigate('Tabs');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Confirmation Code"
                value={confirmationCode}
                onChangeText={(text) => setConfirmationCode(text)}
            />
            <Button title="Confirm" onPress={localHandleConfirmSignUp} />
        </View>
    );
};

export default ConfirmSignupScreen;
