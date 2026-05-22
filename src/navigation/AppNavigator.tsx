import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

// TELAS 
import TelaInicial from '../screens/TelaInicial'; 
import TelaEmergencia from '../screens/TelaEmergencia'; 
import TelaContatos from '../screens/TelaContatos'; 
import TelaMapa from '../screens/TelaMapa'; 
import TelaPerfil from '../screens/TelaPerfil'; 
import TelaTrajeto from '../screens/TelaTrajeto'; 
import TelaLogin from '../screens/TelaLogin';
import TelaPrimeiroDate from '../screens/TelaPrimeiroDate'; // 1. Corrigido: Importado com sucesso!

// TIPAGEM 
export type RootStackParamList = { 
  TelaLogin: undefined;
  Inicio: undefined; 
  TelaEmergencia: undefined; 
  TelaContatos: undefined; 
  TelaMapa: undefined; 
  TelaPerfil: undefined; 
  TelaTrajeto: undefined; 
  TelaPrimeiroDate: undefined; // 2. Corrigido: Tipado para o TypeScript aceitar!
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() { 
  return ( 
    <NavigationContainer> 
      <Stack.Navigator id="root" initialRouteName="TelaLogin">
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={TelaInicial} /> 
        <Stack.Screen name="TelaEmergencia" component={TelaEmergencia} /> 
        <Stack.Screen name="TelaContatos" component={TelaContatos} /> 
        <Stack.Screen name="TelaMapa" component={TelaMapa} /> 
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} /> 
        <Stack.Screen name="TelaTrajeto" component={TelaTrajeto} /> 
        <Stack.Screen name="TelaPrimeiroDate" component={TelaPrimeiroDate} /> 
      </Stack.Navigator> 
    </NavigationContainer> 
  ); 
}