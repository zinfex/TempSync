import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./index.css";

export default function Temperature({ dadosDevice }) {
  const [fullData, setFullData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Temperatura",
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
        type: "category",  // <-- MUDE para category!
        categories: [],
      },
      tooltip: {
        // Se for somente categoria, não precisa formatar data
      },
      colors: ["#1483CD"],
    },
  });

  // 1) Carregar dados sem filtrar por espaço nem converter data
  useEffect(() => {
    if (!Array.isArray(dadosDevice)) return;
    setFullData(dadosDevice);
  }, [dadosDevice]);

  // 2) Filtrar de acordo com o range (1h=12 itens, 6h=72 itens, 24h=288 itens)
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
        numberOfItems = 288;
        break;
      default:
        numberOfItems = 288;
    }

    // Pega os últimos N registros
    const filtered = fullData.slice(-numberOfItems);

    // Agora 'hora' é apenas uma string (ex: "08:00")
    const categories = filtered.map((obj) => obj.hora);
    const temperatures = filtered.map((obj) => obj.temperatura);

    setChartState((prev) => ({
      ...prev,
      series: [
        {
          name: "Temperatura",
          data: temperatures,
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories, // array de strings do tipo "08:00", "08:10", etc.
        },
      },
    }));
  }, [selectedRange, fullData]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectRange = (range) => {
    setSelectedRange(range);
    setShowDropdown(false);
  };

  return (
    <div className="grafico">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="estab">TEMPERATURA ESTÁVEL</div>

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
