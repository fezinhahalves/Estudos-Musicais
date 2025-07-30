import { useEffect, useState, useMemo, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hinosData from './hinosData';

const HinosContext = createContext();

export function HinosProvider({ children }) {
  const [hinos, setHinos] = useState([]);
  const [progressoExtra, setProgressoExtra] = useState({});

  // Carrega os dados do AsyncStorage no início
  useEffect(() => {
    (async () => {
      try {
        const salvoHinos = await AsyncStorage.getItem('hinos_status');
        const salvoExtra = await AsyncStorage.getItem('progresso_extra');

        const dadosHinos = salvoHinos ? JSON.parse(salvoHinos) : null;
        const dadosExtra = salvoExtra ? JSON.parse(salvoExtra) : null;

        if (Array.isArray(dadosHinos)) {
          setHinos(dadosHinos);
        } else {
          setHinos(hinosData); // fallback
        }

        if (dadosExtra && typeof dadosExtra === 'object') {
          setProgressoExtra(dadosExtra);
        } else {
          setProgressoExtra({});
        }
      } catch (e) {
        console.warn('Erro ao carregar dados do AsyncStorage:', e);
        setHinos(hinosData);
        setProgressoExtra({});
      }
    })();
  }, []);

  // Salva hinos no AsyncStorage quando mudar
  useEffect(() => {
    if (Array.isArray(hinos)) {
      AsyncStorage.setItem('hinos_status', JSON.stringify(hinos));
    }
  }, [hinos]);

  // Salva progressoExtra no AsyncStorage quando mudar
  useEffect(() => {
    if (progressoExtra && typeof progressoExtra === 'object') {
      AsyncStorage.setItem('progresso_extra', JSON.stringify(progressoExtra));
    }
  }, [progressoExtra]);

  // Alternar status dos hinos
  const alternarStatus = (id) => {
    setHinos((prev) =>
      Array.isArray(prev)
        ? prev.map((h) => {
            if (h.id === id) {
              const novoStatus =
                h.status === 'estudar'
                  ? 'estudando'
                  : h.status === 'estudando'
                  ? 'estudado'
                  : 'estudar';
              return { ...h, status: novoStatus };
            }
            return h;
          })
        : []
    );
  };

  // Alternar status dos extras (pozzoli, escalas etc)
  const alternarStatusExtra = (key) => {
    setProgressoExtra((prev) => {
      const atual = prev[key] || 'estudar';
      const novoStatus =
        atual === 'estudar'
          ? 'estudando'
          : atual === 'estudando'
          ? 'estudado'
          : 'estudar';
      return { ...prev, [key]: novoStatus };
    });
  };

  const getRodizioDaSemana = useMemo(() => {
    if (!Array.isArray(hinos)) return [];
    const hoje = new Date();
    const dia = hoje.getDay();
    const nomesDias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const diaNome = nomesDias[dia];
    return hinos.filter((h) => h.rodizio?.includes(diaNome));
  }, [hinos]);

  const getProgresso = (tipo) => {
    if (!Array.isArray(hinos)) return 0;
    const total = hinos.filter((h) => h.tipo === tipo).length;
    const feitos = hinos.filter((h) => h.tipo === tipo && h.status === 'estudado').length;
    return total > 0 ? Math.round((feitos / total) * 100) : 0;
  };

  const getProgressoExtra = (prefixo, totalEsperado) => {
    if (!totalEsperado || totalEsperado === 0) return 0;

    let feitos = 0;

    for (let i = 1; i <= totalEsperado; i++) {
      const chave = prefixo + i;
      const status = progressoExtra[chave] || 'estudar';
      if (status === 'estudado') feitos++;
    }

    return Math.round((feitos / totalEsperado) * 100);
  };

  const limparProgresso = async () => {
    await AsyncStorage.removeItem('hinos_status');
    await AsyncStorage.removeItem('progresso_extra');
    setHinos(hinosData);
    setProgressoExtra({});
  };

  return (
    <HinosContext.Provider
      value={{
        hinos,
        alternarStatus,
        progressoExtra,
        alternarStatusExtra,
        getRodizioDaSemana,
        getProgresso,
        getProgressoExtra,
        limparProgresso,
      }}
    >
      {children}
    </HinosContext.Provider>
  );
}

export function useHinos() {
  return useContext(HinosContext);
}
