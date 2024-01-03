import { View, Text, Button } from 'react-native';
import { handleSignOut } from 'functions/authentication/signout';

const TabScreen = ({ navigation }) => {

    const localHandleSignOut = async () => {
        const result = await handleSignOut();
        if (result) {
            navigation.navigate('Initial');
        }
    };

  return (
    <View>
      <Text>Tab Screen</Text>
      <Button 
        title='Sign Out'
        onPress={localHandleSignOut}
      />
    </View>
  );
};

export default TabScreen;
