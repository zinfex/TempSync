import { useState } from "react";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import StatCard from "../../src/components/StatCard/StatCard";
import DeviceCard from "../../src/components/DeviceCard/DeviceCard";
import AIReport from "../../src/components/AIReport/AIReport";
import EventLog from "../../src/components/EventLog/EventLog";
import { FiThermometer, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { BiDevices } from "react-icons/bi";
import "./index.css";

export default function Reports() {
  const [sensorStatus] = useState("Instável");
  const [aiReport, setAiReport] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");

  const handleGenerateReport = () => {
    const mockAiResponse = `Análise Detalhada do Sensor 94C2540EE93C:

1. Status Atual: Temperatura Instável
   - Temperatura Atual: 32.5°C
   - Limite Recomendado: 27°C
   - Variação nas últimas 24h: +5.8°C

2. Histórico de Eventos:
   - 15:30 - Alerta: Temperatura instável (32.5°C)
   - 14:45 - Aviso: Temperatura elevada (30.2°C)
   - 12:15 - Normalização: Temperatura dentro do limite (26.8°C)
   - 11:30 - Alerta: Temperatura baixa (22.1°C)

3. Análise de Padrões:
   - Picos de temperatura ocorrem principalmente entre 14h e 16h
   - Variação média diária: 8.4°C
   - Tendência: Aumento gradual da temperatura base

4. Recomendações Imediatas:
   - Verificar sistema de refrigeração principal
   - Inspecionar sensores de temperatura quanto à calibração
   - Implementar ciclo de manutenção preventiva
   - Ajustar limites de alerta para maior sensibilidade

5. Risco e Urgência:
   Nível: ALTO
   Justificativa: Padrão consistente de aumento de temperatura
   Prazo para ação: Imediato

6. Próximas Ações Sugeridas:
   1. Manutenção do sistema de refrigeração em até 24h
   2. Calibração dos sensores em até 48h
   3. Revisão dos parâmetros de operação em até 72h`;

    setAiReport(mockAiResponse);
  };

  const statsData = [
    {
      icon: FiThermometer,
      title: "Temperatura Média",
      value: "28.5°C",
      change: "↑ 2.3°C",
      changeType: "positive"
    },
    {
      icon: FiAlertTriangle,
      title: "Alertas",
      value: "12",
      change: "↑ 5 novos",
      changeType: "warning"
    },
    {
      icon: BiDevices,
      title: "Dispositivos",
      value: "8/10",
      change: "Ativos"
    },
    {
      icon: FiCheckCircle,
      title: "Uptime",
      value: "99.8%",
      change: "↑ 0.2%",
      changeType: "success"
    }
  ];

  const eventsData = [
    {
      time: "15:30",
      status: "bg",
      title: "Temperatura instável detectada",
      details: "Sensor 94C2540EE93C - 32.5°C"
    },
    {
      time: "14:45",
      status: "by",
      title: "Temperatura elevada",
      details: "Sensor 94C2540EE93C - 30.2°C"
    },
    {
      time: "12:15",
      status: "br",
      title: "Temperatura baixa",
      details: "Sensor 94C2540EE93C - 22.1°C"
    }
  ];

  return (
    <div className="reports-page">
      <Sidebar page="/reports" />

      <div className="reports-content">
        <div className="reports-header">
          <div className="header-left">
            <h1>Relatórios e Análises</h1>
            <p className="subtitle">Monitoramento em tempo real dos sensores</p>
          </div>
          <div className="header-right">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="time-range-select"
            >
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
            </select>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="reports-main">
          <DeviceCard
            deviceName="HostIDC"
            status={sensorStatus}
            temperature="32.5°C"
            lastReading="2 min atrás"
            alertMessage="O sensor 94C2540EE93C está com a temperatura instável. É recomendável verificar o dispositivo imediatamente."
          />

          <AIReport
            report={aiReport}
            onGenerateReport={handleGenerateReport}
          />
        </div>

        <EventLog events={eventsData} />
      </div>
    </div>
  );
}
