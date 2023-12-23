import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createProfile } from 'graphql/mutations';

const handleSignUp = async ({ username, email, password }) => {
  try {
    const { userId } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          preferred_username: username
        },
        autoSignIn: true
      }
    });
    return true;
  } catch (error) {
    console.log('error signing up:', error);
    return false;
  }
};

const handleConfirmSignUp = async ({ email, username, confirmationCode }) => {
  try {
    const client = generateClient();
    console.log(username);
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: confirmationCode
    });

    await autoSignIn();

    if (isSignUpComplete) {
      await client.graphql({
        query: createProfile,
        variables: { input: {
          username,
        }}
      });
    }

    return isSignUpComplete;
  } catch (error) {
    console.log('error confirming sign up', error);
    return false;
  }
};

export { handleSignUp, handleConfirmSignUp };