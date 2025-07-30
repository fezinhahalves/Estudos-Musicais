import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CzernyScreen from './CzernyScreen';
import PozzoliScreen from './PozzoliScreen';
import EscalasScreen from './EscalasScreen';
import MORscreen from './MORscreen'; 

const Stack = createNativeStackNavigator();

function EscolhaMetodo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🎹 Métodos de Estudo</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Czerny')}>
        <Text style={styles.texto}>Czerny</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Pozzoli')}>
        <Text style={styles.texto}>Pozzoli</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Escalas')}>
        <Text style={styles.texto}>Escalas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('MOR')}>
        <Text style={styles.texto}>MOR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default function MetodosNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Escolher" component={EscolhaMetodo} options={{ headerShown: false }} />
      <Stack.Screen name="Czerny" component={CzernyScreen} />
      <Stack.Screen name="Pozzoli" component={PozzoliScreen} />
      <Stack.Screen name="Escalas" component={EscalasScreen} />
      <Stack.Screen name="MOR" component={MORscreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#fde2ec',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    fontWeight: '500',
  },
});
