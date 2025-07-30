import React, { useState, useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useHinos } from './useHinos';

export default function HinosScreen() {
  const { hinos, alternarStatus } = useHinos();
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  const tipos = ['Todos', 'Culto Oficial', 'Culto de Jovens', 'Coro'];
  const niveis = ['Todos', 'Fácil', 'Médio', 'Difícil'];

  const filtrados = useMemo(() => {
    return hinos.filter((h) => {
      const matchTipo = filtroTipo === 'Todos' || h.tipo === filtroTipo;
      const matchNivel = filtroNivel === 'Todos' || h.dificuldade === filtroNivel;
      const matchBusca = h.titulo.toLowerCase().includes(busca.toLowerCase()) || String(h.numero).includes(busca);
      return matchTipo && matchNivel && matchBusca;
    });
  }, [hinos, busca, filtroTipo, filtroNivel]);

  const legenda = {
    estudar: '⬜ Estudar',
    estudando: '⏳ Estudando',
    estudado: '✅ Estudado',
  };

  return (
    <SafeAreaView style={est.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={est.container}>
        <Text style={est.titulo}>🎼 Lista de Hinos</Text>

        <TextInput
          placeholder="Buscar por número ou nome..."
          value={busca}
          onChangeText={setBusca}
          style={est.busca}
        />

        <Text style={est.subtitulo}>Filtrar por tipo</Text>
        <View style={est.filtros}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[est.filtro, filtroTipo === tipo && est.ativo]}
              onPress={() => setFiltroTipo(tipo)}
            >
              <Text>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={est.subtitulo}>Filtrar por dificuldade</Text>
        <View style={est.filtros}>
          {niveis.map((nivel) => (
            <TouchableOpacity
              key={nivel}
              style={[est.filtro, filtroNivel === nivel && est.ativo]}
              onPress={() => setFiltroNivel(nivel)}
            >
              <Text>{nivel}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtrados.map((h, index) => (
          <TouchableOpacity
            key={index}
            style={est.card}
            onPress={() => alternarStatus(h.id ?? index + 1)}
          >
            <Text style={est.tituloHino}>{`${h.titulo}`}</Text>
            <Text style={est.detalhe}></Text>
            <Text>{legenda[h.status]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const est = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitulo: { fontSize: 16, marginTop: 10, marginBottom: 4, fontWeight: '600' },
  busca: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  filtro: {
    backgroundColor: '#fde2ec',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  ativo: { backgroundColor: '#f78fb3' },
  card: {
    backgroundColor: '#fff0f6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tituloHino: { fontWeight: 'bold' },
  detalhe: { fontStyle: 'italic', marginBottom: 4 },
});