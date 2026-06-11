import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Tipagem para as propriedades do componente 
type Props = NativeStackScreenProps<RootStackParamList, 'TelaPerfil'>;

export default function TelaPerfil({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
 
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text> 
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Carolina Santos</Text> 
            <Text style={styles.email}>carol.santos@email.com</Text> 
            <Text style={styles.date}>Membro desde Mar 2026</Text> 
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Editar Perfil</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>127</Text> 
          <Text style={styles.statLabel}>Trajetos</Text> 
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text> 
          <Text style={styles.statLabel}>Contatos</Text> 
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text> 
          <Text style={styles.statLabel}>Alertas</Text> 
        </View>
      </View>

      <Text style={styles.sectionTitle}>SEGURANÇA</Text> 

      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🔒</Text> 
          <Text style={styles.text}>Privacidade e Senha</Text> 
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🛡️</Text> 
          <Text style={styles.text}>Configurações de Segurança</Text> 
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text> 

      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>🔔</Text> 
          <Text style={styles.text}>Notificações</Text> 
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>⚙️</Text> 
          <Text style={styles.text}>Configurações Gerais</Text> 
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>AJUDA</Text> 

      <View style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>❓</Text> 
          <Text style={styles.text}>Central de Ajuda</Text> 
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.icon}>💜</Text> 
          <Text style={styles.text}>Recursos e Apoio</Text>
          <Text style={styles.arrow}>›</Text> 
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>🚪 Sair da Conta</Text> 
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💗 Sua Segurança é Nossa Prioridade</Text> 
        <Text style={styles.infoText}>App desenvolvido para proteção e apoio</Text> 
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5', 
    padding: 20, 
  },

  header: {
    backgroundColor: '#ec4899', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 20, 
  },

  profileRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
  },

  avatar: {
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  avatarText: {
    fontSize: 28, 
  },

  name: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },

  email: {
    color: '#ffe4f0', 
    fontSize: 12, 
  },

  date: {
    color: '#ffe4f0', 
    fontSize: 10, 
  },

  editButton: {
    marginTop: 15, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center', 
  },

  editText: {
    color: 'white', 
    fontWeight: '600', 
  },

  stats: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
  },

  statBox: {
    flex: 1, 
    backgroundColor: 'white', 
    margin: 4, 
    padding: 15, 
    borderRadius: 12,
    alignItems: 'center', 
  },

  statNumber: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#ec4899', 
  },

  statLabel: {
    fontSize: 12, 
    color: '#666', 
  },

  sectionTitle: {
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#666', 
    marginTop: 20, 
    marginBottom: 10, 
  },

  card: {
    backgroundColor: 'white', 
    borderRadius: 12, 
    marginBottom: 15, 
    overflow: 'hidden', 
  },

  row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
  },

  icon: {
    fontSize: 18, 
    marginRight: 10, 
  },

  text: {
    flex: 1,
    fontSize: 14, 
    color: '#333', 
  },

  arrow: {
    fontSize: 18, 
    color: '#aaa', 
  },

  logout: {
    marginTop: 20, 
    padding: 15, 
    backgroundColor: '#ffe4e6', 
    borderRadius: 12, 
    alignItems: 'center', 
  },

  logoutText: {
    color: '#ef4444', 
    fontWeight: 'bold', 
  },

  infoBox: {
    marginTop: 20, 
    padding: 15, 
    backgroundColor: '#fdf2f8', 
    borderRadius: 12, 
    alignItems: 'center', 
  },

  infoTitle: {
    fontWeight: 'bold', 
    marginBottom: 5, 
  },

  infoText: {
    fontSize: 12, 
    color: '#666', 
    textAlign: 'center', 
  },

  version: {
    fontSize: 10, 
    marginTop: 5, 
    color: '#999', 
  },
});