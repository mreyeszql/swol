import { signUp, confirmSignUp } from 'aws-amplify/auth';

const handleSignUp = async ({ username, email, password }) => {
  try {
    const { userId } = await signUp({
      username: email,
      password: password,
      options: {
        autoSignIn: true
      }
    });
    return true;
  } catch (error) {
    console.log('error signing up:', error);
    return false;
  }
};

const handleConfirmSignUp = async ({ email, confirmationCode }) => {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: confirmationCode
    });
    return true;
  } catch (error) {
    console.log('error confirming sign up', error);
    return false;
  }
};

export { handleSignUp, handleConfirmSignUp };