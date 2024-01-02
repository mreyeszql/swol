import { signUp, confirmSignUp, autoSignIn, fetchUserAttributes } from 'aws-amplify/auth';
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

const handleConfirmSignUp = async ({ email, confirmationCode }) => {
  try {
    const client = generateClient();
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: confirmationCode
    });

    if (isSignUpComplete) {
      await autoSignIn();
      const { preferred_username, sub } = await fetchUserAttributes();

      await client.graphql({
          query: createProfile,
          variables: { input: {
            username: preferred_username,
            ownerId: sub,
          }}
      });
    };

    return isSignUpComplete;
  } catch (error) {
    console.log('error confirming sign up', error);
    return false;
  }
};

export { handleSignUp, handleConfirmSignUp };