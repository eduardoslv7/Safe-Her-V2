import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { borderRadius, fontSize, spacing } from "../styles/colors";
 
// Tipagem para as propriedades do componente 
type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

export default function TelaInicial({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
    <View style={styles.header}>
          <Image
            source={require('../../assets/logo.jpeg')}
            style={styles.logoImage}
    />

      <Text style={styles.title}>Bem-vinda! 💗</Text>
      <Text style={styles.subtitle}>Sua segurança é nossa prioridade</Text>
    </View>

      <View style={styles.cardsContainer}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaMapa")} 
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

        <TouchableOpacity
          style={[styles.card, styles.cardEmergency]} 
          onPress={() => navigation.navigate("TelaEmergencia")} 
        >
          <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.cardIcon}>🚨</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitleWhite}>Botão de Emergência</Text>
            <Text style={styles.cardDescWhite}>Acione alertas instantâneos para seus contatos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaTrajeto")} 
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

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaContatos")} 
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

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaPrimeiroDate")} 
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

 logoImage: {
  width: 450,
  height: 450,
  resizeMode: 'contain',
  marginBottom: -100,
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
    flex: 1, 
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