import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { useRef } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import { borderRadius, fontSize, spacing } from "../styles/colors";

// IMPORTA DO wrapper.
import { MapView, Marker } from "../components/Mapa";

type Props = NativeStackScreenProps<RootStackParamList, "TelaMapa">;

export default function TelaMapa({ navigation }: Props) {

  const mapRef = useRef<any>(null);

  const locaisProximos = [
    {
      nome: "Delegacia da Mulher",
      tipo: "seguro",
      distancia: "500m",
      latitude: -22.864,
      longitude: -43.252,
    },
    {
      nome: "Rua Mal Iluminada",
      tipo: "risco",
      distancia: "300m",
      latitude: -22.866,
      longitude: -43.254,
    },
  ];

  const irParaLocal = (item: any) => {

    if (!mapRef.current || typeof mapRef.current.animateToRegion !== "function") {
      return;
    }

    mapRef.current.animateToRegion(
      {
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>🛡️</Text>

        <Text style={styles.title}>Mapa de Segurança</Text>

        <Text style={styles.subtitle}>Locais seguros perto de você</Text>

        <TextInput
          placeholder="Buscar local..."
          placeholderTextColor="#FBCFE8"
          style={styles.search}
        />
      </View>

      {/* MAPA */}
      <View style={styles.mapArea}>
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: -22.865,
            longitude: -43.253,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {locaisProximos.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.nome}
              description={
                item.tipo === "seguro"
                  ? "Local Seguro"
                  : "Área de Risco"
              }
              pinColor={
                item.tipo === "seguro" ? "green" : "red"
              }
            />
          ))}
        </MapView>
      </View>

      {/* LISTA */}
      <View style={styles.list}>
        <Text style={styles.listTitle}>
          Locais Próximos
        </Text>

        {locaisProximos.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => irParaLocal(item)}
            style={[
              styles.card,
              item.tipo === "seguro"
                ? styles.safeCard
                : styles.dangerCard,
            ]}
          >
            <Text style={styles.cardTitle}>
              {item.nome}
            </Text>

            <Text style={styles.cardSub}>
              {item.tipo === "seguro"
                ? "Local Seguro"
                : "Área de Risco"}
            </Text>

            <Text style={styles.distance}>
              {item.distancia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LEGENDA */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>
          Legenda
        </Text>

        <Text style={styles.legendText}>
          🛡️ Locais Seguros
        </Text>

        <Text style={styles.legendText}>
          ⚠️ Áreas de Risco
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: "#EC4899",
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  logo: {
    fontSize: 30,
    marginBottom: 10,
  },

  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    color: "#FBCFE8",
    marginTop: 4,
  },

  search: {
    marginTop: spacing.md,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    color: "white",
  },

  mapArea: {
    height: 220,
  },

  list: {
    padding: spacing.lg,
  },

  listTitle: {
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: "#111827",
  },

  card: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },

  safeCard: {
    backgroundColor: "#ECFDF5",
  },

  dangerCard: {
    backgroundColor: "#FEF2F2",
  },

  cardTitle: {
    fontWeight: "bold",
    color: "#111827",
  },

  cardSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  distance: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
    color: "#374151",
  },

  legend: {
    padding: spacing.lg,
    backgroundColor: "white",
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
  },

  legendTitle: {
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },

  legendText: {
    fontSize: 12,
    marginBottom: 4,
    color: "#374151",
  },
});