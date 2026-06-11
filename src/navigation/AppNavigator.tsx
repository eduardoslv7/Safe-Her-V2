import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TELAS
import TelaIntroducao from '../screens/TelaIntroducao';
import TelaLogin from '../screens/TelaLogin';
import TelaRegistro from '../screens/TelaRegistro'; //
import TelaInicial from '../screens/TelaInicial';
import TelaEmergencia from '../screens/TelaEmergencia';
import TelaContatos from '../screens/TelaContatos';
import TelaMapa from '../screens/TelaMapa';
import TelaPerfil from '../screens/TelaPerfil';
import TelaTrajeto from '../screens/TelaTrajeto';
import TelaPrimeiroDate from '../screens/TelaPrimeiroDate';
 
export type RootStackParamList = {
  TelaIntroducao: undefined;
  TelaLogin: undefined;
  TelaRegistro: undefined;
  Inicio: undefined;
  TelaEmergencia: undefined;
  TelaContatos: undefined;
  TelaMapa: undefined;
  TelaPerfil: undefined;
  TelaTrajeto: undefined;
  TelaPrimeiroDate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaIntroducao">
        <Stack.Screen
          name="TelaIntroducao"
          component={TelaIntroducao}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TelaRegistro"
          component={TelaRegistro}
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="Inicio"
          component={TelaInicial}
        />

        <Stack.Screen
          name="TelaEmergencia"
          component={TelaEmergencia}
        />

        <Stack.Screen
          name="TelaContatos"
          component={TelaContatos}
        />

        <Stack.Screen
          name="TelaMapa"
          component={TelaMapa}
        />

        <Stack.Screen
          name="TelaPerfil"
          component={TelaPerfil}
        />

        <Stack.Screen
          name="TelaTrajeto"
          component={TelaTrajeto}
        />

        <Stack.Screen
          name="TelaPrimeiroDate"
          component={TelaPrimeiroDate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}