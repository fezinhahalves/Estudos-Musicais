import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext'; // usa seu ThemeContext personalizado

const TOTAL = 20;

export default function CzernyScreen() {
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' de 'theme'.
  const { theme } = useTheme();
  const { colors } = theme;

  const { progressoExtra, alternarStatusExtra } = useHinos();

  const legenda = {
    estudar: '⬜ Estudar',
    estudando: '⏳ Estudando',
    estudado: '✅ Estudado',
  };

  const getStatus = (id) => {
    return progressoExtra?.[`czerny-${id}`] || 'estudar';
  };

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background, // Linha 32, agora acessa colors.background corretamente
    },
    container: {
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 8,
      marginBottom: 8,
    },
    texto: {
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.text,
    },
    legenda: {
      color: colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎹 Lições Czerny</Text>

        {Array.from({ length: TOTAL }, (_, i) => {
          const id = i + 1;
          const status = getStatus(id);
          return (
            <TouchableOpacity
              key={id}
              style={styles.card}
              onPress={() => alternarStatusExtra(`czerny-${id}`)}
            >
              <Text style={styles.texto}>Lição {id}</Text>
              <Text style={styles.legenda}>{legenda[status]}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
