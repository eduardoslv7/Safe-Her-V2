import { AppNavigator } from './src/navigation/AppNavigator';
// Importa o service para registrar a background task antes do app renderizar
import './src/services/trajeto.service';

export default function App() {
  return <AppNavigator />;
}
