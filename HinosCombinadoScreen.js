import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext';
import ThemeToggleButton from './ThemeToggleButton';

const COLS = 6;
const niveis = ['Todos', 'Fácil', 'Médio', 'Difícil'];
const tipos = ['Todos', 'Culto Oficial', 'Culto de Jovens', 'Coro'];

const legenda = {
  estudar: '⬜ Estudar',
  estudando: '⏳ Estudando',
  estudado: '✅ Estudado',
};

const getLegendaBG = (status, isDark) => {
  const coresClaras = {
    estudar: '#fde2ec',     // rosa claro
    estudando: '#fff3b0',   // amarelo claro
    estudado: '#b6e2b6',    // verde claro
  };

  const coresEscuras = {
    estudar: '#a7a7a7',     // cinza
    estudando: '#e6d707',   // amarelo escuro
    estudado: '#f678b3',    // rosa escuro
  };

  return isDark ? coresEscuras[status] : coresClaras[status];
};

const numeroFormatado = (hino, idxEmFiltrados, corosOrdenados) => {
  if (hino.tipo !== 'Coro') return hino.numero;
  const pos = corosOrdenados.findIndex((c) => c.id === hino.id);
  return `C${pos + 1}`;
};

const normalizar = (texto) =>
  (texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function HinosCombinadoScreen() {
  const { hinos, alternarStatus } = useHinos();
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const [modoGrade, setModoGrade] = useState(false);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  const filtrados = useMemo(() => {
    return hinos.filter((h) => {
      const matchTipo =
        filtroTipo === 'Todos' || normalizar(h.tipo) === normalizar(filtroTipo);
      const matchNivel =
        filtroNivel === 'Todos' || normalizar(h.dificuldade) === normalizar(filtroNivel);
      const matchBusca =
        (h.titulo || '').toLowerCase().includes(busca.toLowerCase()) ||
        String(h.numero).includes(busca);
      return matchTipo && matchNivel && matchBusca;
    });
  }, [hinos, busca, filtroTipo, filtroNivel]);

  const corosOrdenados = useMemo(
    () => filtrados.filter((h) => h.tipo === 'Coro').sort((a, b) => a.numero - b.numero),
    [filtrados]
  );

  const size = Dimensions.get('window').width / COLS - 12;

  return (
    <SafeAreaView style={[est.safe, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView contentContainerStyle={est.container}>
        <View style={est.headerRow}>
          <Text style={[est.titulo, { color: colors.text }]}>
            {modoGrade ? '🎼 Grade de Hinos' : '🎼 Lista de Hinos'}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setModoGrade(!modoGrade)} style={{ marginRight: 10 }}>
              <Ionicons
                name={modoGrade ? 'list' : 'grid'}
                size={26}
                color={colors.primary}
              />
            </TouchableOpacity>
            <ThemeToggleButton />
          </View>
        </View>

        <TextInput
          placeholder="Buscar por número ou nome..."
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          value={busca}
          onChangeText={setBusca}
          style={[
            est.busca,
            {
              backgroundColor: isDark ? '#333' : '#f0f0f0',
              color: colors.text,
            },
          ]}
        />

        <Text style={[est.subtitulo, { color: colors.text }]}>Filtrar por tipo</Text>
        <View style={est.filtros}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                est.filtro,
                { backgroundColor: colors.card },
                filtroTipo === tipo && { backgroundColor: colors.primary },
              ]}
              onPress={() => setFiltroTipo(tipo)}
            >
              <Text style={{ color: filtroTipo === tipo ? 'white' : colors.text }}>
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[est.subtitulo, { color: colors.text }]}>Filtrar por dificuldade</Text>
        <View style={est.filtros}>
          {niveis.map((nivel) => (
            <TouchableOpacity
              key={nivel}
              style={[
                est.filtro,
                { backgroundColor: colors.card },
                filtroNivel === nivel && { backgroundColor: colors.primary },
              ]}
              onPress={() => setFiltroNivel(nivel)}
            >
              <Text style={{ color: filtroNivel === nivel ? 'white' : colors.text }}>
                {nivel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {modoGrade ? (
          <View style={est.grid}>
            {filtrados.map((h, idx) => (
              <TouchableOpacity
                key={h.id}
                onPress={() => alternarStatus(h.id)}
                style={[
                  est.cell,
                  {
                    width: size,
                    height: size,
                    backgroundColor: getLegendaBG(h.status, isDark),
                  },
                ]}
              >
                <Text style={[est.num, { color: colors.text }]}>
                  {numeroFormatado(h, idx, corosOrdenados)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          filtrados.map((h, index) => (
            <TouchableOpacity
              key={index}
              style={[est.card, { backgroundColor: colors.card }]}
              onPress={() => alternarStatus(h.id ?? index + 1)}
            >
              <Text style={[est.tituloHino, { color: colors.text }]}>{h.titulo}</Text>
              <Text style={{ color: colors.text }}>{legenda[h.status]}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const est = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  subtitulo: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: '600',
  },
  busca: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filtro: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  card: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tituloHino: { fontWeight: 'bold' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cell: {
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  num: { fontWeight: 'bold' },
});
