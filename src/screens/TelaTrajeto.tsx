import { useState } from "react";
// Importa componentes necessários do React Native
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Importa as propriedades de navegação do React Navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Importa o tipo de navegação das rotas do AppNavigator
import { RootStackParamList } from "../navigation/AppNavigator";

// Importa as variáveis globais de estilo
import { borderRadius, fontSize, spacing } from "../styles/colors";

// Tipagem para as propriedades do componente (passa o tipo de navegação da tela 'TelaTrajeto')
type Props = NativeStackScreenProps<RootStackParamList, 'TelaTrajeto'>;

export default function TelaTrajeto({ navigation }: Props) {
  // Estado para controlar se o trajeto está ativo ou não
  const [trajetoAtivo, setTrajetoAtivo] = useState(false);

  // Estados para os alertas de rota e parada, além do GPS
  const [alertaRota, setAlertaRota] = useState(true);
  const [alertaParada, setAlertaParada] = useState(true);
  const [gps, setGps] = useState(false);

  // Dados mockados dos trajetos recentes
  const trajetosRecentes = [
    { origem: "Casa", destino: "Trabalho", horario: "08:00" },
    { origem: "Trabalho", destino: "Academia", horario: "18:30" },
    { origem: "Faculdade", destino: "Casa", horario: "22:00" },
  ];

  // Função para alternar o estado do trajeto (iniciar ou cancelar)
  const toggleTrajeto = () => {
    const novoEstado = !trajetoAtivo;
    setTrajetoAtivo(novoEstado);

    // Exibe um alerta dependendo do estado do trajeto
    Alert.alert(
      novoEstado ? "🚗 Trajeto iniciado" : "Trajeto cancelado",
      novoEstado ? "Seus contatos serão notificados" : "Monitoramento encerrado"
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER - Cabeçalho com o título e subtítulo */}
      <View style={styles.header}>
        <Text style={styles.title}>Compartilhar Trajeto</Text> {/* Título */}
        <Text style={styles.subtitle}>Mantenha seus contatos informados</Text> {/* Subtítulo */}
      </View>

      {/* STATUS - Exibe uma barra de status se o trajeto estiver ativo */}
      {trajetoAtivo && (
        <View style={styles.activeBar}>
          <Text style={styles.activeText}>🚗 Trajeto em andamento</Text> {/* Texto de status */}
        </View>
      )}

      {/* FORM - Formulário para preencher origem, destino e horário do trajeto */}
      <View style={styles.form}>
        <Text style={styles.label}>📍 Origem</Text> {/* Rótulo para origem */}
        <TextInput placeholder="De onde você está saindo?" style={styles.input} /> {/* Caixa de texto para origem */}

        <Text style={styles.label}>🎯 Destino</Text> {/* Rótulo para destino */}
        <TextInput placeholder="Para onde você vai?" style={styles.input} /> {/* Caixa de texto para destino */}

        <Text style={styles.label}>⏰ Horário previsto</Text> {/* Rótulo para horário */}
        <TextInput placeholder="HH:MM" style={styles.input} /> {/* Caixa de texto para horário */}
      </View>

      {/* CONTATOS - Seção para exibir os contatos selecionados */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👥 Contatos selecionados</Text> {/* Título da seção de contatos */}
        <Text style={styles.contact}>✔ Mãe - Maria</Text> {/* Exibe um contato */}
        <Text style={styles.contact}>✔ Amiga - Ana</Text> {/* Exibe outro contato */}
        <Text style={styles.contact}>✔ Irmã - Julia</Text> {/* Exibe mais um contato */}
      </View>

      {/* OPÇÕES - Seção de opções de segurança */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Opções de segurança</Text> {/* Título da seção de opções de segurança */}

        {/* Opção de alerta de desvio de rota */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Alertar desvio de rota</Text>
          <Switch value={alertaRota} onValueChange={setAlertaRota} /> {/* Switch para ativar/desativar alerta de desvio */}
        </View>

        {/* Opção de alerta de parada longa */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Alertar parada longa</Text>
          <Switch value={alertaParada} onValueChange={setAlertaParada} /> {/* Switch para ativar/desativar alerta de parada */}
        </View>

        {/* Opção de GPS frequente */}
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>GPS frequente</Text>
          <Switch value={gps} onValueChange={setGps} /> {/* Switch para ativar/desativar GPS frequente */}
        </View>
      </View>

      {/* BOTÃO - Botão para iniciar ou cancelar o trajeto monitorado */}
      <TouchableOpacity
        style={[styles.button, trajetoAtivo ? styles.buttonOff : styles.buttonOn]} // Altera o estilo do botão dependendo do estado
        onPress={toggleTrajeto} // Chama a função para iniciar ou cancelar o trajeto
      >
        <Text style={styles.buttonText}>{trajetoAtivo ? "Cancelar Trajeto" : "Iniciar Trajeto Monitorado"}</Text> {/* Texto do botão */}
      </TouchableOpacity>

      {/* RECENTES - Exibe os trajetos recentes */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Trajetos recentes</Text> {/* Título da seção de trajetos recentes */}

        {/* Mapeia cada trajeto recente e exibe suas informações */}
        {trajetosRecentes.map((item, i) => (
          <View key={i} style={styles.routeItem}>
            <Text style={styles.routeText}>{item.origem} → {item.destino}</Text> {/* Exibe origem e destino */}
            <Text style={styles.routeSub}>{item.horario}</Text> {/* Exibe o horário do trajeto */}
          </View>
        ))}
      </View>

      {/* DICA - Dica para o usuário */}
      <View style={styles.tip}>
        <Text style={styles.tipTitle}>💡 Dica</Text> {/* Título da dica */}
        <Text style={styles.tipText}>
          Use sempre o modo monitorado em locais desconhecidos ou à noite. {/* Texto da dica */}
        </Text>
      </View>

    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF0F5', // Cor de fundo suave para o aplicativo
  },

  container: {
    padding: spacing.lg, // Espaçamento interno para a tela
  },

  header: {
    backgroundColor: '#A855F7', // Cor de fundo do cabeçalho
    padding: spacing.lg, // Espaçamento interno do cabeçalho
    borderRadius: borderRadius.lg, // Bordas arredondadas
  },

  title: {
    fontSize: fontSize['2xl'], // Tamanho do título
    fontWeight: 'bold', // Texto em negrito
    color: 'white', // Cor do texto
  },

  subtitle: {
    color: '#FBCFE8', // Cor do subtítulo
  },

  activeBar: {
    backgroundColor: '#22C55E', // Cor de fundo da barra de status
    padding: spacing.md, // Espaçamento interno
    marginTop: spacing.md, // Margem superior
    borderRadius: borderRadius.lg, // Bordas arredondadas
  },

  activeText: {
    color: 'white', // Cor do texto da barra de status
    fontWeight: 'bold', // Texto em negrito
  },

  form: {
    marginTop: spacing.lg, // Margem superior para o formulário
  },

  label: {
    fontWeight: '600', // Texto em negrito
    marginTop: spacing.md, // Margem superior
    marginBottom: 6, // Margem inferior
  },

  input: {
    backgroundColor: 'white', // Cor de fundo do campo de entrada
    padding: spacing.md, // Espaçamento interno
    borderRadius: borderRadius.lg, // Bordas arredondadas
    borderWidth: 1, // Largura da borda
    borderColor: '#E5E7EB', // Cor da borda
  },

  card: {
    backgroundColor: 'white', // Cor de fundo do card
    padding: spacing.lg, // Espaçamento interno
    borderRadius: borderRadius.lg, // Bordas arredondadas
    marginTop: spacing.lg, // Margem superior
  },

  sectionTitle: {
    fontWeight: 'bold', // Texto em negrito para o título da seção
    marginBottom: spacing.sm, // Margem inferior
  },

  contact: {
    fontSize: 13, // Tamanho da fonte para os contatos
    marginBottom: 4, // Margem inferior
  },

  switchRow: {
    flexDirection: 'row', // Organiza os itens em linha
    justifyContent: 'space-between', // Espaçamento entre os itens
    marginTop: spacing.sm, // Margem superior
  },

  switchText: {
    fontSize: 13, // Tamanho do texto dos switches
  },

  button: {
    padding: spacing.lg, // Espaçamento interno do botão
    borderRadius: borderRadius.lg, // Bordas arredondadas
    marginTop: spacing.lg, // Margem superior
    alignItems: 'center', // Alinha o conteúdo ao centro
  },

  buttonOn: {
    backgroundColor: '#A855F7', // Cor de fundo do botão quando o trajeto está ativo
  },

  buttonOff: {
    backgroundColor: '#9CA3AF', // Cor de fundo do botão quando o trajeto não está ativo
  },

  buttonText: {
    color: 'white', // Cor do texto do botão
    fontWeight: 'bold', // Texto em negrito
  },

  routeItem: {
    paddingVertical: spacing.sm, // Espaçamento vertical no item do trajeto
    borderBottomWidth: 1, // Borda inferior
    borderColor: '#eee', // Cor da borda
  },

  routeText: {
    fontWeight: '600', // Texto em negrito para origem e destino
  },

  routeSub: {
    fontSize: 12, // Tamanho da fonte da descrição
    color: '#6B7280', // Cor do texto
  },

  tip: {
    backgroundColor: '#DBEAFE', // Cor de fundo da dica
    padding: spacing.md, // Espaçamento interno
    borderRadius: borderRadius.lg, // Bordas arredondadas
    marginTop: spacing.lg, // Margem superior
  },

  tipTitle: {
    fontWeight: 'bold', // Texto em negrito para o título da dica
    color: '#1E3A8A', // Cor do título
  },

  tipText: {
    fontSize: 12, // Tamanho da fonte da dica
    color: '#1E40AF', // Cor do texto da dica
    marginTop: 4, // Margem superior
  },
});