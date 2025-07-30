// GradeScreen.js
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useHinos } from './useHinos';

const COLS   = 6;                              // 6 colunas
const niveis = ['Todos', 'Fácil', 'Médio', 'Difícil'];

const legendaBG = {
  estudar:   '#fde2ec',
  estudando: '#fff3b0',
  estudado:  '#b6e2b6',
};

// ---------- util p/ numerar Coro 1…6 ----------
const numeroFormatado = (hino, idxEmFiltrados, corosOrdenados) => {
  if (hino.tipo !== 'Coro') return hino.numero;           // outros hinos OK
  const pos = corosOrdenados.findIndex((c) => c.id === hino.id);
  return `C${pos + 1}`;                                   // C1, C2, …
};

export default function GradeScreen() {
  const { hinos, alternarStatus } = useHinos();
  const [busca, setBusca]             = useState('');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  /* ---------- filtragem ---------- */
  const filtrados = useMemo(() => {
    return hinos.filter((h) => {
      const okNivel = filtroNivel === 'Todos' || h.dificuldade === filtroNivel;
      const okBusca =
        h.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        String(h.numero).includes(busca);
      return okNivel && okBusca;
    });
  }, [hinos, busca, filtroNivel]);

  // lista ordenada só de Coros (para achar posição 1-6)
  const corosOrdenados = useMemo(
    () => filtrados.filter((h) => h.tipo === 'Coro').sort((a, b) => a.numero - b.numero),
    [filtrados]
  );

  /* ---------- medidas da grade ---------- */
  const size = Dimensions.get('window').width / COLS - 12;

  return (
    <SafeAreaView style={est.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={est.container}>
        <Text style={est.titulo}>🎼 Grade de Hinos</Text>

        {/* busca */}
        <TextInput
          placeholder="Buscar por número ou nome…"
          value={busca}
          onChangeText={setBusca}
          style={est.busca}
        />

        {/* filtro dificuldade */}
        <View style={est.filtros}>
          {niveis.map((n) => (
            <TouchableOpacity
              key={n}
              onPress={() => setFiltroNivel(n)}
              style={[est.filtro, filtroNivel === n && est.ativo]}
            >
              <Text>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* grade */}
        <View style={est.grid}>
          {filtrados.map((h, idx) => (
            <TouchableOpacity
              key={h.id}
              onPress={() => alternarStatus(h.id)}
              style={[
                est.cell,
                { width: size, height: size, backgroundColor: legendaBG[h.status] },
              ]}
            >
              <Text style={est.num}>
                {numeroFormatado(h, idx, corosOrdenados)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- estilos ---------- */
const est = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingTop: 40, paddingHorizontal: 16, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  busca: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  filtro: {
    backgroundColor: '#fde2ec',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  ativo: { backgroundColor: '#f78fb3' },
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
