import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

class NotificationService {
  // Solicita permissão para enviar notificações
  async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Permissão de notificação concedida:', authStatus);
      }

      return enabled;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  // Retorna o token FCM do dispositivo atual
  // Esse token identifica o celular para receber notificações
  async getDeviceToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      console.log('Token FCM:', token);
      return token;
    } catch (error) {
      console.error('Erro ao obter token FCM:', error);
      return null;
    }
  }

  // Envia notificação de SOS para um contato
  // O token é o FCM token do celular do contato de confiança
  async sendSOSNotification(params: {
    contactToken: string;
    victimName: string;
    latitude?: number;
    longitude?: number;
    address?: string;
  }): Promise<boolean> {
    try {
      const { contactToken, victimName, latitude, longitude, address } = params;

      // Monta a mensagem de localização
      const locationText = address
        ? `📍 ${address}`
        : latitude && longitude
        ? `📍 Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
        : '📍 Localização não disponível';

      // Chama a API do Firebase Cloud Messaging para enviar a notificação
      const response = await fetch(
        'https://fcm.googleapis.com/v1/projects/safe-her-ac68f/messages:send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await this.getAccessToken()}`,
          },
          body: JSON.stringify({
            message: {
              token: contactToken,
              notification: {
                title: `🚨 EMERGÊNCIA - ${victimName} precisa de ajuda!`,
                body: locationText,
              },
              android: {
                priority: 'high',
                notification: {
                  sound: 'default',
                  channelId: 'sos_channel',
                  priority: 'max',
                  visibility: 'public',
                },
              },
              data: {
                type: 'SOS',
                victimName,
                latitude: latitude?.toString() ?? '',
                longitude: longitude?.toString() ?? '',
                address: address ?? '',
              },
            },
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Erro ao enviar notificação SOS:', error);
      return false;
    }
  }

  // Escuta notificações quando o app está aberto
  listenToForegroundMessages() {
    return messaging().onMessage(async (remoteMessage) => {
      const { notification, data } = remoteMessage;

      if (data?.type === 'SOS') {
        Alert.alert(
          notification?.title ?? '🚨 EMERGÊNCIA',
          notification?.body ?? 'Um contato precisa de ajuda!',
          [{ text: 'OK' }]
        );
      }
    });
  }

  // Obtém o access token OAuth2 para autenticar na API do FCM v1
  // Em produção isso deveria ser feito no backend
  private async getAccessToken(): Promise<string> {
    // TODO: implementar com backend para não expor credenciais
    // Por enquanto retorna string vazia para estrutura do código
    return '';
  }
}

export default new NotificationService();
