import { signIn, getCurrentUser } from 'aws-amplify/auth';

const handleSignIn = async ({ email, password }) => {
    try {
        const { isSignedIn, nextStep } = await signIn({ 
            username: email,
            password: password, 
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
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
  };

export { handleSignIn, handleCheckSession };