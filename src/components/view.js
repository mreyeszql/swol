import { SafeAreaView as RNSafeAreaView } from 'react-native';

const SafeAreaView = ({ children, style, keyboardShouldPersistTaps }) => {
  return (
    <RNSafeAreaView 
      style={[ style, {
        flex: 1,
        backgroundColor: 'black',
      }]}
      keyboardShouldPersistTaps
    >
      {children}
    </RNSafeAreaView>
  );
};

export default SafeAreaView;
