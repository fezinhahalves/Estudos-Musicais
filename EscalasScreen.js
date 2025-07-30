import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { useHinos } from './useHinos';
import { escalasData } from './EscalasData';
import { useTheme } from './ThemeContext'; // Usa o seu contexto

const STATUS = {
  estudar: '⬜ Estudar',
  estudando: '⏳ Estudando',
  estudado: '✅ Estudado',
};

export default function EscalasScreen() {
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const { progressoExtra, alternarStatusExtra } = useHinos();
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const tipos = ['Todos', 'Arpejos', 'Acordes', 'Cromática'];

  const escalas = useMemo(() => {
    return escalasData.map((e) => ({
      ...e,
      status: progressoExtra?.[`escala-${e.id}`] || 'estudar',
    }));
  }, [progressoExtra]);

  const filtradas = useMemo(() => {
    return escalas.filter((e) => filtroTipo === 'Todos' || e.tipo === filtroTipo);
  }, [escalas, filtroTipo]);

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingTop: 40,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    titulo: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      color: colors.text,
    },
    subtitulo: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 4,
      fontWeight: '600',
      color: colors.text,
    },
    filtros: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    filtro: {
      backgroundColor: isDark ? '#444' : '#fde2ec',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginRight: 8,
      marginBottom: 6,
    },
    ativo: {
      backgroundColor: isDark ? '#f78fb3' : '#f78fb3',
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 10,
      marginBottom: 8,
      shadowColor: isDark ? '#000' : '#ccc',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    nome: {
      fontWeight: 'bold',
      color: colors.text,
    },
    tipo: {
      fontStyle: 'italic',
      color: isDark ? '#ccc' : '#555',
    },
    status: {
      color: colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🎹 Escalas & Arpejos</Text>

        <Text style={styles.subtitulo}>Filtrar por tipo</Text>
        <View style={styles.filtros}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[styles.filtro, filtroTipo === tipo && styles.ativo]}
              onPress={() => setFiltroTipo(tipo)}
            >
              <Text style={{ color: colors.text }}>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtradas.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={styles.card}
            onPress={() => alternarStatusExtra(`escala-${e.id}`)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.nome}>{e.nome}</Text>
              <Text style={styles.tipo}>{e.tipo}</Text>
            </View>
            <Text style={styles.status}>{STATUS[e.status]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
