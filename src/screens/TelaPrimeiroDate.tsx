import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';

import contactsService, { Contact } from '../services/contacts.service';
 
type Props = NativeStackScreenProps<RootStackParamList, 'TelaPrimeiroDate'>;

interface DateForm {
  nomeDate: string;
  localEncontro: string;
  horarioAlerta: string;
}

const FORM_INICIAL: DateForm = { nomeDate: '', localEncontro: '', horarioAlerta: '' };

export default function TelaPrimeiroDate({ navigation }: Props) {
  const [form, setForm] = useState<DateForm>(FORM_INICIAL);
  
  // Lista de contatos vindos do teu banco de dados/serviço
  const [contatos, setContatos] = useState<Contact[]>([]);
  
  // Estado que guarda qual contacto foi selecionado para receber o WhatsApp
  const [contatoSelecionadoId, setContatoSelecionadoId] = useState<string | null>(null);

  // Carrega os contatos cadastrados no app
  const carregarContatos = useCallback(async () => {
    const lista = await contactsService.getAll();
    setContatos(lista);
  }, []);

  // Escuta o foco da tela para atualizar a lista se um contato for adicionado/removido
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarContatos);
    return unsubscribe;
  }, [navigation, carregarContatos]);

  // Função responsável por validar os dados e abrir o WhatsApp com Link Universal
 const enviarDadosDateWhatsApp = async () => {
    if (!form.nomeDate.trim() || !form.localEncontro.trim()) {
      Alert.alert("Atenção", "Por favor, preencha o nome da pessoa e o local do encontro.");
      return;
    }

    if (!contatoSelecionadoId) {
      Alert.alert("Atenção", "Selecione um contato de confiança abaixo para enviar as informações.");
      return;
    }

    const contatoAlvo = contatos.find(c => c.id === contatoSelecionadoId);
    if (!contatoAlvo) return;

    // Monta o texto personalizado de segurança
    const textoMensagem = 
      `🌸 *Safe Her - Modo Date Ativo* 🌸\n\n` +
      `Amiga, estou saindo para um primeiro encontro e registrei os detalhes por segurança:\n\n` +
      `👤 *Pessoa:* ${form.nomeDate.trim()}\n` +
      `📍 *Local:* ${form.localEncontro.trim()}\n` +
      `*Dados:* ${form.dadoencontro.trim()}\n` +
      (form.horarioAlerta.trim() ? `⏰ *Horário Combinado:* ${form.horarioAlerta.trim()}\n` : '') +
      `\nFique de olho em mim! Qualquer coisa aviso-te por aqui. 💗`;

    const mensagemFormatada = encodeURIComponent(textoMensagem);
    const telefoneLimpo = contatoAlvo.phone.replace(/\D/g, ''); // Garante que só fiquem números
    
    // Tenta primeiro o protocolo direto do aplicativo (Funciona na maioria dos celulares físicos)
    const urlDirect = `whatsapp://send?phone=55${telefoneLimpo}&text=${mensagemFormatada}`;
    // Link alternativo de contingência caso o protocolo direto falhe
    const urlWebAlt = `https://api.whatsapp.com/send?phone=55${telefoneLimpo}&text=${mensagemFormatada}`;

    try {
      // Tenta abrir pelo protocolo direto do aplicativo
      await Linking.openURL(urlDirect);
    } catch (error) {
      try {
        // Se falhar (comum em emuladores ou iOS sem permissões), tenta o link de API tradicional
        await Linking.openURL(urlWebAlt);
      } catch (err) {
        Alert.alert(
          "Erro ao abrir", 
          "Não conseguimos direcionar para o WhatsApp automaticamente. Verifique se o app está instalado e configurado."
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checklist do Primeiro Encontro 🌸</Text>
        <Text style={styles.headerSubtitle}>
          Preencha os dados abaixo para partilhar os detalhes do date com uma pessoa de confiança com apenas um clique.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Informações do Encontro</Text>
        
        <Text style={styles.inputLabel}>Com quem é o encontro? *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nome ou apelido da pessoa" 
          placeholderTextColor="#9CA3AF"
          value={form.nomeDate}
          onChangeText={(texto) => setForm((f) => ({ ...f, nomeDate: texto }))}
        />

        <Text style={styles.inputLabel}>Onde se vão encontrar? *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Shopping, Restaurante X, Café Y" 
          placeholderTextColor="#9CA3AF"
          value={form.localEncontro}
          onChangeText={(texto) => setForm((f) => ({ ...f, localEncontro: texto }))}
        />

           <Text style={styles.inputLabel}> Numero da pessoa ou rede social *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="+219875142, @Julia123" 
          placeholderTextColor="#9CA3AF"
          value={form.dadoencontro}
          onChangeText={(texto) => setForm((f) => ({ ...f, dadoencontro: texto }))}
        />

        <Text style={styles.inputLabel}>Horário combinado (opcional)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 19:30" 
          placeholderTextColor="#9CA3AF"
          value={form.horarioAlerta}
          onChangeText={(texto) => setForm((f) => ({ ...f, horarioAlerta: texto }))}
        />
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Selecione quem receberá os dados: *</Text>
        
        {contatos.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum contato cadastrado.</Text>
            <Text style={styles.emptySubText}>Cadastre contatos de emergência primeiro para listá-los aqui.</Text>
          </View>
        ) : (
          contatos.map((contato) => {
            const estaSelecionado = contato.id === contatoSelecionadoId;
            
            return (
              <TouchableOpacity 
                key={contato.id} 
                style={[styles.contactCard, estaSelecionado && styles.contactCardSelected]} 
                onPress={() => setContatoSelecionadoId(contato.id)}
                activeOpacity={0.7}
              >
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contato.name}</Text>
                  <Text style={styles.contactRelation}>{contato.relationship}</Text>
                </View>
                
                <View style={[styles.checkbox, estaSelecionado && styles.checkboxChecked]}>
                  {estaSelecionado && <Text style={styles.checkIcon}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <TouchableOpacity style={styles.activateButton} onPress={enviarDadosDateWhatsApp} activeOpacity={0.85}>
        <Text style={styles.activateButtonText}>✨ Enviar Detalhes via WhatsApp</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: spacing.lg, 
    backgroundColor: '#FFF0F5' 
  },
  header: { 
    backgroundColor: colors.pink[500], 
    padding: spacing.lg, 
    borderRadius: borderRadius.lg, 
    marginBottom: spacing.lg 
  },
  headerTitle: { 
    fontSize: fontSize['2xl'], 
    fontWeight: 'bold', 
    color: 'white' 
  },
  headerSubtitle: { 
    color: '#FECACA', 
    marginTop: 6, 
    fontSize: fontSize.sm, 
    lineHeight: 20 
  },
  formContainer: { 
    marginBottom: spacing.md 
  },
  sectionTitle: { 
    fontSize: fontSize.base, 
    fontWeight: 'bold', 
    color: '#111827', 
    marginBottom: spacing.md 
  },
  inputLabel: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#374151', 
    marginBottom: 4 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: borderRadius.md, 
    padding: spacing.md, 
    marginBottom: spacing.md, 
    fontSize: fontSize.base, 
    color: '#111827', 
    backgroundColor: 'white' 
  },
  listSection: { 
    marginBottom: spacing.xl 
  },
  contactCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: spacing.md, 
    borderRadius: borderRadius.lg, 
    marginBottom: spacing.sm, 
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    elevation: 1
  },
  contactCardSelected: { 
    borderColor: colors.pink[500], 
    backgroundColor: '#FFF5F7' 
  },
  contactInfo: { 
    flex: 1 
  },
  contactName: { 
    fontWeight: 'bold', 
    color: '#111827', 
    fontSize: fontSize.base 
  },
  contactRelation: { 
    fontSize: 12, 
    color: colors.pink[600], 
    marginTop: 2 
  },
  checkbox: { 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: '#D1D5DB', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  checkboxChecked: { 
    backgroundColor: colors.pink[500], 
    borderColor: colors.pink[500] 
  },
  checkIcon: { 
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  emptyBox: { 
    backgroundColor: 'white', 
    borderRadius: borderRadius.lg, 
    padding: spacing.md, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E7EB' 
  },
  emptyText: { 
    fontWeight: 'bold', 
    color: '#374151' 
  },
  emptySubText: { 
    color: '#6B7280', 
    fontSize: 12, 
    textAlign: 'center', 
    marginTop: 2 
  },
  activateButton: { 
    backgroundColor: colors.pink[500], 
    padding: spacing.md, 
    borderRadius: borderRadius.lg, 
    alignItems: 'center', 
    marginBottom: spacing.xl 
  },
  activateButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: fontSize.base 
  },
});