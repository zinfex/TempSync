import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./index.css";

export default function Humidity({ dadosDevice }) {
  // Todos os dados (fullData) vindos de dadosDevice
  const [fullData, setFullData] = useState([]);

  // Intervalo selecionado (1, 6 ou 24 horas)
  const [selectedRange, setSelectedRange] = useState(1);

  // Controle de exibição do dropdown (menu) para selecionar o intervalo
  const [showDropdown, setShowDropdown] = useState(false);

  // State do gráfico
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Umidade",
        data: [],
      },
    ],
    options: {
      chart: {
        toolbar: false,
        height: 250,
        type: "line", // ou "area"
        foreColor: "#38373B",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        // AQUI troque para category
        type: "category",
        categories: [],
      },
      // Tooltip não precisa formatar data, pois é só categoria
      tooltip: {},
      colors: ["#00E396"],
    },
  });

  // 1) Carregar dados sem filtrar "hora.includes(' ')" 
  useEffect(() => {
    if (!Array.isArray(dadosDevice)) return;
    setFullData(dadosDevice);
  }, [dadosDevice]);

  // 2) Filtrar de acordo com o range
  useEffect(() => {
    if (!fullData.length) return;

    let numberOfItems = 288; 
    switch (selectedRange) {
      case 1:
        numberOfItems = 12;
        break;
      case 6:
        numberOfItems = 72;
        break;
      case 24:
      default:
        numberOfItems = 288;
        break;
    }

    // Pega os últimos N registros
    const filtered = fullData.slice(-numberOfItems);

    // Use 'hora' diretamente como rótulo
    const categories = filtered.map((obj) => obj.hora); 
    const humidities = filtered.map((obj) => obj.umidade);

    // Atualizamos o estado do gráfico
    setChartState((prev) => ({
      ...prev,
      series: [
        {
          name: "Umidade",
          data: humidities,
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories, // '08:00', '08:10', etc.
        },
      },
    }));
  }, [selectedRange, fullData]);

  // Alterna a exibição do dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Define o range e fecha o dropdown
  const handleSelectRange = (range) => {
    setSelectedRange(range);
    setShowDropdown(false);
  };

  return (
    <div className="grafico">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="estab">UMIDADE ESTÁVEL</div>

        <div className="intervaloChart">
          <button onClick={toggleDropdown}>
            {selectedRange} hora(s) ▾
          </button>
          {showDropdown && (
            <div className="dropdown">
              <div onClick={() => handleSelectRange(1)}>Última 1h</div>
              <div onClick={() => handleSelectRange(6)}>Últimas 6h</div>
              <div onClick={() => handleSelectRange(24)}>Últimas 24h</div>
            </div>
          )}
        </div>
      </div>

      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={350}
      />
    </div>
  );
}
