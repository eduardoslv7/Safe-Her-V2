import { useState } from "react";
// Importa componentes do React Native para construir a interface e as interações
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Importa a tipagem para as propriedades da navegação
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Importa o tipo de navegação (tipagem para as rotas)
import { RootStackParamList } from "../navigation/AppNavigator";

// Ajuste o import de estilos para caminhos relativos
import { borderRadius, fontSize, spacing } from "../styles/colors";

// Tipagem para as propriedades da tela (informando que a tela é uma rota da pilha de navegação)
type Props = NativeStackScreenProps<RootStackParamList, 'TelaEmergencia'>;

export default function TelaEmergencia({ navigation }: Props) {
  // Estado que controla se o alerta está ativado ou não
  const [alertaAtivado, setAlertaAtivado] = useState(false);

  // Função que alterna o estado do alerta
  const toggleAlerta = () => {
    const novoEstado = !alertaAtivado; // Inverte o estado do alerta
    setAlertaAtivado(novoEstado); // Atualiza o estado

    // Exibe o alerta correspondente
    if (novoEstado) {
      Alert.alert("🚨 ALERTA ATIVADO", "Seus contatos serão notificados!"); // Se ativado
    } else {
      Alert.alert("Alerta desativado", "Você está em segurança."); // Se desativado
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Título da tela */}
        <Text style={styles.title}>Emergência SOS</Text>
        {/* Subtítulo explicativo */}
        <Text style={styles.subtitle}>Ative o alerta em situações de perigo</Text>
      </View>

      {/* STATUS - Exibe a barra de alerta se o alerta estiver ativado */}
      {alertaAtivado && (
        <View style={styles.alertBar}>
          <Text style={styles.alertText}>🚨 ALERTA ATIVADO!</Text>
        </View>
      )}

      {/* BOTÃO CENTRAL - Botão principal para ativar/desativar o alerta */}
      <View style={styles.center}>
        <Text style={styles.helpTitle}>Pressione para pedir ajuda</Text>
        <Text style={styles.helpSubtitle}>Seus contatos serão notificados</Text>

        <TouchableOpacity
          style={[ // Estilo do botão SOS
            styles.sosButton,
            alertaAtivado ? styles.sosActive : styles.sosInactive, // Altera o estilo dependendo do estado
          ]}
          onPress={toggleAlerta} // Chama a função para alternar o alerta
        >
          <Text style={styles.sosIcon}>🚨</Text> {/* Ícone de emergência */}
          <Text style={styles.sosText}>{alertaAtivado ? "CANCELAR" : "SOS"} {/* Texto do botão: SOS ou CANCELAR */}</Text>
          <Text style={styles.sosSubText}>{alertaAtivado ? "Toque para cancelar" : "Toque para ativar"} {/* Texto explicativo */}</Text>
        </TouchableOpacity>
      </View>

      {/* AÇÕES RÁPIDAS - Lista de ações rápidas para emergência */}
      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        {/* Botão para ligar para a polícia */}
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionTitle}>📞 Ligar 190</Text>
          <Text style={styles.actionDesc}>Polícia Militar</Text>
        </TouchableOpacity>

        {/* Botão para ligar para o atendimento à mulher */}
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionTitle}>📞 Ligar 180</Text>
          <Text style={styles.actionDesc}>Central de Atendimento à Mulher</Text>
        </TouchableOpacity>

        {/* Botão para enviar SMS para contatos cadastrados */}
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionTitle}>💬 Enviar SMS</Text>
          <Text style={styles.actionDesc}>Para contatos cadastrados</Text>
        </TouchableOpacity>

        {/* Botão para ativar alarme sonoro */}
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionTitle}>🔊 Alarme Sonoro</Text>
          <Text style={styles.actionDesc}>Som alto de emergência</Text>
        </TouchableOpacity>
      </View>

      {/* INFO - Exibe informações importantes sobre o alerta */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>⚠️ Informações Importantes</Text>
        <Text style={styles.infoText}>
          • Envia localização em tempo real{"\n"}
          • Contatos recebem notificação{"\n"}
          • Em perigo real, ligue 190 imediatamente
        </Text>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },

  container: {
    padding: spacing.lg, // Espaçamento geral da tela
  },

  header: {
    backgroundColor: '#EF4444', // Cor de fundo do cabeçalho
    padding: spacing.lg, // Espaçamento interno do cabeçalho
    borderRadius: borderRadius.lg, // Borda arredondada
  },

  title: {
    fontSize: fontSize['2xl'], // Tamanho grande para o título
    fontWeight: 'bold', // Texto em negrito
    color: 'white', // Cor do texto
  },

  subtitle: {
    color: '#FECACA', // Cor do subtítulo
    marginTop: 4, // Margem superior para o subtítulo
  },

  alertBar: {
    backgroundColor: '#DC2626', // Cor de fundo da barra de alerta
    padding: spacing.md, // Espaçamento interno
    marginTop: spacing.md, // Margem superior
    borderRadius: borderRadius.lg, // Borda arredondada
  },

  alertText: {
    color: 'white', // Cor do texto do alerta
    fontWeight: 'bold', // Texto em negrito
    textAlign: 'center', // Alinha o texto ao centro
  },

  center: {
    alignItems: 'center', // Centraliza os itens
    marginTop: spacing.xl, // Margem superior
  },

  helpTitle: {
    fontSize: fontSize.lg, // Tamanho grande para o título
    fontWeight: 'bold', // Texto em negrito
    color: '#111827', // Cor do título
  },

  helpSubtitle: {
    color: '#6B7280', // Cor do subtítulo
    marginBottom: spacing.lg, // Margem inferior
  },

  sosButton: {
    width: 220, // Largura do botão
    height: 220, // Altura do botão
    borderRadius: 110, // Borda arredondada (botão circular)
    justifyContent: 'center', // Alinha o conteúdo ao centro
    alignItems: 'center', // Alinha o conteúdo ao centro
  },

  sosInactive: {
    backgroundColor: '#EF4444', // Cor do botão quando o alerta não está ativado
  },

  sosActive: {
    backgroundColor: '#B91C1C', // Cor do botão quando o alerta está ativado
  },

  sosIcon: {
    fontSize: 40, // Tamanho do ícone
    marginBottom: 8, // Margem inferior para o ícone
  },

  sosText: {
    fontSize: 24, // Tamanho do texto
    fontWeight: 'bold', // Texto em negrito
    color: 'white', // Cor do texto
  },

  sosSubText: {
    fontSize: 12, // Tamanho do subtítulo
    color: 'rgba(255,255,255,0.8)', // Cor do subtítulo (semi-transparente)
  },

  actions: {
    marginTop: spacing.xl, // Margem superior para as ações
  },

  sectionTitle: {
    fontWeight: 'bold', // Texto em negrito
    marginBottom: spacing.md, // Margem inferior
    color: '#111827', // Cor do título
  },

  actionCard: {
    backgroundColor: 'white', // Cor de fundo do cartão de ação
    padding: spacing.md, // Espaçamento interno
    borderRadius: borderRadius.lg, // Borda arredondada
    marginBottom: spacing.sm, // Margem inferior
  },

  actionTitle: {
    fontWeight: 'bold', // Texto em negrito
    color: '#111827', // Cor do título
  },

  actionDesc: {
    fontSize: 12, // Tamanho do texto descritivo
    color: '#6B7280', // Cor do texto descritivo
  },

  infoBox: {
    backgroundColor: '#FEFCE8', // Cor de fundo da caixa de informações
    borderWidth: 1, // Largura da borda
    borderColor: '#FDE68A', // Cor da borda
    padding: spacing.md, // Espaçamento interno
    borderRadius: borderRadius.lg, // Borda arredondada
    marginTop: spacing.lg, // Margem superior
  },

  infoTitle: {
    fontWeight: 'bold', // Texto em negrito
    color: '#92400E', // Cor do título
    marginBottom: 6, // Margem inferior
  },

  infoText: {
    fontSize: 12, // Tamanho do texto
    color: '#A16207', // Cor do texto
  },
});