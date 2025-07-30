import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from './ThemeContext';

import CzernyScreen from './CzernyScreen';
import PozzoliScreen from './PozzoliScreen';
import EscalasScreen from './EscalasScreen';
import MORscreen from './MORscreen';

const Stack = createNativeStackNavigator();

function EscolhaMetodo({ navigation }) {
  // CORREÇÃO AQUI: Desestruture 'theme' primeiro, depois 'colors' de 'theme'.
  const { theme } = useTheme();
  const { colors } = theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 20,
      backgroundColor: colors.background, // Linha 27, agora acessa colors.background corretamente
    },
    titulo: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
    },
    botao: {
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 8,
      marginBottom: 12,
      alignItems: 'center',
    },
    texto: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
  });

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
      <Stack.Screen
        name="Escolher"
        component={EscolhaMetodo}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Czerny" component={CzernyScreen} />
      <Stack.Screen name="Pozzoli" component={PozzoliScreen} />
      <Stack.Screen name="Escalas" component={EscalasScreen} />
      <Stack.Screen name="MOR" component={MORscreen} />
    </Stack.Navigator>
  );
}
