import { SafeAreaView as RNSafeAreaView } from 'react-native';

const SafeAreaView = ({ children, style }) => {
  return (
    <RNSafeAreaView style={[ style, {
      flex: 1,
      backgroundColor: 'black',
    }]}>
      {children}
    </RNSafeAreaView>
  );
};

export default SafeAreaView;
