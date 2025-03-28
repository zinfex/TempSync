import { createContext, useContext, useState } from 'react';

const SensorContext = createContext();

export function SensorProvider({ children }) {
  const [sensorDados, setSensorDados] = useState(null);
  const [ultimoDados, setUltimoDados] = useState(null);

  return (
    <SensorContext.Provider value={{ sensorDados, setSensorDados, ultimoDados, setUltimoDados }}>
      {children}
    </SensorContext.Provider>
  );
}

export function useSensor() {
  return useContext(SensorContext);
}
