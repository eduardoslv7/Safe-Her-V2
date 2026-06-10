import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
import locationService from './location.service';
import contactsService from './contacts.service';

export const TASK_NAME = 'safeher-trajeto-background';
const STORAGE_KEY = '@safeher:trajeto_ativo';
 
export interface TrajetoState {
  ativo: boolean;
  origem: string;
  destino: string;
  tempoPrevisto: string;
  contatosSelecionados: string[];
  iniciadoEm: number;
}

// Salva o estado do trajeto no AsyncStorage
export async function salvarTrajetoState(state: TrajetoState) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Lê o estado do trajeto
export async function lerTrajetoState(): Promise<TrajetoState | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

// Limpa o estado do trajeto
export async function limparTrajetoState() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

// Configura as notificações
export async function configurarNotificacoes() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return false;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowList: true,
      shouldShowBanner: true,
    }),
  });

  return true;
}

// Mostra notificação local avisando que o SMS foi enviado
async function notificarEnvioSMS(destino: string, endereco: string | null) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📍 Safe Her - Atualização enviada',
      body: `SMS com sua localização enviado para seus contatos.\n${endereco ? `Local: ${endereco}` : ''}\nA caminho de: ${destino}`,
      sound: true,
    },
    trigger: null, // imediato
  });
}

// Define a task de background
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const state = await lerTrajetoState();
    if (!state || !state.ativo) return BackgroundFetch.BackgroundFetchResult.NoData;

    const contatos = await contactsService.getAll();
    const alvo = contatos.filter((c) => state.contatosSelecionados.includes(c.id));
    if (alvo.length === 0) return BackgroundFetch.BackgroundFetchResult.NoData;

    // Pega localização atual
    const coords = await locationService.getCurrentLocation();
    let endereco: string | null = null;
    if (coords) {
      endereco = await locationService.getAddressFromCoords(coords);
    }

    const mapsLink = coords
      ? `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`
      : null;

    const mensagem =
      `📍 Safe Her - Atualização de trajeto\n` +
      `Ainda estou a caminho de ${state.destino}.\n` +
      (endereco ? `Local atual: ${endereco}\n` : '') +
      (mapsLink ? `Ver no mapa: ${mapsLink}` : 'Localização não disponível');

    // Envia SMS para cada contato
    for (const contato of alvo) {
      const telefone = contato.phone.replace(/\D/g, '');
      const url = `sms:${telefone}?body=${encodeURIComponent(mensagem)}`;
      try {
        await Linking.openURL(url);
      } catch {
        // silencioso
      }
    }

    // Notifica a usuária que o SMS foi enviado
    await notificarEnvioSMS(state.destino, endereco);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Registra a task de background (30 minutos = 1800 segundos)
export async function registrarBackgroundTask() {
  try {
    const jaRegistrada = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    if (jaRegistrada) return;

    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 1800, // 30 minutos
      stopOnTerminate: false, // continua mesmo se o app fechar
      startOnBoot: false,
    });
  } catch (e) {
    console.warn('Erro ao registrar background task:', e);
  }
}

// Para e remove a task de background
export async function pararBackgroundTask() {
  try {
    const jaRegistrada = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    if (jaRegistrada) {
      await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
    }
  } catch (e) {
    console.warn('Erro ao parar background task:', e);
  }
}
