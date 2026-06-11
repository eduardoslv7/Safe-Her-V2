import { useCallback, useEffect, useRef, useState } from 'react';
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
import locationService from '../services/location.service';
import {
  configurarNotificacoes,
  limparTrajetoState,
  pararBackgroundTask,
  registrarBackgroundTask,
  salvarTrajetoState,
} from '../services/trajeto.service';
 
type Props = NativeStackScreenProps<RootStackParamList, 'TelaTrajeto'>;

const INTERVALO_SMS = 30 * 60 * 1000;

// Converte string de tempo (ex: "2h", "30min", "1h30") para segundos
function parseTempoPrevisto(texto: string): number | null {
  const t = texto.trim().toLowerCase();
  // formatos: "2h", "30min", "30m", "1h30", "1h30min", "90"
  const horaMin = t.match(/^(\d+)h(\d+)?/);
  if (horaMin) {
    const h = parseInt(horaMin[1]) * 3600;
    const m = horaMin[2] ? parseInt(horaMin[2]) * 60 : 0;
    return h + m;
  }
  const apenasMin = t.match(/^(\d+)\s*(min|m)$/);
  if (apenasMin) return parseInt(apenasMin[1]) * 60;
  const apenasH = t.match(/^(\d+)\s*h$/);
  if (apenasH) return parseInt(apenasH[1]) * 3600;
  const apenasNum = t.match(/^(\d+)$/);
  if (apenasNum) return parseInt(apenasNum[1]) * 60; // assume minutos
  return null;
}

