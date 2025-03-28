import { useParams } from "react-router-dom";
import DashboardDevice from "../../src/components/DashboardDevice/DashboardDevice";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import Temperature from "../../src/components/Charts/Temperature";
import Humidity from "../../src/components/Charts/Humidity";
import { useSensor } from "../../src/context/SensorContext";
import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";

// Se tiver import do Axios ou algo parecido, pode comentar se não for usar
// import Api from "../../src/config/Api";

export default function Dashboard() {
  const { chipid } = useParams();
  const { sensorDados, setSensorDados } = useSensor();
  const [dadosConfig, setDadosConfig] = useState(null);
  const [umahora, setUmaHora] = useState(null);

  useEffect(() => {
    // Substituindo a chamada à API por um fetch local ao arquivo devices.json
    fetch("/eventos.json")
      .then((res) => res.json())
      .then((data) => {
        // "data" é o array de dispositivos
        // Procuramos o dispositivo cujo chipid é igual ao da URL (useParams)
        const foundDevice = data.find((dev) => dev.chipid === chipid);

        // Se existir, setamos no contexto e nos states locais
        if (foundDevice) {
          setSensorDados(foundDevice.leituras); // array de leituras
          setUmaHora(foundDevice.leituras);     // ou seu critério de filtragem
          setDadosConfig(foundDevice);          // infos de config
        } else {
          console.warn(`Não encontrei dispositivo com chipid=${chipid}`);
        }
      })
      .catch((error) => console.error("Erro ao buscar o arquivo JSON:", error));
  }, [chipid, setSensorDados]);

  if (!sensorDados || !umahora || !dadosConfig) {
    return (
      <>
        <div className="loading">
          <Commet color="#6132E8" size="large" text="" textColor="" />
        </div>
        <Sidebar page="/dashboard" />
      </>
    );
  }

  return (
    <>
      <DashboardDevice dadosDevice={sensorDados} dadosConfig={dadosConfig} />
      <div className="charts">
        <Temperature dadosDevice={umahora} />
        <Humidity dadosDevice={umahora} />
      </div>
      <Sidebar page="/dashboard" />
    </>
  );
}
