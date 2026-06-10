import React from "react";
import { View, StyleSheet } from "react-native";

type MapProps = {
  style?: any;
};

export function MapView({ style }: MapProps) {
  return (
    <View style={[styles.container, style]}>
      <iframe
        title="Mapa"
        width="100%"
        height="100%"
        style={{
          border: 0,
          borderRadius: 16,
        }}
        loading="lazy"
        allowFullScreen
        src="https://maps.google.com/maps?q=-22.865,-43.253&z=15&output=embed"
      />
    </View>
  );
}
 
export function Marker() {
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 16,
  },
});