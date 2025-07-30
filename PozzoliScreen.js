import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext';

const TOTAL = 96;
const STATUS = {
  estudar: '⬜ Estudar',
  estudando: '⏳ Estudando',
  estudado: '✅ Estudado',
};

export default function PozzoliScreen() {
  const { progressoExtra, alternarStatusExtra } = useHinos();
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const getStatus = (id) => {
    return progressoExtra?.[`pozzoli-${id}`] || 'estudar';
  };

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: isDark ? '#000' : '#ccc',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    texto: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    status: {
      color: colors.textSecondary || (isDark ? '#ccc' : '#333'),
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📘 Lições de Pozzoli (1 a 96)</Text>

        {Array.from({ length: TOTAL }, (_, i) => {
          const id = i + 1;
          const status = getStatus(id);
          return (
            <TouchableOpacity
              key={id}
              style={styles.card}
              onPress={() => alternarStatusExtra(`pozzoli-${id}`)}
            >
              <Text style={styles.texto}>Lição {id}</Text>
              <Text style={styles.status}>{STATUS[status]}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
