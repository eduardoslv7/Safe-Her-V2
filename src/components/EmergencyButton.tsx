import React, { useState } from 'react';

import {
  Alert, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
  Vibration, 
  View, 
} from 'react-native';
 
import { colors, fontSize, spacing } from '../styles/colors';

interface EmergencyButtonProps {
  contacts?: Array<{ name: string; phone: string }>; 
}

// Componente principal
export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  contacts = [], 
}) => {

  // Estado: controla se o SOS está ativado
  const [isActivated, setIsActivated] = useState(false);

  // Estado: guarda o timer do botão pressionado
  const [pressTimer, setPressTimer] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  // Quando o usuário COMEÇA a pressionar o botão
  const handlePressIn = () => {
    // Vibração rápida de feedback
    Vibration.vibrate(100);

    // Inicia um timer de 3 segundos
    const timer = setTimeout(() => {
      activateEmergency(); // ativa o SOS se segurar por 3s
    }, 3000);

    // Salva o timer no estado
    setPressTimer(timer);
  };

  // Quando o usuário SOLTA o botão
  const handlePressOut = () => {
    // Se ainda existir um timer, cancela
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  // Função que ativa o modo emergência
  const activateEmergency = () => {

    // Marca como ativado
    setIsActivated(true);

    // Vibração mais forte (padrão)
    Vibration.vibrate([0, 400, 200, 400]);

    // Se houver contatos cadastrados
    if (contacts.length > 0) {
      Alert.alert(
        '🚨 SOS ATIVADO',

        // Lista os nomes dos contatos
        `Notificação enviada para ${contacts.length} contato(s):\n${contacts
          .map(c => c.name)
          .join(', ')}`,

        [
          {
            text: 'OK',
            onPress: () => setIsActivated(false), // reseta estado
          },
        ]
      );
    } else {
      // Caso não tenha contatos
      Alert.alert(
        '⚠️ Atenção',
        'Você não possui contatos de emergência cadastrados.',
        [
          {
            text: 'OK',
            onPress: () => setIsActivated(false),
          },
        ]
      );
    }
  };

  // JSX (interface visual do componente)
  return (
    <View style={styles.container}>

      {/* BOTÃO SOS */}
      <TouchableOpacity
        style={[
          styles.sosButton,
          isActivated && styles.sosButtonActivated, 
        ]}
        onPressIn={handlePressIn}   
        onPressOut={handlePressOut} 
        activeOpacity={0.8}         
      >
        <Text style={styles.sosText}>SOS</Text>

        <Text style={styles.sosSubtext}>
          {isActivated ? 'ATIVADO!' : 'Pressione 3s'}
        </Text>
      </TouchableOpacity>

      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          Pressione e segure por 3 segundos para ativar o alerta de emergência
        </Text>
      </View>

    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({

  // Container principal 
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },

  // Botão SOS
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    backgroundColor: colors.red[600],
    justifyContent: 'center',
    alignItems: 'center',

    // Sombra iOS
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,

    // Sombra Android
    elevation: 12,

    borderWidth: 6,
    borderColor: colors.white,
  },

  // Estilo quando ativado
  sosButtonActivated: {
    backgroundColor: colors.red[700],
    transform: [{ scale: 1.1 }], 
  },

  // Texto "SOS"
  sosText: {
    fontSize: fontSize['4xl'],
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 2,
  },

  // Texto pequeno
  sosSubtext: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.white,
    marginTop: spacing.xs,
    opacity: 0.9,
  },

  // Container do texto explicativo
  instructionContainer: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },

  // Texto explicativo
  instruction: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },
});