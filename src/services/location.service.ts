import * as Location from 'expo-location';

// Definição da interface para coordenadas (latitude e longitude)
export interface Coordinates {
  latitude: number;
  longitude: number;
}

class LocationService {
  private watcherId: Location.LocationSubscription | null = null; // Variável para armazenar o id do rastreador

  // Solicita permissões de localização em foreground (quando o app está em uso)
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Solicita permissão para acessar a localização em primeiro plano
      if (status !== 'granted') {
        console.log('Permissão de localização negada'); // Se a permissão for negada
        return false;
      }
      return true; // Retorna verdadeiro se a permissão for concedida
    } catch (error) {
      console.error('Erro ao solicitar permissão de localização:', error); // Trata erros ao solicitar permissão
      return false;
    }
  }

  // Solicita permissões de localização em background (quando o app está em segundo plano)
  async requestBackgroundPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync(); // Solicita permissão para acessar a localização em segundo plano
      return status === 'granted'; // Retorna verdadeiro se a permissão for concedida
    } catch (error) {
      console.error('Erro ao solicitar permissão em background:', error); // Trata erros ao solicitar permissão
      return false;
    }
  }

  // Retorna a localização atual do dispositivo
  async getCurrentLocation(): Promise<Coordinates | null> {
    try {
      const hasPermission = await this.requestPermissions(); // Verifica se a permissão foi concedida
      if (!hasPermission) return null; // Retorna null caso a permissão seja negada

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Obtém a localização com alta precisão
      });

      // Retorna as coordenadas (latitude e longitude)
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Erro ao obter localização atual:', error); // Trata erros ao obter a localização
      return null; // Retorna null em caso de erro
    }
  }

  // Inicia o rastreamento contínuo da posição do dispositivo
  async startTracking(
    onLocationUpdate: (coords: Coordinates) => void, // Função de callback para atualizar a localização
    onError?: (error: any) => void // Função de callback opcional para tratar erros
  ): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions(); // Verifica se a permissão foi concedida
      if (!hasPermission) return false; // Retorna false se a permissão não for concedida

      // Inicia o rastreamento da localização com intervalo de 5 segundos ou 10 metros
      this.watcherId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // Alta precisão
          timeInterval: 5000, // Atualiza a cada 5 segundos
          distanceInterval: 10, // Ou a cada 10 metros
        },
        (location) => {
          // Atualiza a localização quando houver uma mudança
          onLocationUpdate({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return true; // Retorna true quando o rastreamento é iniciado com sucesso
    } catch (error) {
      console.error('Erro ao iniciar rastreamento:', error); // Trata erros ao iniciar o rastreamento
      if (onError) onError(error); // Chama a função de erro se fornecida
      return false; // Retorna false em caso de erro
    }
  }

  // Para o rastreamento contínuo da localização
  stopTracking() {
    if (this.watcherId) {
      this.watcherId.remove(); // Remove o rastreador
      this.watcherId = null; // Limpa o id do rastreador
    }
  }

  // Calcula a distância entre dois pontos usando a fórmula Haversine (em quilômetros)
  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(coord2.latitude - coord1.latitude); // Diferença de latitude
    const dLon = this.toRad(coord2.longitude - coord1.longitude); // Diferença de longitude

    // Fórmula Haversine
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(coord1.latitude)) *
        Math.cos(this.toRad(coord2.latitude)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna a distância em quilômetros
  }

  // Converte graus para radianos
  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180); // Fórmula de conversão de graus para radianos
  }

  // Realiza o reverse geocoding para obter o endereço a partir das coordenadas
  async getAddressFromCoords(coords: Coordinates): Promise<string | null> {
    try {
      const addresses = await Location.reverseGeocodeAsync(coords); // Obtém o endereço a partir das coordenadas
      if (addresses.length > 0) {
        const addr = addresses[0]; // Pega o primeiro endereço encontrado
        // Retorna o endereço formatado (rua, cidade, região)
        return `${addr.street || ''}, ${addr.city || ''} - ${addr.region || ''}`;
      }
      return null; // Retorna null se não houver endereço encontrado
    } catch (error) {
      console.error('Erro ao obter endereço:', error); // Trata erros ao obter o endereço
      return null; // Retorna null em caso de erro
    }
  }
}

// Exporta uma instância única do serviço de localização para uso global
export default new LocationService();