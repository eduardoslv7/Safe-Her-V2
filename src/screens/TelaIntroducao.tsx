import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TelaIntroducao'
>;

const slides = [
  {
    icon: require('../../assets/logo.jpeg'),
    title: 'Bem-vinda ao SafeHer',
    description:
      'Sua segurança é nossa prioridade em qualquer lugar.',
  },

  {
    icon: '📍',
    title: 'Compartilhe seu trajeto',
    description:
      'Permita que pessoas de confiança acompanhem sua localização em tempo real.',
  },

  {
    icon: '👥',
    title: 'Rede de apoio',
    description:
      'Cadastre contatos confiáveis para serem avisados em situações importantes.',
  },

  {
    icon: '🚨',
    title: 'Ajuda quando precisar',
    description:
      'Acione rapidamente seus contatos de emergência em situações de risco.',
  },
];

export default function TelaIntroducao({
  navigation,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('TelaLogin');
    }
  };

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {typeof slide.icon === 'string' ? (
          <Text style={styles.icon}>
            {slide.icon}
          </Text>
        ) : (
          <Image
            source={slide.icon}
            style={styles.logo}
          />
        )}

        <Text style={styles.title}>
          {slide.title}
        </Text>

        <Text style={styles.description}>
          {slide.description}
        </Text>

        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlide === index &&
                  styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={nextSlide}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1
              ? 'Começar'
              : 'Próximo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.replace('TelaLogin')
          }
        >
          <Text style={styles.skip}>
            Pular Introdução
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    justifyContent: 'space-between',
    padding: 24,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    marginBottom: -100,
  },

  icon: {
    fontSize: 80,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },

  description: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },

  indicators: {
    flexDirection: 'row',
    marginTop: 30,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 30,
    backgroundColor: '#EC4899',
  },

  button: {
    backgroundColor: '#EC4899',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  skip: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    color: '#666',
  },
});