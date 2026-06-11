import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Modal,
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
 
type Props = NativeStackScreenProps<RootStackParamList, 'TelaContatos'>;

interface ContactForm {
  name: string;
  phone: string;
  relationship: string;
}

const FORM_EMPTY: ContactForm = { name: '', phone: '', relationship: '' };

export default function TelaContatos({ navigation }: Props) {
  const [contatos, setContatos] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState<ContactForm>(FORM_EMPTY);
  const [loading, setLoading] = useState(false);

  const carregarContatos = useCallback(async () => {
    const lista = await contactsService.getAll();
    setContatos(lista);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarContatos);
    return unsubscribe;
  }, [navigation, carregarContatos]);

  const salvarContato = async () => {
    if (!form.name.trim()) {
      Alert.alert('Atenção', 'Informe o nome do contato.');
      return;
    }
    if (!form.phone.trim()) {
      Alert.alert('Atenção', 'Informe o telefone do contato.');
      return;
    }

    setLoading(true);
    await contactsService.add({
      name: form.name.trim(),
      phone: form.phone.trim(),
      relationship: form.relationship.trim() || 'Contato',
    });
    setLoading(false);
    setForm(FORM_EMPTY);
    setModalVisible(false);
    carregarContatos();
  };

  const removerContato = (contato: Contact) => {
    Alert.alert('Remover Contato', `Deseja remover ${contato.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await contactsService.remove(contato.id);
          carregarContatos();
        },
      },
    ]);
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contatos de Emergência</Text>
        <Text style={styles.headerSubtitle}>Pessoas notificadas em caso de emergência</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Novo Contato</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        <Text style={styles.listTitle}>Meus Contatos ({contatos.length})</Text>

        {contatos.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>Nenhum contato cadastrado ainda.</Text>
            <Text style={styles.emptySubText}>Adicione pelo menos 3 contatos de confiança.</Text>
          </View>
        ) : (
          contatos.map((contato) => (
            <View key={contato.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(contato.name)}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.contactName}>{contato.name}</Text>
                  <Text style={styles.contactRelation}>{contato.relationship}</Text>
                  <Text style={styles.contactPhone}>{contato.phone}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => removerContato(contato)}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Dicas de Segurança</Text>
        <Text style={styles.infoText}>
          • Cadastre pelo menos 3 contatos de confiança{'\n'}
          • Mantenha os telefones sempre atualizados{'\n'}
          • Escolha pessoas que estejam sempre disponíveis
        </Text>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Novo Contato</Text>

            <TextInput style={styles.input} placeholder="Nome completo *" value={form.name}
              onChangeText={(v) => setForm((f) => ({ ...f, name: v }))} />

            <TextInput style={styles.input} placeholder="Telefone * (ex: 11999999999)" value={form.phone}
              onChangeText={(v) => setForm((f) => ({ ...f, phone: v }))} keyboardType="phone-pad" />

            <TextInput style={styles.input} placeholder="Relação (ex: Mãe, Amiga, Irmã)" value={form.relationship}
              onChangeText={(v) => setForm((f) => ({ ...f, relationship: v }))} />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false); setForm(FORM_EMPTY); }}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={salvarContato} disabled={loading}>
                <Text style={styles.saveButtonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, backgroundColor: '#FFF0F5' },
  header: { backgroundColor: colors.pink[500], padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.lg },
  headerTitle: { fontSize: fontSize['2xl'], fontWeight: 'bold', color: 'white' },
  headerSubtitle: { color: '#FECACA', marginTop: 4, fontSize: fontSize.sm },
  addButton: { backgroundColor: colors.pink[500], padding: spacing.md, borderRadius: borderRadius.lg, alignItems: 'center', marginBottom: spacing.lg },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: fontSize.base },
  list: { marginBottom: spacing.lg },
  listTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: '#111827', marginBottom: spacing.md },
  emptyBox: { backgroundColor: 'white', borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: spacing.sm },
  emptyText: { fontWeight: 'bold', color: '#374151', textAlign: 'center' },
  emptySubText: { color: '#6B7280', fontSize: fontSize.sm, textAlign: 'center', marginTop: 4 },
  card: { backgroundColor: 'white', borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.pink[500], justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: fontSize.lg },
  info: { flex: 1 },
  contactName: { fontWeight: 'bold', fontSize: fontSize.base, color: '#111827' },
  contactRelation: { fontSize: fontSize.sm, color: colors.pink[600] },
  contactPhone: { fontSize: fontSize.sm, color: '#6B7280' },
  deleteButton: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  deleteButtonText: { fontSize: 18 },
  infoBox: { backgroundColor: '#FEFCE8', borderWidth: 1, borderColor: '#FDE68A', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.md },
  infoTitle: { fontWeight: 'bold', color: '#92400E', marginBottom: 6 },
  infoText: { fontSize: 12, color: '#A16207', lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: spacing.lg },
  modalBox: { backgroundColor: 'white', borderRadius: borderRadius.lg, padding: spacing.lg },
  modalTitle: { fontSize: fontSize.xl, fontWeight: 'bold', color: '#111827', marginBottom: spacing.lg },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, fontSize: fontSize.base, color: '#111827' },
  modalActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  cancelButton: { flex: 1, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center' },
  cancelButtonText: { color: '#6B7280', fontWeight: 'bold' },
  saveButton: { flex: 1, padding: spacing.md, borderRadius: borderRadius.md, backgroundColor: colors.pink[500], alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
});
