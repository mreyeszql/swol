import Text from "components/text";
import { Keyboard, KeyboardAvoidingView, Text as RNText, TouchableOpacity, TouchableWithoutFeedback, Platform, StyleSheet, TextInput, View } from "react-native";
import SafeAreaView from "components/view";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

const ProvideUnlistedGymScreen = ({ navigation, route }) => {
    const { profile_id } = route.params;
    const localHandleNext = () => {
        navigation.navigate("Tabs");
    }
    return (
        <SafeAreaView>
            <View style={{marginHorizontal: 24, flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 32, fontFamily: 'Inter-Bold'}}>
                        It looks like the gym you selected is not registered with us yet. You may continue though :)
                    </Text>
                    <Text style={{color: 'white', fontSize: 12, paddingTop: 20, textAlign: 'center'}}>
                        We will contact them ASAP to get them on board.
                    </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', paddingBottom: 48}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={localHandleNext} style={{borderWidth: 1, borderColor: '#6388EC', borderRadius: 16, paddingHorizontal: 56, paddingVertical: 12}}> 
                            <Text style={{ textTransform: 'uppercase', fontSize: 20, color: '#6388EC'}}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>  
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'Inter-Bold',
      color: 'white',
      fontSize: 50,
      marginBottom: 4,
      textTransform: 'uppercase'
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
      marginVertical: 10,
      borderWidth: 0.5,
      borderColor: 'white',
      borderRadius: 15,
      padding: 12,
      fontSize: 16,
    },
    text: {
      fontFamily: 'Inter-Light'
    },
    next: {
      marginTop: 16,
      backgroundColor: 'white',
      width: 90,
      height: 30,
      alignSelf: 'flex-end',
      borderRadius: 10,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    }
  });
  

export default ProvideUnlistedGymScreen;