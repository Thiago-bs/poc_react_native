import * as React from 'react';
import {AUTH_DOMAIN, AUTH_CLIENT_ID} from '../../config'
import * as AuthSession from 'expo-auth-session';

const AuthContext = React.createContext();

const authorizationEndpoint = `${AUTH_DOMAIN}/authorize`;
const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function AuthProvider({ children }){
  
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH_CLIENT_ID,
      responseType: 'id_token',
      scopes: ['openid', 'profile'],
      extraParams: {
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  return (
    <AuthContext.Provider value={{ request, result, promptAsync }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider }