import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext';

export default function ProgressoScreen() {
  const { hinos, getProgresso, getProgressoExtra } = useHinos();
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const tiposHinos = ['Culto Oficial', 'Culto de Jovens', 'Coro'];

  const metodosInfo = {
    Czerny: { prefixo: 'czerny-', total: 20 },
    Pozzoli: { prefixo: 'pozzoli-', total: 96 },
    Escalas: { prefixo: 'escala-', total: 61 },
  };

  const corProgresso = (valor) => {
    if (valor >= 80) return '#4caf50'; // verde
    if (valor >= 40) return '#ffc107'; // amarelo
    return '#f44336'; // vermelho
  };

  const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: {
      paddingTop: 40,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },
    subtitulo: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 8,
      color: colors.text,
    },
    glassBox: {
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.text + '22',
      backgroundColor: colors.card,
    },
    label: {
      marginBottom: 4,
      fontWeight: '500',
      color: colors.text,
      fontSize: 14,
    },
    barBg: {
      height: 8,
      backgroundColor: isDark ? '#444' : '#e0e0e0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    barFill: {
      height: 8,
      borderRadius: 4,
    },
    percent: {
      marginTop: 4,
      color: colors.text + '99',
      fontSize: 12,
    },
  });

  const renderBarra = (tipo, categoria) => {
    let valor = 0;

    if (categoria === 'hinos') {
      valor = getProgresso(tipo);
    } else if (categoria === 'metodos' || categoria === 'mor') {
      const info = metodosInfo[tipo];
      if (info) {
        console.log('Checando', tipo, info.prefixo, info.total);
        valor = getProgressoExtra(info.prefixo, info.total);
      }
    }

    return (
      <View key={tipo} style={styles.glassBox}>
        <Text style={styles.label}>{tipo}</Text>
        <View style={styles.barBg}>
          <View
            style={[
              styles.barFill,
              { width: `${valor}%`, backgroundColor: corProgresso(valor) },
            ]}
          />
        </View>
        <Text style={styles.percent}>{valor}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📊 Progresso Geral</Text>

        <Text style={styles.subtitulo}>🎵 Hinos</Text>
        {tiposHinos.map((tipo) => renderBarra(tipo, 'hinos'))}

        <Text style={styles.subtitulo}>🎹 Métodos</Text>
        {['Czerny', 'Pozzoli', 'Escalas'].map((tipo) =>
          renderBarra(tipo, 'metodos')
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
