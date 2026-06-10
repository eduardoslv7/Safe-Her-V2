import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Importa as propriedades de navegação do React Navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Importa o tipo de navegação das rotas do AppNavigator
import { RootStackParamList } from "../navigation/AppNavigator";

// Tipagem para as propriedades do componente (passa o tipo de navegação da tela 'TelaPerfil')
type Props = NativeStackScreenProps<RootStackParamList, 'TelaPerfil'>;

export default function TelaPerfil({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER - Cabeçalho com o avatar e informações do perfil */}
      <View style={styles.header}>
 
        {/* Linha com o avatar e as informações do usuário */}
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text> {/* Ícone representando o avatar */}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Carolina Santos</Text> {/* Nome do usuário */}
            <Text style={styles.email}>carol.santos@email.com</Text> {/* Email do usuário */}
            <Text style={styles.date}>Membro desde Mar 2026</Text> {/* Data de cadastro */}
          </View>
        </View>

        {/* Botão para editar o perfil */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Editar Perfil</Text> {/* Texto do botão */}
        </TouchableOpacity>
      </View>

      {/* STATS - Estatísticas do usuário (quantidade de trajetos, contatos, alertas) */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>127</Text> {/* Número de trajetos */}
          <Text style={styles.statLabel}>Trajetos</Text> {/* Rótulo */}
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text> {/* Número de contatos */}
          <Text style={styles.statLabel}>Contatos</Text> {/* Rótulo */}
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text> {/* Número de alertas */}
          <Text style={styles.statLabel}>Alertas</Text> {/* Rótulo */}
        </View>
      </View>

      {/* SEGURANÇA - Configurações de segurança do usuário */}
      <Text style={styles.sectionTitle}>SEGURANÇA</Text> {/* Título da seção de segurança */}

      <View style={styles.card}>
        {/* Opções de configurações de segurança */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🔒</Text> {/* Ícone de privacidade */}
          <Text style={styles.text}>Privacidade e Senha</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta para indicar ação */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🛡️</Text> {/* Ícone de segurança */}
          <Text style={styles.text}>Configurações de Segurança</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta */}
        </TouchableOpacity>
      </View>

      {/* PREFERÊNCIAS - Configurações de preferências do usuário */}
      <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text> {/* Título da seção de preferências */}

      <View style={styles.card}>
        {/* Opções de preferências do usuário */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🔔</Text> {/* Ícone de notificações */}
          <Text style={styles.text}>Notificações</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>⚙️</Text> {/* Ícone de configurações gerais */}
          <Text style={styles.text}>Configurações Gerais</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta */}
        </TouchableOpacity>
      </View>

      {/* AJUDA - Seção de ajuda para o usuário */}
      <Text style={styles.sectionTitle}>AJUDA</Text> {/* Título da seção de ajuda */}

      <View style={styles.card}>
        {/* Opções de ajuda e recursos */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>❓</Text> {/* Ícone de ajuda */}
          <Text style={styles.text}>Central de Ajuda</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>💜</Text> {/* Ícone de apoio */}
          <Text style={styles.text}>Recursos e Apoio</Text> {/* Texto da opção */}
          <Text style={styles.arrow}>›</Text> {/* Ícone de seta */}
        </TouchableOpacity>
      </View>

      {/* LOGOUT - Botão para sair da conta */}
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>🚪 Sair da Conta</Text> {/* Texto do botão */}
      </TouchableOpacity>

      {/* INFO - Informações do aplicativo */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💗 Sua Segurança é Nossa Prioridade</Text> {/* Título informativo */}
        <Text style={styles.infoText}>App desenvolvido para proteção e apoio</Text> {/* Descrição do aplicativo */}
      </View>

    </ScrollView>
  );
}

/* ===================== STYLES ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', // Cor de fundo suave
    padding: 20, // Espaçamento interno
  },

  header: {
    backgroundColor: '#ec4899', // Cor de fundo do cabeçalho
    padding: 20, // Espaçamento interno
    borderRadius: 16, // Bordas arredondadas
    marginBottom: 20, // Margem inferior
  },

  profileRow: {
    flexDirection: 'row', // Organiza os itens em linha
    alignItems: 'center', // Alinha os itens verticalmente no centro
    gap: 12, // Espaço entre os itens
  },

  avatar: {
    width: 70, // Largura do avatar
    height: 70, // Altura do avatar
    borderRadius: 35, // Bordas arredondadas (formato circular)
    backgroundColor: 'rgba(255,255,255,0.2)', // Cor de fundo do avatar
    justifyContent: 'center', // Centraliza o conteúdo dentro do avatar
    alignItems: 'center', // Centraliza o conteúdo dentro do avatar
  },

  avatarText: {
    fontSize: 28, // Tamanho do ícone no avatar
  },

  name: {
    color: 'white', // Cor do nome
    fontSize: 18, // Tamanho da fonte
    fontWeight: 'bold', // Texto em negrito
  },

  email: {
    color: '#ffe4f0', // Cor do email
    fontSize: 12, // Tamanho da fonte
  },

  date: {
    color: '#ffe4f0', // Cor da data
    fontSize: 10, // Tamanho da fonte
  },

  editButton: {
    marginTop: 15, // Margem superior
    backgroundColor: 'rgba(255,255,255,0.2)', // Cor de fundo do botão
    padding: 10, // Espaçamento interno
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center', // Centraliza o conteúdo
  },

  editText: {
    color: 'white', // Cor do texto do botão
    fontWeight: '600', // Texto em peso médio
  },

  stats: {
    flexDirection: 'row', // Organiza os itens em linha
    justifyContent: 'space-between', // Espaçamento entre os itens
    marginBottom: 20, // Margem inferior
  },

  statBox: {
    flex: 1, // Ocupa o espaço disponível igualmente
    backgroundColor: 'white', // Cor de fundo do box
    margin: 4, // Margem ao redor do box
    padding: 15, // Espaçamento interno
    borderRadius: 12, // Bordas arredondadas
    alignItems: 'center', // Alinha o conteúdo ao centro
  },

  statNumber: {
    fontSize: 20, // Tamanho grande para o número
    fontWeight: 'bold', // Texto em negrito
    color: '#ec4899', // Cor do número
  },

  statLabel: {
    fontSize: 12, // Tamanho pequeno para o rótulo
    color: '#666', // Cor do rótulo
  },

  sectionTitle: {
    fontSize: 12, // Tamanho do texto
    fontWeight: 'bold', // Texto em negrito
    color: '#666', // Cor do texto
    marginTop: 20, // Margem superior
    marginBottom: 10, // Margem inferior
  },

  card: {
    backgroundColor: 'white', // Cor de fundo do card
    borderRadius: 12, // Bordas arredondadas
    marginBottom: 15, // Margem inferior entre os cards
    overflow: 'hidden', // Garante que o conteúdo não ultrapasse as bordas
  },

  row: {
    flexDirection: 'row', // Organiza os itens em linha
    alignItems: 'center', // Alinha os itens verticalmente
    padding: 15, // Espaçamento interno
    borderBottomWidth: 1, // Borda inferior
    borderBottomColor: '#eee', // Cor da borda inferior
  },

  icon: {
    fontSize: 18, // Tamanho do ícone
    marginRight: 10, // Margem à direita do ícone
  },

  text: {
    flex: 1, // Ocupa o espaço restante
    fontSize: 14, // Tamanho do texto
    color: '#333', // Cor do texto
  },

  arrow: {
    fontSize: 18, // Tamanho da seta
    color: '#aaa', // Cor da seta
  },

  logout: {
    marginTop: 20, // Margem superior para o botão de logout
    padding: 15, // Espaçamento interno
    backgroundColor: '#ffe4e6', // Cor de fundo do botão
    borderRadius: 12, // Bordas arredondadas
    alignItems: 'center', // Centraliza o conteúdo
  },

  logoutText: {
    color: '#ef4444', // Cor do texto de logout
    fontWeight: 'bold', // Texto em negrito
  },

  infoBox: {
    marginTop: 20, // Margem superior
    padding: 15, // Espaçamento interno
    backgroundColor: '#fdf2f8', // Cor de fundo do box
    borderRadius: 12, // Bordas arredondadas
    alignItems: 'center', // Centraliza o conteúdo
  },

  infoTitle: {
    fontWeight: 'bold', // Texto em negrito
    marginBottom: 5, // Margem inferior
  },

  infoText: {
    fontSize: 12, // Tamanho do texto
    color: '#666', // Cor do texto
    textAlign: 'center', // Alinha o texto ao centro
  },

  version: {
    fontSize: 10, // Tamanho do texto da versão
    marginTop: 5, // Margem superior
    color: '#999', // Cor do texto
  },
});