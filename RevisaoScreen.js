import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext';

export default function RevisaoScreen() {
  const { hinos } = useHinos();
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background, // Linha 21, agora acessa colors.background corretamente
      paddingTop: StatusBar.currentHeight || 40,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    titulo: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.text,
    },
    subtitulo: {
      fontSize: 16,
      marginBottom: 10,
      color: colors.text,
    },
    alerta: {
      fontSize: 16,
      fontStyle: 'italic',
      color: colors.text + '99',
    },
    card: {
      backgroundColor: colors.card,
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    hino: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    nivel: {
      fontSize: 14,
      color: colors.text,
      marginTop: 4,
    },
  });

  const revisao = useMemo(() => {
    const estudados = hinos.filter((h) => h.status === 'estudado');
    const embaralhado = estudados.sort(() => 0.5 - Math.random());
    return embaralhado.slice(0, 10);
  }, [hinos]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.container}>
        <Text style={styles.titulo}>🔄 Modo Revisão</Text>
        <Text style={styles.subtitulo}>Revisar hinos já estudados:</Text>

        {revisao.length === 0 ? (
          <Text style={styles.alerta}>
            Nenhum hino marcado como "estudado" ainda.
          </Text>
        ) : (
          <FlatList
            data={revisao}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.hino}>
                  {item.tipo === 'Coro'
                    ? `Coro ${item.numero}`
                    : `${item.numero} - ${item.titulo}`}
                </Text>
                <Text style={styles.nivel}>🎯 {item.dificuldade}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
