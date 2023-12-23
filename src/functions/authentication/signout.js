import { signOut } from 'aws-amplify/auth';

const handleSignOut = async () => {
  try {
    await signOut();
    return true;
  } catch (error) {
    return false;
    console.log('error signing out: ', error);
  }
}

export { handleSignOut };