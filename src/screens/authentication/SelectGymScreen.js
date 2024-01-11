import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import SafeAreaView from 'components/view';
import { listGyms } from "graphql/queries";
import { generateClient } from "aws-amplify/api";
import { updateProfile } from "graphql/mutations";
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';



const SelectGymScreen = ({ navigation, route }) => {
    const { profile_id } = route.params;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        localHandleFetchGyms();
    },[]);

    const localHandleFetchGyms = async () => {
        const client = generateClient();
        const result = await client.graphql({
            query: listGyms,
        })
        setItems(
            result.data.listGyms.items.map((item) => {
                return {...item, key: item.name, value: item.id}
            })
        );
    };

    const localHandleNext = async () => {
        if (value) {
            const client = generateClient();
            const result = await client.graphql({
                query: updateProfile,
                variables: {
                    id: profile_id,
                    profileGymId: value
                }
            });
            console.log(result);
            navigation.navigate("Tabs");
        }
    }

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
                    <Text style={styles.title}>SELECT GYM</Text>
                    <SelectList 
                        setSelected={(val) => setValue(val)} 
                        data={items} 
                        save="value"
                        fontFamily='Inter-Light'
                        dropdownTextStyles={{color: 'white', fontFamily: 'Inter-Light'}}
                        boxStyles={{borderWidth: 1}}
                        inputStyles={{color: 'white', fontFamily: 'Inter-Light'}}
                        arrowicon={<AntDesign name="down" size={16} color={'white'} style={{paddingTop: 4}} />} 
                        searchicon={<AntDesign name="search1" size={16} color="white" style={{paddingRight: 16}}/>}
                        closeicon={<AntDesign name="close" size={20} color="white" />} 
                    />
                    {/* <DropDownPicker
                        open={open}
                        searchable={true}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select a gym"
                    /> */}
                    <View>
                        <TouchableOpacity style={styles.next} onPress={localHandleNext}>
                        <Text styles={styles.text}>
                            Next
                        </Text>
                        </TouchableOpacity>
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

export default SelectGymScreen;