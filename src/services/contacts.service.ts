import AsyncStorage from '@react-native-async-storage/async-storage';

// Estrutura de um contato de emergência
export interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship?: string; // ex: "Mãe", "Amiga", "Irmã" ;
}

const STORAGE_KEY = '@safeher:contacts';

class ContactsService {
  // Retorna todos os contatos salvos
  async getAll(): Promise<Contact[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
      return [];
    }
  }

  // Adiciona um novo contato
  async add(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const contacts = await this.getAll();
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
    };
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...contacts, newContact])
    );
    return newContact;
  }

  // Remove um contato pelo id
  async remove(id: string): Promise<void> {
    const contacts = await this.getAll();
    const updated = contacts.filter((c) => c.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // Atualiza um contato existente
  async update(id: string, data: Partial<Omit<Contact, 'id'>>): Promise<void> {
    const contacts = await this.getAll();
    const updated = contacts.map((c) => (c.id === id ? { ...c, ...data } : c));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // Limpa todos os contatos (útil para testes)
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export default new ContactsService();
