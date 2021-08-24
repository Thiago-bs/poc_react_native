import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from './contexts/AuthContex';

const useProxy = Platform.select({ web: false, default: true });

export default function App() {
  const [name, setName] = React.useState(null);
  const { request, result, promptAsync } = React.useContext(AuthContext)
  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          'Error'
        );
        return;
      }
      if (result.type === 'success') {
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log(decoded, 'decoded jwtToken')
        const { given_name } = decoded;
        setName(given_name);
      }
    }
  }, [result]);

  return (
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={styles.title}>Você está logado, {name}!</Text>
          <Button title="Deslogar" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Login"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});