import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, SafeAreaView as RNSafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Feather } from '@expo/vector-icons';
import Text from 'components/text';
import SafeAreaView from 'components/view';
import { AntDesign } from '@expo/vector-icons';
import { openSettings } from 'expo-linking';
import { generateClient } from 'aws-amplify/api';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const client = generateClient();
      const query_str = `
      query MyQuery {
        getMachine(id: "${data}") {
          exercises {
            items {
              exercise {
                hasWeight
                difficulty
                incrementPR
                id
                lottie
                name
                muscles {
                  items {
                    muscle {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
          increment
          name
        }
      }`;
      
      const result = await client.graphql({
        query: query_str
      });

      setScanned(true);
      if (result.data.getMachine.exercises.items.length === 1) {
        navigation.navigate('ExerciseDetail', { data: result.data.getMachine.exercises.items[0], machine_name:  result.data.getMachine.name, machine_increment: result.data.getMachine.increment});
      } else if (result.data.getMachine.exercises.items.length > 1) {
        navigation.navigate('ListExerciseDetails', { data: result.data.getMachine });
      }
      setScanned(false);

    } catch (err) {
      setScanned(false);
    };
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView>
        <View style={{height: '50%', width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
          <Text>Requesting for camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView>
        <View style={{paddingHorizontal: 12}}>
          <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Workouts')}>
                  <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
          </View>
          <View style={{height: '100%', width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 36, fontFamily: 'Inter-Light'}}>No camera access</Text>
            <Text style={{textAlign: 'center', fontSize: 12, marginVertical: 4}}>We currently don't have access to your camera. To fully experience our app, please allow access to camera.
            </Text>
            <TouchableOpacity onPress={openSettings}>
              <Text style={{color: "#6388EC", fontFamily: 'Inter-Bold'}}>Privacy Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <RNSafeAreaView style={styles.view}>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={{marginBottom: 56}}>
            <Text style={{marginRight: 56, fontSize: 18, textAlign: 'center', marginBottom: 12}}>Scan the QR codes on the machines at your gym to learn how to use them!</Text>
        </View>
      </RNSafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    view: {
        justifyContent: 'space-between',
        position: 'absolute',
        flexDirection: 'column',
        marginHorizontal: 28,
        width: '100%', 
        height: '100%', 
        backgroundColor: 'transparent'
    },
});

export default ScanScreen;