import React from 'react';
// Componentes do React Native para UI e funcionalidades nativas
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Importa variáveis globais de estilos do seu projeto
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';

// Define a estrutura de um contato
interface Contact { id: string; name: string; phone: string; relationship: string; }

// Define as props que o componente espera receber
interface ContactCardProps { contact: Contact; onDelete: (id: string) => void; }
 
// Componente funcional React que recebe um contato e uma função para deletar
export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {

  // Função que exibe um alerta para confirmar a ligação ao contato
  const handleCall = () => {
    Alert.alert(
      'Ligar para ' + contact.name, // Título do alerta
      `Deseja ligar para ${contact.phone}?`, // Mensagem do alerta
      [
        { text: 'Cancelar', style: 'cancel' }, // Botão de cancelar
        {
          text: 'Ligar',
          onPress: () => {
            // Se confirmado, abre o discador do celular com o telefone do contato
            Linking.openURL(`tel:${contact.phone}`);
          },
        },
      ]
    );
  };

  // Função que exibe um alerta para confirmar a remoção do contato
  const handleDelete = () => {
    Alert.alert(
      'Remover Contato', // título do alerta
      `Deseja remover ${contact.name} dos contatos de emergência?`, // mensagem
      [
        { text: 'Cancelar', style: 'cancel' }, // botão cancelar
        {
          text: 'Remover',
          style: 'destructive', // estilo botão remover (vermelho no iOS)
          onPress: () => onDelete(contact.id), // chama função para deletar o contato
        },
      ]
    );
  };

  // Função para criar iniciais do nome (exemplo: "Maria Silva" → "MS")
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');

    // Se só tiver um nome, retorna a primeira letra maiúscula
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    // Se tiver mais de um nome, retorna a primeira letra do primeiro nome + primeira letra do último nome
    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // JSX que renderiza o cartão com informações e botões
  return (
    <View style={styles.card}>

      {/* Seção esquerda: avatar e informações do contato */}
      <View style={styles.leftSection}>

        {/* Avatar circular com iniciais */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(contact.name)} {/* Exibe as iniciais do nome */}
          </Text>
        </View>

        {/* Informações textuais do contato */}
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text> {/* Nome do contato */}
          <Text style={styles.relationship}>{contact.relationship}</Text> {/* Relação com o contato */}
          <Text style={styles.phone}>{contact.phone}</Text> {/* Telefone do contato */}
        </View>
      </View>

      {/* Seção direita: botões de ação */}
      <View style={styles.actions}>

        {/* Botão para realizar chamada */}
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall} // Ao pressionar, chama a função handleCall
        >
          <Text style={styles.callButtonText}>📞</Text> {/* Ícone de telefone */}
        </TouchableOpacity>

        {/* Botão para deletar contato */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete} // Ao pressionar, chama a função handleDelete
        >
          <Text style={styles.deleteButtonText}>🗑️</Text> {/* Ícone de lixo */}
        </TouchableOpacity>

      </View>
    </View>
  );
};

// Estilos usando StyleSheet para organizar layout e aparência
const styles = StyleSheet.create({

  // Card principal: horizontal, espaçado e com sombra
  card: {
    flexDirection: 'row',             // organiza filhos em linha
    justifyContent: 'space-between', // espaço entre elementos
    alignItems: 'center',             // alinhamento vertical
    backgroundColor: colors.white,    // cor de fundo do card
    borderRadius: borderRadius.lg,    // borda arredondada
    padding: spacing.md,              // espaçamento interno
    marginBottom: spacing.md,         // margem inferior

    // Sombra para iOS
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Sombra para Android
    elevation: 3,
  },

  // Seção esquerda com avatar e textos
  leftSection: {
    flexDirection: 'row',            // organiza os itens na horizontal
    alignItems: 'center',            // alinha os itens no centro verticalmente
    flex: 1,                         // ocupa o espaço restante
  },

  // Avatar: círculo rosa com texto branco centralizado
  avatar: {
    width: 50,                       // largura do avatar
    height: 50,                      // altura do avatar
    borderRadius: 25,                // borda arredondada (circulando o avatar)
    backgroundColor: colors.pink[500], // cor de fundo do avatar
    justifyContent: 'center',        // centraliza o conteúdo
    alignItems: 'center',            // alinha o conteúdo dentro do avatar
    marginRight: spacing.md,         // margem direita
  },

  // Texto das iniciais no avatar
  avatarText: {
    fontSize: fontSize.lg,           // tamanho da fonte para as iniciais
    fontWeight: 'bold',              // peso da fonte
    color: colors.white,             // cor da fonte
  },

  // Container das informações textuais
  info: {
    flex: 1,                         // ocupa o restante do espaço
  },

  // Nome do contato em destaque
  name: {
    fontSize: fontSize.base,         // tamanho da fonte
    fontWeight: 'semibold',          // peso da fonte
    color: colors.gray[900],         // cor da fonte
    marginBottom: 2,                 // margem inferior
  },

  // Relação do contato (ex: mãe, amigo)
  relationship: {
    fontSize: fontSize.sm,           // tamanho da fonte
    color: colors.pink[600],         // cor da fonte
    marginBottom: 2,                 // margem inferior
  },

  // Telefone do contato
  phone: {
    fontSize: fontSize.sm,           // tamanho da fonte
    color: colors.gray[600],         // cor da fonte
  },

  // Container dos botões lado direito
  actions: {
    flexDirection: 'row',            // organiza os botões na horizontal
    gap: spacing.sm,                 // espaço entre os botões
  },

  // Botão para chamada: verde claro circular
  callButton: {
    width: 40,                       // largura do botão
    height: 40,                      // altura do botão
    borderRadius: borderRadius.md,   // borda arredondada
    backgroundColor: colors.green[50], // cor de fundo do botão
    justifyContent: 'center',        // centraliza o conteúdo
    alignItems: 'center',            // alinha o conteúdo
  },

  // Texto do botão de chamada (ícone)
  callButtonText: {
    fontSize: 20,                    // tamanho do ícone
  },

  // Botão para deletar: vermelho claro circular
  deleteButton: {
    width: 40,                       // largura do botão
    height: 40,                      // altura do botão
    borderRadius: borderRadius.md,   // borda arredondada
    backgroundColor: colors.red[50], // cor de fundo do botão
    justifyContent: 'center',        // centraliza o conteúdo
    alignItems: 'center',            // alinha o conteúdo
  },

  // Texto do botão de deletar (ícone)
  deleteButtonText: {
    fontSize: 20,                    // tamanho do ícone
  },
});