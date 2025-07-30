import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useHinos } from './useHinos'; // ✅ usa a lógica centralizada

export default function HomeScreen() {
  const navigation = useNavigation();
  const { limparProgresso } = useHinos(); // vem do contexto

  /* ---- confirmação antes de apagar ---- */
  const confirmarLimpeza = () =>
    Alert.alert('Tem certeza?', 'Essa ação apagará todo o seu progresso.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim, apagar',
        style: 'destructive',
        onPress: async () => {
          try {
            await limparProgresso(); // apaga do AsyncStorage + estado
            Alert.alert('Progresso apagado com sucesso!');
          } catch (e) {
            Alert.alert('Erro ao limpar progresso.');
            console.error(e);
          }
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="musical-notes-outline"
        size={64}
        color="#e91e63"
        style={{ marginBottom: 20 }}
      />

      <Text style={styles.title}>Bem-vinda aos Estudos Musicais</Text>
      <Text style={styles.subtitle}>Selecione uma opção para começar</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Principal')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={confirmarLimpeza}>
        <Text style={[styles.buttonText, { color: '#e91e63' }]}>
          Limpar Progresso
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- estilos ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e91e63',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
