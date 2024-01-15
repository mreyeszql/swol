import { signIn } from 'aws-amplify/auth';

const handleSignIn = async ({ email, password }) => {
    try {
        const { isSignedIn, nextStep } = await signIn({ 
            username: email.toLowerCase(),
            password: password, 
        });

        return true;
    } catch (error) {
        console.log('error signing in', error);
        return false;
    }
};

export { handleSignIn };