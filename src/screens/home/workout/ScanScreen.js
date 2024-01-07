import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Feather } from '@expo/vector-icons';
import Text from 'components/text';

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('ExerciseDetail', { data });
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={styles.view}>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={{marginBottom: 56}}>
            <Text style={{marginRight: 56, fontSize: 18, textAlign: 'center', marginBottom: 12}}>Scan the QR codes on the machines at your gym to learn how to use them!</Text>
            <TouchableOpacity style={{marginRight: 56}}>
                <Text style={{fontSize: 12, textAlign: 'center', color: '#6388EC', textDecorationLine: 'underline'}}>No QR codes at your gym? Let us know.</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      
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