function formatarTempo(segundos: number): string {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TelaTrajeto({ navigation }: Props) {
  const [trajetoAtivo, setTrajetoAtivo] = useState(false);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [tempoPrevisto, setTempoPrevisto] = useState('');
  const [contatos, setContatos] = useState<Contact[]>([]);
  const [contatosSelecionados, setContatosSelecionados] = useState<string[]>([]);
  const [localizacaoAtual, setLocalizacaoAtual] = useState<{ latitude: number; longitude: number; endereco?: string } | null>(null);
  const [proximoSMS, setProximoSMS] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null); // segundos restantes
  const [sosDisparado, setSosDisparado] = useState(false);

  const intervaloSMSRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contatosSelecionadosRef = useRef<string[]>([]);
  const contatosRef = useRef<Contact[]>([]);
  const destinoRef = useRef('');

  useEffect(() => { contatosSelecionadosRef.current = contatosSelecionados; }, [contatosSelecionados]);
  useEffect(() => { contatosRef.current = contatos; }, [contatos]);
  useEffect(() => { destinoRef.current = destino; }, [destino]);

  const carregarContatos = useCallback(async () => {
    const lista = await contactsService.getAll();
    setContatos(lista);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarContatos);
    return unsubscribe;
  }, [navigation, carregarContatos]);

  useEffect(() => {
    return () => {
      if (intervaloSMSRef.current) clearInterval(intervaloSMSRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const toggleContato = (id: string) => {
    setContatosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const obterLocalizacao = async () => {
    const coords = await locationService.getCurrentLocation();
    if (!coords) return null;
    const endereco = (await locationService.getAddressFromCoords(coords)) ?? undefined;
    const loc = { ...coords, endereco };
    setLocalizacaoAtual(loc);
    return loc;
  };

  const enviarSMS = async (contato: Contact, mensagem: string) => {
    const telefone = contato.phone.replace(/\D/g, '');
    const url = `sms:${telefone}?body=${encodeURIComponent(mensagem)}`;
    const podeAbrir = await Linking.canOpenURL(url);
    if (podeAbrir) await Linking.openURL(url);
  };

  const enviarWhatsApp = async (contato: Contact, mensagem: string) => {
    const telefone = contato.phone.replace(/\D/g, '');
    const urlDirect = `whatsapp://send?phone=55${telefone}&text=${encodeURIComponent(mensagem)}`;
    const urlWeb = `https://api.whatsapp.com/send?phone=55${telefone}&text=${encodeURIComponent(mensagem)}`;
    try {
      await Linking.openURL(urlDirect);
    } catch {
      try { await Linking.openURL(urlWeb); } catch { }
    }
  };

  const montarMensagemInicio = (loc: { latitude: number; longitude: number; endereco?: string } | null) => {
    const mapsLink = loc ? `https://maps.google.com/?q=${loc.latitude},${loc.longitude}` : null;
    const locTexto = mapsLink
      ? `📍 ${loc?.endereco ?? 'Localização atual'}\n🗺️ ${mapsLink}`
      : '📍 Localização não disponível';
    return (
      `🚗 *Safe Her - Trajeto Iniciado*\n\n` +
      `Estou iniciando um trajeto e compartilhei minha localização por segurança.\n\n` +
      `📌 *Origem:* ${origem.trim()}\n` +
      `🎯 *Destino:* ${destino.trim()}\n` +
      (tempoPrevisto.trim() ? `⏰ *Tempo previsto:* ${tempoPrevisto.trim()}\n` : '') +
      `\n${locTexto}\n\n` +
      `Você receberá atualizações a cada 30 minutos. 💗`
    );
  };

  const montarMensagemAtualizacao = (loc: { latitude: number; longitude: number; endereco?: string } | null) => {
    const mapsLink = loc ? `https://maps.google.com/?q=${loc.latitude},${loc.longitude}` : null;
    return (
      `📍 Safe Her - Atualização de trajeto\n` +
      `Ainda estou a caminho de ${destinoRef.current}.\n` +
      (loc?.endereco ? `Local atual: ${loc.endereco}\n` : '') +
      (mapsLink ? `Ver no mapa: ${mapsLink}` : 'Localização não disponível')
    );
  };

  const montarMensagemSOS = (loc: { latitude: number; longitude: number; endereco?: string } | null) => {
    const mapsLink = loc ? `https://maps.google.com/?q=${loc.latitude},${loc.longitude}` : null;
    return (
      `🚨 *Safe Her - ALERTA DE SEGURANÇA*\n\n` +
      `O tempo previsto do trajeto expirou e não houve confirmação de chegada!\n\n` +
      `🎯 *Destino:* ${destinoRef.current}\n` +
      (loc?.endereco ? `📍 *Última localização:* ${loc.endereco}\n` : '') +
      (mapsLink ? `🗺️ Ver no mapa: ${mapsLink}\n` : '') +
      `\nPor favor, entre em contato imediatamente! 💗`
    );
  };

  const montarMensagemChegada = () =>
    `✅ Safe Her - Chegada confirmada\n\nCheguei ao destino com segurança! 💗\n🎯 ${destinoRef.current}`;

  // Dispara SOS automático quando o tempo expira
  const dispararSOSAutomatico = async () => {
    setSosDisparado(true);
    const loc = await obterLocalizacao();
    const mensagem = montarMensagemSOS(loc);
    const alvos = contatosRef.current.filter((c) => contatosSelecionadosRef.current.includes(c.id));
    for (const contato of alvos) {
      await enviarSMS(contato, mensagem);
    }
    Alert.alert(
      '🚨 Tempo Expirado!',
      'O tempo do trajeto acabou. Um SOS foi enviado para seus contatos de emergência.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Inicia o contador regressivo
  const iniciarCountdown = (segundosTotal: number) => {
    setCountdown(segundosTotal);
    let restante = segundosTotal;

    countdownRef.current = setInterval(async () => {
      restante -= 1;
      setCountdown(restante);

      if (restante <= 0) {
        clearInterval(countdownRef.current!);
        countdownRef.current = null;
        await dispararSOSAutomatico();
      }
    }, 1000);
  };

  const iniciarTrajeto = async () => {
    if (!origem.trim()) { Alert.alert('Atenção', 'Informe a origem do trajeto.'); return; }
    if (!destino.trim()) { Alert.alert('Atenção', 'Informe o destino do trajeto.'); return; }
    if (contatosSelecionados.length === 0) { Alert.alert('Atenção', 'Selecione pelo menos um contato.'); return; }

    await configurarNotificacoes();

    const loc = await obterLocalizacao();
    const mensagem = montarMensagemInicio(loc);

    const contatosAlvo = contatos.filter((c) => contatosSelecionados.includes(c.id));
    for (const contato of contatosAlvo) {
      await enviarWhatsApp(contato, mensagem);
    }

    await salvarTrajetoState({
      ativo: true,
      origem: origem.trim(),
      destino: destino.trim(),
      tempoPrevisto: tempoPrevisto.trim(),
      contatosSelecionados,
      iniciadoEm: Date.now(),
    });

    await registrarBackgroundTask();
    setTrajetoAtivo(true);
    setSosDisparado(false);

    // Inicia countdown se tempo previsto foi informado
    if (tempoPrevisto.trim()) {
      const segundos = parseTempoPrevisto(tempoPrevisto.trim());
      if (segundos) iniciarCountdown(segundos);
    }

    // SMS a cada 30min (foreground)
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 30);
    setProximoSMS(agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

    intervaloSMSRef.current = setInterval(async () => {
      const locAtual = await obterLocalizacao();
      const smsMensagem = montarMensagemAtualizacao(locAtual);
      const alvos = contatosRef.current.filter((c) => contatosSelecionadosRef.current.includes(c.id));
      for (const contato of alvos) {
        await enviarSMS(contato, smsMensagem);
      }
      const proximo = new Date();
      proximo.setMinutes(proximo.getMinutes() + 30);
      setProximoSMS(proximo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, INTERVALO_SMS);
  };

  const encerrarTrajeto = async () => {
    Alert.alert('Chegou ao destino?', 'Isso vai avisar seus contatos que você chegou com segurança.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim, cheguei! ✅',
        onPress: async () => {
          if (intervaloSMSRef.current) clearInterval(intervaloSMSRef.current);
          if (countdownRef.current) clearInterval(countdownRef.current);

          await pararBackgroundTask();
          await limparTrajetoState();

          setTrajetoAtivo(false);
          setProximoSMS(null);
          setCountdown(null);
          setSosDisparado(false);

          const mensagem = montarMensagemChegada();
          const contatosAlvo = contatos.filter((c) => contatosSelecionados.includes(c.id));
          for (const contato of contatosAlvo) {
            await enviarSMS(contato, mensagem);
          }

          Alert.alert('✅ Trajeto encerrado', 'Seus contatos foram avisados que você chegou com segurança! 💗');
          setOrigem('');
          setDestino('');
          setTempoPrevisto('');
          setContatosSelecionados([]);
          setLocalizacaoAtual(null);
        },
      },
    ]);
  };

  // Cor do countdown baseada no tempo restante
  const countdownColor = countdown !== null
    ? countdown <= 300 ? '#DC2626' // vermelho nos últimos 5min
    : countdown <= 600 ? '#F59E0B' // amarelo nos últimos 10min
    : '#16A34A' // verde normal
    : '#16A34A';

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Compartilhar Trajeto</Text>
        <Text style={styles.subtitle}>Mantenha seus contatos informados</Text>
      </View>

      {/* BARRA DE STATUS ATIVO */}
      {trajetoAtivo && (
        <View style={[styles.activeBar, sosDisparado && styles.activeBarSOS]}>
          <Text style={styles.activeText}>
            {sosDisparado ? '🚨 SOS Enviado!' : '🚗 Trajeto em andamento'}
          </Text>
          {localizacaoAtual?.endereco && (
            <Text style={styles.activeSubText}>📍 {localizacaoAtual.endereco}</Text>
          )}
          {proximoSMS && !sosDisparado && (
            <Text style={styles.activeSubText}>📱 Próximo SMS às {proximoSMS}</Text>
          )}
        </View>
      )}

      {/* CONTADOR REGRESSIVO */}
      {trajetoAtivo && countdown !== null && (
        <View style={[styles.countdownBox, { borderColor: countdownColor }]}>
          <Text style={styles.countdownLabel}>
            {countdown <= 0 ? '⏰ Tempo esgotado!' : '⏰ Tempo restante'}
          </Text>
          <Text style={[styles.countdownTimer, { color: countdownColor }]}>
            {countdown > 0 ? formatarTempo(countdown) : '00:00'}
          </Text>
          <Text style={styles.countdownSub}>
            {countdown <= 300 && countdown > 0
              ? '⚠️ Clique em "Cheguei" para cancelar o SOS!'
              : countdown <= 0
              ? 'SOS automático enviado aos contatos'
              : 'SOS automático ao zerar'}
          </Text>
        </View>
      )}

      {!trajetoAtivo && (
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Informações do Trajeto</Text>

          <Text style={styles.label}>📌 Origem *</Text>
          <TextInput
            style={styles.input}
            placeholder="De onde você está saindo?"
            placeholderTextColor="#9CA3AF"
            value={origem}
            onChangeText={setOrigem}
          />

          <Text style={styles.label}>🎯 Destino *</Text>
          <TextInput
            style={styles.input}
            placeholder="Para onde você vai?"
            placeholderTextColor="#9CA3AF"
            value={destino}
            onChangeText={setDestino}
          />

          <Text style={styles.label}>⏰ Tempo previsto (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 2h, 30min, 1h30"
            placeholderTextColor="#9CA3AF"
            value={tempoPrevisto}
            onChangeText={setTempoPrevisto}
          />
          <Text style={styles.inputHint}>Se informado, um SOS é enviado automaticamente ao zerar</Text>
        </View>
      )}

      {!trajetoAtivo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Quem vai acompanhar? *</Text>
          <Text style={styles.sectionSubtitle}>Selecione um ou mais contatos</Text>

          {contatos.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Nenhum contato cadastrado.</Text>
              <Text style={styles.emptySubText}>Adicione contatos na aba Contatos primeiro.</Text>
            </View>
          ) : (
            contatos.map((contato) => {
              const selecionado = contatosSelecionados.includes(contato.id);
              return (
                <TouchableOpacity
                  key={contato.id}
                  style={[styles.contactCard, selecionado && styles.contactCardSelected]}
                  onPress={() => toggleContato(contato.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(contato.name)}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contato.name}</Text>
                    <Text style={styles.contactRelation}>{contato.relationship}</Text>
                  </View>
                  <View style={[styles.checkbox, selecionado && styles.checkboxChecked]}>
                    {selecionado && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      )}

      {trajetoAtivo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Contatos monitorando</Text>
          {contatos
            .filter((c) => contatosSelecionados.includes(c.id))
            .map((contato) => (
              <View key={contato.id} style={styles.contactCardActive}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(contato.name)}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contato.name}</Text>
                  <Text style={styles.contactRelation}>{contato.relationship}</Text>
                </View>
                <Text style={styles.activeTag}>✓ Ativo</Text>
              </View>
            ))}
        </View>
      )}

      {!trajetoAtivo && (
        <TouchableOpacity style={styles.buttonStart} onPress={iniciarTrajeto} activeOpacity={0.85}>
          <Text style={styles.buttonText}>🚗 Iniciar Trajeto</Text>
        </TouchableOpacity>
      )}

      {trajetoAtivo && (
        <TouchableOpacity style={styles.buttonArrive} onPress={encerrarTrajeto} activeOpacity={0.85}>
          <Text style={styles.buttonText}>✅ Cheguei!</Text>
        </TouchableOpacity>
      )}

      <View style={styles.tip}>
        <Text style={styles.tipTitle}>💡 Como funciona</Text>
        <Text style={styles.tipText}>
          {'• Ao iniciar, seus contatos recebem as infos pelo WhatsApp\n'}
          {'• A cada 30 minutos, um SMS com sua localização é enviado\n'}
          {'• Se o tempo previsto zerar, um SOS é disparado automaticamente\n'}
          {'• Ao clicar em "Cheguei", um SMS de confirmação é enviado'}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, backgroundColor: '#FFF0F5' },

  header: { backgroundColor: '#A855F7', padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.lg },
  title: { fontSize: fontSize['2xl'], fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#F3E8FF', marginTop: 4 },

  activeBar: { backgroundColor: '#16A34A', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.lg },
  activeBarSOS: { backgroundColor: '#DC2626' },
  activeText: { color: 'white', fontWeight: 'bold', fontSize: fontSize.base, textAlign: 'center' },
  activeSubText: { color: '#DCFCE7', fontSize: fontSize.sm, textAlign: 'center', marginTop: 4 },

  countdownBox: { backgroundColor: 'white', borderWidth: 2, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center', marginBottom: spacing.lg },
  countdownLabel: { fontSize: fontSize.sm, color: '#6B7280', fontWeight: '600', marginBottom: 4 },
  countdownTimer: { fontSize: 48, fontWeight: 'bold', fontVariant: ['tabular-nums'], letterSpacing: 2 },
  countdownSub: { fontSize: 11, color: '#6B7280', textAlign: 'center', marginTop: 6 },

  form: { marginBottom: spacing.lg },
  sectionTitle: { fontSize: fontSize.base, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  sectionSubtitle: { fontSize: fontSize.sm, color: '#6B7280', marginBottom: spacing.md },
  label: { fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: spacing.md, fontSize: 13 },
  input: { backgroundColor: 'white', padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: '#E5E7EB', fontSize: fontSize.base, color: '#111827' },
  inputHint: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },

  section: { marginBottom: spacing.lg },

  emptyBox: { backgroundColor: 'white', borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  emptyText: { fontWeight: 'bold', color: '#374151' },
  emptySubText: { color: '#6B7280', fontSize: 12, textAlign: 'center', marginTop: 4 },

  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: '#E5E7EB', elevation: 1 },
  contactCardSelected: { borderColor: '#A855F7', backgroundColor: '#FAF5FF' },
  contactCardActive: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: '#16A34A' },

  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.pink[500], justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: fontSize.base },
  contactInfo: { flex: 1 },
  contactName: { fontWeight: 'bold', color: '#111827', fontSize: fontSize.base },
  contactRelation: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#A855F7', borderColor: '#A855F7' },
  checkIcon: { color: 'white', fontSize: 13, fontWeight: 'bold' },

  activeTag: { fontSize: 12, color: '#16A34A', fontWeight: 'bold' },

  buttonStart: { backgroundColor: '#A855F7', padding: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginBottom: spacing.lg },
  buttonArrive: { backgroundColor: '#16A34A', padding: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginBottom: spacing.lg },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: fontSize.base },

  tip: { backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#DDD6FE', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.xl },
  tipTitle: { fontWeight: 'bold', color: '#6B21A8', marginBottom: 6 },
  tipText: { fontSize: 12, color: '#7E22CE', lineHeight: 20 },
});
