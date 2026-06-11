import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';


interface Contact { id: string; name: string; phone: string; relationship: string; }


interface ContactCardProps { contact: Contact; onDelete: (id: string) => void; }
 

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {

  // Função que exibe um alerta para confirmar a ligação ao contato
  const handleCall = () => {
    Alert.alert(
      'Ligar para ' + contact.name, 
      `Deseja ligar para ${contact.phone}?`, 
      [
        { text: 'Cancelar', style: 'cancel' }, 
        {
          text: 'Ligar',
          onPress: () => {
            Linking.openURL(`tel:${contact.phone}`);
          },
        },
      ]
    );
  };

  // Função que exibe um alerta para confirmar a remoção do contato
  const handleDelete = () => {
    Alert.alert(
      'Remover Contato', 
      `Deseja remover ${contact.name} dos contatos de emergência?`, 
      [
        { text: 'Cancelar', style: 'cancel' }, 
        {
          text: 'Remover',
          style: 'destructive', 
          onPress: () => onDelete(contact.id), 
        },
      ]
    );
  };

  // Função para criar iniciais do nome 
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

      <View style={styles.leftSection}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(contact.name)} 
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text> 
          <Text style={styles.relationship}>{contact.relationship}</Text> 
          <Text style={styles.phone}>{contact.phone}</Text> 
        </View>
      </View>

      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall} 
        >
          <Text style={styles.callButtonText}>📞</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete} 
        >
          <Text style={styles.deleteButtonText}>🗑️</Text> 
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  // Card principal: horizontal, espaçado e com sombra
  card: {
    flexDirection: 'row',             
    justifyContent: 'space-between', 
    alignItems: 'center',             
    backgroundColor: colors.white,    
    borderRadius: borderRadius.lg,    
    padding: spacing.md,              
    marginBottom: spacing.md,         

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
    flexDirection: 'row',            
    alignItems: 'center',            
    flex: 1,                         
  },

  // Avatar: círculo rosa com texto branco centralizado
  avatar: {
    width: 50,                       
    height: 50,                      
    borderRadius: 25,                
    backgroundColor: colors.pink[500], 
    justifyContent: 'center',        
    alignItems: 'center',            
    marginRight: spacing.md,         
  },

  // Texto das iniciais no avatar
  avatarText: {
    fontSize: fontSize.lg,           
    fontWeight: 'bold',             
    color: colors.white,             
  },

  // Container das informações textuais
  info: {
    flex: 1,    
  },

  // Nome do contato em destaque
  name: {
    fontSize: fontSize.base,         
    fontWeight: 'semibold',          
    color: colors.gray[900],         
    marginBottom: 2,                 
  },

  // Relação do contato (ex: mãe, amigo)
  relationship: {
    fontSize: fontSize.sm,           
    color: colors.pink[600],         
    marginBottom: 2,                 
  },

  // Telefone do contato
  phone: {
    fontSize: fontSize.sm,           
    color: colors.gray[600],         
  },

  // Container dos botões lado direito
  actions: {
    flexDirection: 'row',            
    gap: spacing.sm,                 
  },

  // Botão para chamada: verde claro circular
  callButton: {
    width: 40,                       
    height: 40,                      
    borderRadius: borderRadius.md,   
    backgroundColor: colors.green[50], 
    justifyContent: 'center',        
    alignItems: 'center',            
  },

  // Texto do botão de chamada (ícone)
  callButtonText: {
    fontSize: 20,                    
  },

  // Botão para deletar: vermelho claro circular
  deleteButton: {
    width: 40,                      
    height: 40,                      
    borderRadius: borderRadius.md,   
    backgroundColor: colors.red[50], 
    justifyContent: 'center',        
    alignItems: 'center',            
  },

  // Texto do botão de deletar (ícone)
  deleteButtonText: {
    fontSize: 20,                    
  },
});