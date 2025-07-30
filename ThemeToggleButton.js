import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ThemeToggleButton() {
  // CORREÇÃO AQUI: Desestruture 'theme' e 'toggleTheme' do useTheme()
  const { theme, toggleTheme } = useTheme();
  // Em seguida, desestruture 'isDark' e 'colors' do objeto 'theme'
  const { isDark, colors } = theme;

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginLeft: 12 }}>
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}
