import { TextInput, View } from "react-native";
import Text from "components/text";

const SettingsTextInput = ({ style, setText, text, label, placeholder, secureTextEntry }) => {
    return (
        <View style={[style, {flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}]}>
            <Text>{label}</Text>
            <TextInput 
                style={{textTransform: 'lowercase', width: 200, color: '#6388EC', fontSize: 18, textAlign: 'right'}}
                autoCorrect={false}
                autoCapitalize='none'
                placeholderTextColor="gray"
                placeholder={placeholder}
                secureTextEntry={secureTextEntry ?? false}
                value={text}
                onChangeText={(text) => setText(text)}
            />
        </View>
    );
};

export { SettingsTextInput };