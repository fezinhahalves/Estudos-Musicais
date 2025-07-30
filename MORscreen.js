import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useHinos } from './useHinos';
import { useTheme } from './ThemeContext'; // usa seu ThemeContext

const volumes = ['1', '2', '3'];
const tipos = ['estudos', 'exercicios', 'pedal', 'hinos', 'escalas'];

const ITENS = {
  '1': {
    estudos: 40,
    exercicios: 22,
    pedal: 3,
    hinos: [158, 131, 468],
  },
  '2': {
    estudos: 30,
    exercicios: 20,
    pedal: 50,
    escalas: [
      'Cromática',
      'Sol M', 'Ré M', 'Lá M', 'Mi M', 'Si M', 'Fá # M', 'Dó # M',
      'Fá M', 'Si b M', 'Mi b M', 'Lá b M', 'Ré b M', 'Sol b M', 'Dó b M'
    ],
  },
  '3': {
    estudos: 25,
    exercicios: 10,
    hinos: [
      211, 416, 399, 402, 12, 103, 63, 310, 239, 295,
      35, 76, 185, 320, 25, 101, 368, 372, 298, 377
    ],
  },
};

const STATUS = {
  estudar: '⬜ Estudar',
  estudando: '⏳ Estudando',
  estudado: '✅ Estudado',
};

export default function MORScreen() {
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' e 'isDark' de 'theme'.
  const { theme } = useTheme();
  const { colors, isDark } = theme;

  const { progressoExtra, alternarStatusExtra } = useHinos();

  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);

  const itens = useMemo(() => {
    if (!selectedVolume || !selectedTipo) return [];

    const grupo = ITENS[selectedVolume][selectedTipo];
    if (!grupo) return [];

    return Array.isArray(grupo)
      ? grupo
      : Array.from({ length: grupo }, (_, i) => i + 1);
  }, [selectedVolume, selectedTipo]);

  const getStatus = (id) => progressoExtra?.[`mor-${id}`] || 'estudar';

  const alternar = (id) => {
    alternarStatusExtra(`mor-${id}`);
  };

  const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: colors.text },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    button: {
      backgroundColor: isDark ? '#444' : '#fde2ec',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginRight: 8,
      marginBottom: 8,
    },
    selectedButton: {
      backgroundColor: '#f78fb3',
    },
    buttonText: {
      fontWeight: '500',
      fontSize: 14,
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
    statusText: {
      color: colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎼 Método MOR</Text>

        {/* Botões de Volume */}
        <View style={styles.row}>
          {volumes.map((vol) => (
            <TouchableOpacity
              key={vol}
              style={[styles.button, selectedVolume === vol && styles.selectedButton]}
              onPress={() => {
                setSelectedVolume(vol);
                setSelectedTipo(null);
              }}
            >
              <Text style={styles.buttonText}>Vol {vol}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botões de Tipo */}
        {selectedVolume && (
          <View style={styles.row}>
            {tipos
              .filter((tipo) => ITENS[selectedVolume][tipo])
              .map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.button, selectedTipo === tipo && styles.selectedButton]}
                  onPress={() => setSelectedTipo(tipo)}
                >
                  <Text style={styles.buttonText}>{tipo}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Lista de Itens */}
        {itens.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => alternar(`${selectedVolume}-${selectedTipo}-${item}`)}
          >
            <Text style={styles.texto}>
              {selectedTipo === 'hinos' || selectedTipo === 'escalas'
                ? item
                : `${selectedTipo} ${item}`}
            </Text>
            <Text style={styles.statusText}>
              {STATUS[getStatus(`${selectedVolume}-${selectedTipo}-${item}`)]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
