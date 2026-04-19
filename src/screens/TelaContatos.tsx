import React from 'react';
// Importa os componentes necessários do React Native para UI e interações
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// Importa o Ionicons para ícones
import Ionicons from 'react-native-vector-icons/Ionicons';
// Importa o LinearGradient para usar gradientes (caso queira aplicar)
import LinearGradient from 'react-native-linear-gradient';

// Tipagem da navegação
import { StackNavigationProp } from '@react-navigation/stack';
// Importa a tipagem para a navegação a partir de AppNavigator
import { RootStackParamList } from '../navigation/AppNavigator'; // Importe o tipo da navegação

// Tipagem para as props da tela
type TelaContatosNavigationProp = StackNavigationProp<RootStackParamList, 'TelaContatos'>;

// Define as propriedades que o componente espera receber
interface Props {
  navigation: TelaContatosNavigationProp;
}

const TelaContatos: React.FC<Props> = ({ navigation }) => {
  // Dados mockados de contatos
  const contatos = [
    {
      nome: 'Maria Silva',
      relacao: 'Mãe',
      telefone: '(11) 99999-1111',
      email: 'maria@email.com',
      principal: true, // Define que é o contato principal
    },
    {
      nome: 'Ana Costa',
      relacao: 'Amiga',
      telefone: '(11) 99999-2222',
      email: 'ana@email.com',
      principal: false, // Define que não é o contato principal
    },
    {
      nome: 'Julia Silva',
      relacao: 'Irmã',
      telefone: '(11) 99999-3333',
      email: 'julia@email.com',
      principal: false, 
    },
    {
      nome: 'Pedro Santos',
      relacao: 'Namorado',
      telefone: '(11) 99999-4444',
      email: 'pedro@email.com',
      principal: false,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contatos de Emergência</Text>
        <Text style={styles.headerSubtitle}>Pessoas que serão notificadas em caso de emergência</Text>
      </View>

      {/* Botão para adicionar novo contato */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-add" size={20} color="white" />
          <Text style={styles.buttonText}>Adicionar Novo Contato</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de contatos */}
      <View style={styles.contactList}>
        <Text style={styles.contactListTitle}>Meus Contatos ({contatos.length})</Text>

        {contatos.map((contato, index) => (
          <View key={index} style={styles.contactCard}>
            {/* Cabeçalho do card */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                {/* Avatar com as iniciais */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{contato.nome.charAt(0)}</Text>
                </View>

                {/* Nome e relação */}
                <View style={styles.contactInfo}>
                  <View style={styles.contactInfoHeader}>
                    <Text style={styles.contactName}>{contato.nome}</Text>
                    {contato.principal && <Ionicons name="star" size={16} color="gold" />} {/* Ícone de estrela se for principal */}
                  </View>
                  <Text style={styles.contactRelation}>
                    {contato.relacao} {contato.principal && '• Contato Principal'}
                  </Text>
                </View>
              </View>

              {/* Botão de remover contato */}
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="trash-outline" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Informações de contato */}
            <View style={styles.contactDetails}>
              <View style={styles.contactDetailRow}>
                <Ionicons name="call" size={16} color="pink" />
                <Text style={styles.contactDetailText}>{contato.telefone}</Text>
              </View>
              <View style={styles.contactDetailRow}>
                <Ionicons name="mail" size={16} color="purple" />
                <Text style={styles.contactDetailText}>{contato.email}</Text>
              </View>
            </View>

            {/* Ações: Editar e tornar principal */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              {!contato.principal && ( // Só exibe o botão "Tornar Principal" se não for principal
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Tornar Principal</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Informações sobre o contato principal */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Ionicons name="shield" size={20} color="yellow" />
          <View>
            <Text style={styles.infoTitle}>📱 Sobre o Contato Principal</Text>
            <Text style={styles.infoList}>• Será o primeiro a ser notificado em emergências</Text>
            <Text style={styles.infoList}>• Receberá atualizações de localização em tempo real</Text>
            <Text style={styles.infoList}>• Pode acionar autoridades em seu nome se necessário</Text>
          </View>
        </View>
      </View>

      {/* Dicas de segurança */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Dicas de Segurança</Text>
          <Text style={styles.infoList}>• Cadastre pelo menos 3 contatos de confiança</Text>
          <Text style={styles.infoList}>• Mantenha os telefones sempre atualizados</Text>
          <Text style={styles.infoList}>• Escolha pessoas que estejam sempre disponíveis</Text>
          <Text style={styles.infoList}>• Avise seus contatos que estão cadastrados</Text>
        </View>
      </View>

      {/* Estatísticas de contatos */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsText}>
            Você tem <Text style={styles.statsBold}>{contatos.length} contatos cadastrados</Text>
          </Text>
          <Text style={styles.statsSmallText}>Recomendado: mínimo de 3 contatos</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos do componente (como disposição, cores, fontes)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que o conteúdo ocupe o máximo de espaço possível
    paddingHorizontal: 16, // Adiciona espaçamento nas laterais
    paddingBottom: 24, // Adiciona espaçamento inferior
  },
  header: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    color: '#FFC0CB',
    fontSize: 12,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink', // Cor de fundo do botão
    borderRadius: 16, // Borda arredondada
    paddingVertical: 12,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  contactList: {
    marginBottom: 24,
  },
  contactListTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50, // Avatar circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginLeft: 12,
  },
  contactInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontWeight: '600',
    fontSize: 16,
  },
  contactRelation: {
    fontSize: 12,
    color: '#777',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactDetails: {
    marginTop: 16,
  },
  contactDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// Exporta o componente para ser utilizado em outras partes do app
export default TelaContatos;