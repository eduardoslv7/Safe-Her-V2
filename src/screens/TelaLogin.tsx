import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

export default function TelaLogin({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // LOGIN ADMINISTRADOR
  const adminEmail = 'admin@safe.com';
  const adminSenha = '123456';

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (email === adminEmail && senha === adminSenha) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.replace('Inicio');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>🛡️</Text>
          </View>

          <Text style={styles.title}>SafeHer</Text>

          <Text style={styles.subtitle}>
            Sua segurança em primeiro lugar
          </Text>
        </View>

        {/* CARD LOGIN */}
        <View style={styles.card}>
          <Text style={styles.loginTitle}>Entrar</Text>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#777"
              style={styles.icon}
            />

            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* SENHA */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#777"
              style={styles.icon}
            />

            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >
              <Ionicons
                name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* BOTÃO */}
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
            <LinearGradient
              colors={['#ff4d8d', '#7b2cbf']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* LOGIN TESTE */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Acesso administrador:</Text>

            <Text style={styles.infoText}>
              Email: admin@safe.com
            </Text>

            <Text style={styles.infoText}>
              Senha: 123456
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f3d9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: {
    fontSize: 42,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: '#777',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 56,
    marginBottom: 18,
    backgroundColor: '#fff',
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },

  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  infoBox: {
    backgroundColor: '#f3d9fa',
    borderRadius: 12,
    padding: 16,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    color: '#7b2cbf',
  },

  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});