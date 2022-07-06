import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';


const Signin = () =>(
  <AmplifyAuthenticator >
      <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
  </AmplifyAuthenticator>
)
export default Signin;