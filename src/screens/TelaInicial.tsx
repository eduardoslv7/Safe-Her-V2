import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Importa as propriedades de navegação do React Navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Importa a tipagem das rotas do AppNavigator
import { RootStackParamList } from "../navigation/AppNavigator";

// Importa as variáveis globais de estilo do projeto
import { borderRadius, fontSize, spacing } from "../styles/colors";
 
// Tipagem para as propriedades do componente (passa o tipo de navegação da tela 'Inicio')
type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

export default function TelaInicial({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header - Seção do cabeçalho com o título e ícone */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>🛡️</Text> {/* Exibe o ícone do logo */}
        </View>

        <Text style={styles.title}>Bem-vinda! 💗</Text> {/* Título de boas vindas */}
        <Text style={styles.subtitle}>Sua segurança é nossa prioridade</Text>
      </View>

      {/* Cards - Seção com cards para acessar as funcionalidades principais */}
      <View style={styles.cardsContainer}>

        {/* MAPA - Card para acessar o mapa de segurança */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaMapa")} // Navega para a tela de Mapa
        >
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Text style={styles.cardIcon}>🗺️</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#0369A1' }]}>Mapa de Segurança</Text>
            <Text style={styles.cardDesc}>
              Veja locais seguros e áreas de risco próximas a você
            </Text>
          </View>
        </TouchableOpacity>

        {/* EMERGÊNCIA - Card para acionar o alerta de emergência (Destacado em vermelho) */}
        <TouchableOpacity
          style={[styles.card, styles.cardEmergency]} // Adiciona o estilo de emergência ao card
          onPress={() => navigation.navigate("TelaEmergencia")} // Navega para a tela de emergência
        >
          <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.cardIcon}>🚨</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitleWhite}>Botão de Emergência</Text>
            <Text style={styles.cardDescWhite}>Acione alertas instantâneos para seus contatos</Text>
          </View>
        </TouchableOpacity>

        {/* TRAJETO - Card para compartilhar o trajeto */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaTrajeto")} // Navega para a tela de Trajeto
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
            <Text style={styles.cardIcon}>📍</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#B91C1C' }]}>Compartilhar Trajeto</Text>
            <Text style={styles.cardDesc}>
              Configure seu caminho e envie para seus contatos
            </Text>
          </View>
        </TouchableOpacity>

        {/* CONTATOS - Card para gerenciar contatos de emergência */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaContatos")} // Navega para a tela de Contatos
        >
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Text style={styles.cardIcon}>👥</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#0369A1' }]}>Contatos de Emergência</Text>
            <Text style={styles.cardDesc}>
              Gerencie quem será avisado em caso de emergência
            </Text>
          </View>
        </TouchableOpacity>

        {/* PRIMEIRO DATE - Card focado na proteção do encontro */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaPrimeiroDate")} // Navega para a tela de Encontro
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FCE7F3' }]}>
            <Text style={styles.cardIcon}>🌸</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: '#BE185D' }]}>Primeiro Encontro</Text>
            <Text style={styles.cardDesc}>
              Vai marcar um date? Ative as configurações de proteção ideais aqui
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* Stats - Seção para exibir as estatísticas de uso */}
      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Estatísticas de Hoje</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Trajetos</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Contatos</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2h</Text>
            <Text style={styles.statLabel}>Protegida</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

/* ================= STYLES OTIMIZADOS ================= */
const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: '#FFF0F5',
  },

  header: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9A8D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    elevation: 2,
  },

  logo: {
    fontSize: 32,
  },

  title: {
    fontSize: fontSize['2xl'],
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    color: '#6B7280',
    marginTop: 4,
  },

  cardsContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  // Ajustado o card para Row, permitindo o ícone ficar ao lado do texto
  card: {
    backgroundColor: 'white',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  cardEmergency: {
    backgroundColor: '#EF4444',
  },

  // Pequeno círculo interno para envelopar o emoji do card de forma bonita
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  cardIcon: {
    fontSize: 22,
  },

  cardContent: {
    flex: 1, // Faz com que o container do texto ocupe o restante do card de forma segura
  },

  cardTitle: {
    fontSize: fontSize.base,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  cardDesc: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },

  cardTitleWhite: {
    fontSize: fontSize.base,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },

  cardDescWhite: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 18,
  },

  stats: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },

  statsTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
    color: '#6B7280',
    fontWeight: '600',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: '#EC4899',
  },

  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});