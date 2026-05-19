import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

// TELAS 
import TelaInicial from '../screens/TelaInicial'; 
import TelaEmergencia from '../screens/TelaEmergencia'; 
import TelaContatos from '../screens/TelaContatos'; 
import TelaMapa from '../screens/TelaMapa'; 
import TelaPerfil from '../screens/TelaPerfil'; 
import TelaTrajeto from '../screens/TelaTrajeto'; 

// TIPAGEM 
export type RootStackParamList = { 
  Inicio: undefined; 
  TelaEmergencia: undefined; 
  TelaContatos: undefined; 
  TelaMapa: undefined; 
  TelaPerfil: undefined; 
  TelaTrajeto: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() { 
  return ( 
    <NavigationContainer> 
      <Stack.Navigator id="root" initialRouteName="Inicio">
       <Stack.Screen name="Inicio" component={TelaInicial} /> 
        <Stack.Screen name="TelaEmergencia" component={TelaEmergencia} /> 
        <Stack.Screen name="TelaContatos" component={TelaContatos} /> 
        <Stack.Screen name="TelaMapa" component={TelaMapa} /> 
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} /> 
        <Stack.Screen name="TelaTrajeto" component={TelaTrajeto} /> 
      </Stack.Navigator> 
    </NavigationContainer> 
  ); 
}