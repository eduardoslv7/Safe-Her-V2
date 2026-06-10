import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { borderRadius, colors, fontSize, spacing } from '../styles/colors';
import contactsService, { Contact } from '../services/contacts.service';
import locationService from '../services/location.service';
 
type Props = NativeStackScreenProps<RootStackParamList, 'TelaEmergencia'>;

export default function TelaEmergencia({ navigation }: Props) {
  const [alertaAtivado, setAlertaAtivado] = useState(false);
  const [contatos, setContatos] = useState<Contact[]>([]);
  const [localizacao, setLocalizacao] = useState<{
    latitude: number;
    longitude: number;
    endereco?: string;
  } | null>(null);

  const carregarContatos = useCallback(async () => {
    const lista = await contactsService.getAll();
    setContatos(lista);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarContatos);
    return unsubscribe;
  }, [navigation, carregarContatos]);

  // Ativa ou desativa o SOS
  const toggleAlerta = async () => {
    if (alertaAtivado) {
      setAlertaAtivado(false);
      setLocalizacao(null);
      locationService.stopTracking();
      Vibration.vibrate(200);
      Alert.alert('Alerta desativado', 'Você está em segurança. 💜');
      return;
    }

    Vibration.vibrate([0, 400, 200, 400]);
    setAlertaAtivado(true);

    // Captura localização atual
    const coords = await locationService.getCurrentLocation();
    let endereco: string | undefined;
    let mapsLink: string | undefined;

    if (coords) {
      endereco = (await locationService.getAddressFromCoords(coords)) ?? undefined;
      mapsLink = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
      setLocalizacao({ ...coords, endereco });
    }

    if (contatos.length === 0) {
      Alert.alert(
        '🚨 SOS ATIVADO',
        'Você não tem contatos de emergência cadastrados.\nAdicione contatos na aba Contatos.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Envia WhatsApp para todos os contatos
    await enviarWhatsAppSOS(endereco, mapsLink);
  };

  // Envia mensagem de SOS pelo WhatsApp para todos os contatos
  const enviarWhatsAppSOS = async (endereco?: string, mapsLink?: string) => {
    const locationText = mapsLink
      ? `📍 ${endereco ?? 'Localização atual'}\n🗺️ Ver no mapa: ${mapsLink}`
      : '📍 Localização não disponível';

    const mensagem = encodeURIComponent(
      `🚨 EMERGÊNCIA - Safe Her\n\nPreciso de ajuda agora!\n\n${locationText}`
    );

    // Envia para o primeiro contato cadastrado
    const contato = contatos[0];
    const telefone = contato.phone.replace(/\D/g, '');
    const url = `whatsapp://send?phone=55${telefone}&text=${mensagem}`;

    const podeAbrir = await Linking.canOpenURL(url);
    if (podeAbrir) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        '🚨 SOS ATIVADO',
        `Seus contatos foram alertados!\n\n${locationText}`,
        [{ text: 'OK' }]
      );
    }
  };

  const ligar190 = () => {
    Alert.alert('Ligar 190', 'Deseja ligar para a Polícia Militar agora?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Ligar', style: 'destructive', onPress: () => Linking.openURL('tel:190') },
    ]);
  };

  const ligar180 = () => {
    Alert.alert('Ligar 180', 'Deseja ligar para a Central de Atendimento à Mulher?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Ligar', style: 'destructive', onPress: () => Linking.openURL('tel:180') },
    ]);
  };

  const enviarSMS = async () => {
    if (contatos.length === 0) {
      Alert.alert('Sem contatos', 'Cadastre contatos de emergência na aba Contatos primeiro.');
      return;
    }

    const mapsLink = localizacao
      ? `https://maps.google.com/?q=${localizacao.latitude},${localizacao.longitude}`
      : null;

    const locationText = mapsLink
      ? ` Minha localização: ${localizacao?.endereco ?? ''} ${mapsLink}`
      : '';

    const mensagem = encodeURIComponent(
      `🚨 EMERGÊNCIA - Safe Her\nPreciso de ajuda agora!${locationText}`
    );

    const contato = contatos[0];
    const telefone = contato.phone.replace(/\D/g, '');
    const url = `sms:${telefone}?body=${mensagem}`;

    const podeAbrir = await Linking.canOpenURL(url);
    if (podeAbrir) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', 'Não foi possível abrir o aplicativo de SMS.');
    }
  };

  const alarme = () => {
    Vibration.vibrate([0, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
    Alert.alert('🔊 Alarme Ativado', 'Vibração de emergência disparada!', [
      { text: 'Parar', onPress: () => Vibration.cancel() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Emergência SOS</Text>
        <Text style={styles.subtitle}>Ative o alerta em situações de perigo</Text>
      </View>

      {/* BARRA DE ALERTA */}
      {alertaAtivado && (
        <View style={styles.alertBar}>
          <Text style={styles.alertText}>🚨 ALERTA ATIVADO!</Text>
          {localizacao?.endereco && (
            <Text style={styles.alertLocation}>📍 {localizacao.endereco}</Text>
          )}
          {localizacao && (
            <Text style={styles.alertLocation}>
              🗺️ maps.google.com/?q={localizacao.latitude.toFixed(4)},{localizacao.longitude.toFixed(4)}
            </Text>
          )}
        </View>
      )}

      {/* BOTÃO SOS */}
      <View style={styles.center}>
        <Text style={styles.helpTitle}>
          {alertaAtivado ? 'Você está sendo monitorada' : 'Pressione para pedir ajuda'}
        </Text>
        <Text style={styles.helpSubtitle}>
          {contatos.length > 0
            ? `${contatos.length} contato(s) de emergência cadastrado(s)`
            : 'Nenhum contato cadastrado ainda'}
        </Text>

        <TouchableOpacity
          style={[styles.sosButton, alertaAtivado ? styles.sosActive : styles.sosInactive]}
          onPress={toggleAlerta}
          activeOpacity={0.85}
        >
          <Text style={styles.sosIcon}>🚨</Text>
          <Text style={styles.sosText}>{alertaAtivado ? 'CANCELAR' : 'SOS'}</Text>
          <Text style={styles.sosSubText}>
            {alertaAtivado ? 'Toque para cancelar' : 'Toque para ativar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <TouchableOpacity style={styles.actionCard} onPress={ligar190}>
          <Text style={styles.actionTitle}>📞 Ligar 190</Text>
          <Text style={styles.actionDesc}>Polícia Militar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={ligar180}>
          <Text style={styles.actionTitle}>📞 Ligar 180</Text>
          <Text style={styles.actionDesc}>Central de Atendimento à Mulher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={enviarSMS}>
          <Text style={styles.actionTitle}>💬 Enviar SMS</Text>
          <Text style={styles.actionDesc}>
            {contatos.length > 0
              ? `Para ${contatos[0].name}${contatos.length > 1 ? ` e mais ${contatos.length - 1}` : ''} com localização`
              : 'Nenhum contato cadastrado'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={alarme}>
          <Text style={styles.actionTitle}>🔊 Alarme Sonoro</Text>
          <Text style={styles.actionDesc}>Vibração de emergência</Text>
        </TouchableOpacity>
      </View>

      {/* INFO */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>⚠️ Informações Importantes</Text>
        <Text style={styles.infoText}>
          • SOS envia localização via WhatsApp para contatos{'\n'}
          • SMS enviado com link do Google Maps{'\n'}
          • Em perigo real, ligue 190 imediatamente
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, backgroundColor: '#FFF0F5' },
  header: { backgroundColor: '#EF4444', padding: spacing.lg, borderRadius: borderRadius.lg },
  title: { fontSize: fontSize['2xl'], fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#FECACA', marginTop: 4 },
  alertBar: { backgroundColor: '#DC2626', padding: spacing.md, marginTop: spacing.md, borderRadius: borderRadius.lg },
  alertText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: fontSize.base },
  alertLocation: { color: '#FECACA', textAlign: 'center', fontSize: fontSize.sm, marginTop: 4 },
  center: { alignItems: 'center', marginTop: spacing.xl },
  helpTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: '#111827', textAlign: 'center' },
  helpSubtitle: { color: '#6B7280', marginBottom: spacing.lg, textAlign: 'center', fontSize: fontSize.sm },
  sosButton: { width: 220, height: 220, borderRadius: 110, justifyContent: 'center', alignItems: 'center', shadowColor: colors.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 12, borderWidth: 6, borderColor: colors.white },
  sosInactive: { backgroundColor: '#EF4444' },
  sosActive: { backgroundColor: '#B91C1C' },
  sosIcon: { fontSize: 40, marginBottom: 8 },
  sosText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  sosSubText: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  actions: { marginTop: spacing.xl },
  sectionTitle: { fontWeight: 'bold', marginBottom: spacing.md, color: '#111827', fontSize: fontSize.base },
  actionCard: { backgroundColor: 'white', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm, shadowColor: colors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  actionTitle: { fontWeight: 'bold', color: '#111827' },
  actionDesc: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  infoBox: { backgroundColor: '#FEFCE8', borderWidth: 1, borderColor: '#FDE68A', padding: spacing.md, borderRadius: borderRadius.lg, marginTop: spacing.lg, marginBottom: spacing.xl },
  infoTitle: { fontWeight: 'bold', color: '#92400E', marginBottom: 6 },
  infoText: { fontSize: 12, color: '#A16207', lineHeight: 20 },
});
