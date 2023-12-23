import { signIn, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { setGenericPassword, getGenericPassword } from 'react-native-keychain';


const handleSignIn = async ({ email, password }) => {
    try {
        const { isSignedIn, nextStep } = await signIn({ 
            username: email,
            password: password, 
        });
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

        await setGenericPassword(username, accessToken.jwtToken, {
            service: 'access_token',
        });

        await setGenericPassword(username, idToken.jwtToken, {
            service: 'id_token',
        });

        return true;
    } catch (error) {
        console.log('error signing in', error);
        return false;
    }
};

const handleCheckSession = async () => {
    try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    // try {
    //     const accessToken = await getGenericPassword({ service: 'access_token' });
    //     const idToken = await getGenericPassword({ service: 'id_token' });

    //     return accessToken && idToken;
    // } catch (error) {
    //     console.error('Error checking user session:', error);
    //     return false;
    // }
  };

export { handleSignIn, handleCheckSession };