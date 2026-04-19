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
        <Text style={styles.subtitle}>Sua segurança é nossa prioridade {/* Subtítulo explicativo */}</Text>
      </View>

      {/* Cards - Seção com cards para acessar as funcionalidades principais */}
      <View style={styles.cardsContainer}>

        {/* MAPA - Card para acessar o mapa de segurança */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaMapa")} // Navega para a tela de Mapa
        >
          <Text style={styles.cardTitle}>Mapa de Segurança</Text> {/* Título do card */}
          <Text style={styles.cardDesc}>
            Veja locais seguros e áreas de risco próximas a você {/* Descrição */}
          </Text>
        </TouchableOpacity>

        {/* EMERGÊNCIA - Card para acionar o alerta de emergência */}
        <TouchableOpacity
          style={[styles.card, styles.cardEmergency]} // Adiciona o estilo de emergência ao card
          onPress={() => navigation.navigate("TelaEmergencia")} // Navega para a tela de emergência
        >
          <Text style={styles.cardTitleWhite}>Botão de Emergência</Text> {/* Título em branco */}
          <Text style={styles.cardDescWhite}>Acione alertas instantâneos para seus contatos</Text> {/* Descrição em branco */}
        </TouchableOpacity>

        {/* TRAJETO - Card para compartilhar o trajeto */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaTrajeto")} // Navega para a tela de Trajeto
        >
          <Text style={styles.cardTitle}>Compartilhar Trajeto</Text> {/* Título do card */}
          <Text style={styles.cardDesc}>
            Configure seu caminho e envie para seus contatos {/* Descrição */}
          </Text>
        </TouchableOpacity>

        {/* CONTATOS - Card para gerenciar contatos de emergência */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TelaContatos")} // Navega para a tela de Contatos
        >
          <Text style={styles.cardTitle}>Contatos de Emergência</Text> {/* Título do card */}
          <Text style={styles.cardDesc}>
            Gerencie quem será avisado em caso de emergência {/* Descrição */}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Stats - Seção para exibir as estatísticas de uso */}
      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Estatísticas de Hoje</Text> {/* Título da seção de estatísticas */}

        {/* Linha de estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text> {/* Número de trajetos */}
            <Text style={styles.statLabel}>Trajetos</Text> {/* Rótulo */}
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text> {/* Número de contatos */}
            <Text style={styles.statLabel}>Contatos</Text> {/* Rótulo */}
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2h</Text> {/* Tempo de proteção */}
            <Text style={styles.statLabel}>Protegida</Text> {/* Rótulo */}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF0F5', // Cor de fundo suave para a área segura
  },

  container: {
    padding: spacing.lg, // Espaçamento grande ao redor do conteúdo
  },

  header: {
    alignItems: 'center', // Centraliza o conteúdo no header
    marginTop: spacing.lg, // Margem superior
    marginBottom: spacing.lg, // Margem inferior
  },

  logoCircle: {
    width: 80, // Largura do círculo do logo
    height: 80, // Altura do círculo do logo
    borderRadius: 40, // Borda arredondada para o logo ser um círculo
    backgroundColor: '#F9A8D4', // Cor de fundo do círculo
    justifyContent: 'center', // Alinha o conteúdo ao centro
    alignItems: 'center', // Alinha o conteúdo ao centro
    marginBottom: spacing.md, // Margem inferior para espaçamento
  },

  logo: {
    fontSize: 32, // Tamanho do ícone dentro do círculo
  },

  title: {
    fontSize: fontSize['2xl'], // Tamanho do título
    fontWeight: 'bold', // Texto em negrito
    color: '#111827', // Cor do título
  },

  subtitle: {
    color: '#6B7280', // Cor do subtítulo
    marginTop: 4, // Margem superior
  },

  cardsContainer: {
    gap: spacing.md, // Espaçamento entre os cards
    marginBottom: spacing.lg, // Margem inferior para espaçamento
  },

  card: {
    backgroundColor: 'white', // Cor de fundo do card
    padding: spacing.lg, // Espaçamento interno do card
    borderRadius: borderRadius.lg, // Borda arredondada
  },

  cardEmergency: {
    backgroundColor: '#EF4444', // Cor de fundo do card de emergência (vermelho)
  },

  cardTitle: {
    fontSize: fontSize.lg, // Tamanho do título do card
    fontWeight: 'bold', // Texto em negrito
    color: '#111827', // Cor do título
    marginBottom: 4, // Margem inferior para o título
  },

  cardDesc: {
    color: '#6B7280', // Cor da descrição
  },

  cardTitleWhite: {
    fontSize: fontSize.lg, // Tamanho do título do card (em branco)
    fontWeight: 'bold', // Texto em negrito
    color: 'white', // Cor branca para o título
    marginBottom: 4, // Margem inferior para o título
  },

  cardDescWhite: {
    color: 'rgba(255,255,255,0.9)', // Cor da descrição branca e semi-transparente
  },

  stats: {
    backgroundColor: 'white', // Cor de fundo das estatísticas
    padding: spacing.lg, // Espaçamento interno das estatísticas
    borderRadius: borderRadius.lg, // Borda arredondada
  },

  statsTitle: {
    textAlign: 'center', // Centraliza o título das estatísticas
    marginBottom: spacing.md, // Margem inferior
    color: '#6B7280', // Cor do título
    fontWeight: '600', // Texto com peso médio
  },

  statsRow: {
    flexDirection: 'row', // Organiza as estatísticas em linha
    justifyContent: 'space-between', // Espaçamento entre as colunas
  },

  statBox: {
    alignItems: 'center', // Centraliza o conteúdo dentro do box
    flex: 1, // Ocupa o mesmo espaço nas colunas
  },

  statNumber: {
    fontSize: fontSize.xl, // Tamanho grande para o número
    fontWeight: 'bold', // Texto em negrito
    color: '#EC4899', // Cor do número
  },

  statLabel: {
    fontSize: 12, // Tamanho pequeno para o rótulo
    color: '#6B7280', // Cor do rótulo
  },
});