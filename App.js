import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider, useTheme } from './ThemeContext'; // ajuste caminho se precisar
import { HinosProvider } from './useHinos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import HinosCombinadoScreen from './HinosCombinadoScreen';
import MetodosNavigator from './MetodosNavigator';
import RevisaoScreen from './RevisaoScreen';
import ProgressoScreen from './ProgressoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Componente separado para controlar StatusBar dinamicamente pelo tema
// MOVEMOS PARA CIMA: Defina StatusBarWrapper ANTES que App o utilize.
function StatusBarWrapper() {
  const { theme } = useTheme(); // Desestruture 'theme' em vez de 'isDark' e 'colors' separadamente
  const isDark = theme.isDark;
  const colors = theme.colors;

  return (
    <StatusBar
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor={colors.background}
    />
  );
}

function Tabs() {
  const { theme } = useTheme(); // Use 'theme' e então acesse suas propriedades
  const colors = theme.colors;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '99', // cor com transparência para inativo
        tabBarStyle: { backgroundColor: colors.background },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Hinos') iconName = 'musical-notes';
          else if (route.name === 'Métodos') iconName = 'book';
          else if (route.name === 'Revisão') iconName = 'refresh';
          else if (route.name === 'Progresso') iconName = 'bar-chart';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Hinos" component={HinosCombinadoScreen} />
      <Tab.Screen name="Métodos" component={MetodosNavigator} />
      <Tab.Screen name="Revisão" component={RevisaoScreen} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HinosProvider>
        {/* StatusBarWrapper agora está definido quando é usado */}
        <StatusBarWrapper /> 
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Principal" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </HinosProvider>
    </ThemeProvider>
  );
}