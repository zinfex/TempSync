import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";
import "./index.css";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuDroplet } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { AiOutlinePercentage } from "react-icons/ai";
import { RiTempColdLine } from "react-icons/ri";
import {
  MdSignalWifiStatusbar4Bar,
  MdSignalWifiStatusbar3Bar,
  MdSignalWifiStatusbar2Bar,
  MdSignalWifiStatusbar1Bar,
  MdSignalWifiStatusbarConnectedNoInternet,
} from "react-icons/md";
import {
  MdBatteryFull,
  MdBattery90,
  MdBattery80,
  MdBattery60,
  MdBattery50,
  MdBattery30,
  MdBattery20,
  MdBatteryAlert,
} from "react-icons/md";

export default function DashboardDevice({ dadosDevice, dadosConfig }) {
  // Último item do array dadosDevice (se existir)
  let lastItem = null;
  if (Array.isArray(dadosDevice) && dadosDevice.length > 0) {
    lastItem = dadosDevice[dadosDevice.length - 1];
  }

  // -- CAMPOS EDITÁVEIS --
  // Iniciamos com os valores vindos de dadosConfig
  const [editableFields, setEditableFields] = useState({
    nome_dispositivo: dadosConfig?.nome_dispositivo || "",
    local: dadosConfig?.local || "",
    referencia_temp: dadosConfig?.referencia_temp || "",
    referencia_umid: dadosConfig?.referencia_umid || "",
  });

  // Qual campo está em modo de edição? (ex.: 'nome_dispositivo', 'local', etc.)
  const [editingField, setEditingField] = useState(null);

  // Informações de temperatura/umidade calculadas
  const [ultimaTrans, setultimaTrans] = useState({});

  // Exemplo de min/max para exibir nas tabelas
  const [minmax, setMinmax] = useState([
    [
      // Temperatura
      { date: "Hoje", min: 0, max: 0 },
      { date: "Ontem", min: -20, max: -21 },
      { date: "2 dias atrás", min: -19, max: -25 },
    ],
    [
      // Umidade
      { date: "Hoje", min: 0, max: 0 },
      { date: "Ontem", min: 40, max: 91 },
      { date: "2 dias atrás", min: 59, max: 95 },
    ],
  ]);

  useEffect(() => {
    if (!Array.isArray(dadosDevice) || dadosDevice.length === 0) return;

    // Extrai valores de temperatura e umidade
    const temps = dadosDevice
      .map((d) => parseFloat(d.temperatura))
      .filter((val) => !Number.isNaN(val));
    const hums = dadosDevice
      .map((d) => parseFloat(d.umidade))
      .filter((val) => !Number.isNaN(val));

    if (temps.length === 0 || hums.length === 0) return;

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const minHum = Math.min(...hums);
    const maxHum = Math.max(...hums);
    let mediaTemp = temps.reduce((acc, val) => acc + val, 0) / temps.length;
    let mediaHum = hums.reduce((acc, val) => acc + val, 0) / hums.length;
    mediaTemp = mediaTemp.toFixed(2);
    mediaHum = mediaHum.toFixed(2);

    // Seta no estado a ultimaTrans
    setultimaTrans({
      temperatura: dadosDevice[0].temperatura, // Pegando o primeiro do array como "última" para fins de ex
      umidade: dadosDevice[0].umidade,
      hora: dadosDevice[0].hora,
      id: dadosDevice[0].id,
      minTemp,
      maxTemp,
      minHum,
      maxHum,
      mediaTemp,
      mediaHum,
    });

    // Atualiza minmax do dia "Hoje"
    setMinmax((prev) => {
      // Copia a parte de temperatura
      const updatedTemp = [...prev[0]];
      updatedTemp[0] = { ...updatedTemp[0], min: minTemp, max: maxTemp };

      // Copia a parte de umidade
      const updatedHum = [...prev[1]];
      updatedHum[0] = { ...updatedHum[0], min: minHum, max: maxHum };

      return [updatedTemp, updatedHum];
    });
  }, [dadosDevice]);

  // ------------- ÍCONES DE WIFI E BATERIA -------------
  const getWifiIcon = () => {
    if (!lastItem) return null;
    const rssi = lastItem.rssi ?? -999;
    if (rssi >= -30) return <MdSignalWifiStatusbar4Bar size={30} />;
    if (rssi >= -50) return <MdSignalWifiStatusbar3Bar size={30} />;
    if (rssi >= -65) return <MdSignalWifiStatusbar2Bar size={30} />;
    if (rssi >= -80) return <MdSignalWifiStatusbar1Bar size={30} />;
    return <MdSignalWifiStatusbarConnectedNoInternet size={30} />;
  };

  const getBatteryIcon = () => {
    if (!lastItem || lastItem.bateria == null) {
      return <MdBatteryAlert size={30} color="red" />;
    }
    const bateria = lastItem.bateria;
    if (bateria >= 90) return <MdBatteryFull size={30} />;
    if (bateria >= 80) return <MdBattery90 size={30} />;
    if (bateria >= 60) return <MdBattery80 size={30} />;
    if (bateria >= 50) return <MdBattery60 size={30} />;
    if (bateria >= 30) return <MdBattery50 size={30} />;
    if (bateria >= 20) return <MdBattery30 size={30} />;
    if (bateria >= 10) return <MdBattery20 size={30} />;
    return <MdBatteryAlert size={30} color="red" />;
  };

  // ------------- FUNÇÕES DE EDIÇÃO -------------
  // Quando o usuário clica em um campo, entramos em modo de edição
  const handleFieldClick = (fieldName) => {
    setEditingField(fieldName);
  };

  // Quando o usuário altera o valor
  const handleFieldChange = (fieldName, newValue) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  // Quando o usuário sai do campo (onBlur) ou aperta Enter, salva no backend
  const handleFieldBlur = async () => {
    setEditingField(null);

    try {
      await Api.put(`/at_sensor?chipid=${dadosConfig.chipid}`, {
        nome_dispositivo: editableFields.nome_dispositivo,
        local: editableFields.local,
        referencia_temp: editableFields.referencia_temp,
        referencia_umid: editableFields.referencia_umid,
      });
      console.log("Atualização salva com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o sensor:", error);
    }
  };

  // Se o usuário apertar Enter, salva também
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // força o onBlur
    }
  };

  return (
    <div className="dashboardDevice">
      <div className="infodash">
        <div className="infodashtemp">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="../device.svg"
              width={"auto"}
              height={100}
              style={{ marginRight: 20 }}
              alt="device"
            />
            <div className="dashheader">
              <p className="active"></p>
              {getWifiIcon()}
              <div className="batterydash">
                {getBatteryIcon()}{" "}
                {lastItem && lastItem.bateria != null
                  ? lastItem.bateria + "%"
                  : "--%"}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {editingField === "nome_dispositivo" ? (
                <input
                  type="text"
                  value={editableFields.nome_dispositivo}
                  onChange={(e) =>
                    handleFieldChange("nome_dispositivo", e.target.value)
                  }
                  onBlur={handleFieldBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="sensor-name-input"
                />
              ) : (
                <div
                  className="sensor-name-container"
                  onClick={() => handleFieldClick("nome_dispositivo")}
                  style={{ cursor: "pointer" }}
                >
                  <h1 className="sensor-name">
                    {editableFields.nome_dispositivo || "Sem nome"}
                  </h1>
                  <HiPencil className="edit-icon" />
                </div>
              )}


              {editingField === "local" ? (
                <input
                  type="text"
                  value={editableFields.local}
                  onChange={(e) => handleFieldChange("local", e.target.value)}
                  onBlur={handleFieldBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="sensor-name-input sensor-local-input"
                />
              ) : (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFieldClick("local")}
                >
                  <FaLocationCrosshairs />{" "}
                  {editableFields.local || "Local indefinido"}
                </p>
              )}

              <div className="dashheaderr">
                <p>
                  WI-FI:{" "}
                  <span className="bginfo">{lastItem ? lastItem.ssid : "--"}</span>
                </p>
                <p>
                  ChipID:{" "}
                  <span className="bginfo">
                    {lastItem ? lastItem.chipid : "--"}
                  </span>
                </p>
                <p>
                  IP:{" "}
                  <span className="bginfo">{lastItem ? lastItem.ip : "--"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Boxes sensorDados={ultimaTrans} />
      </div>

      <div className="tablestemp">
        {/* Tabela de Temperatura */}
        <div className="temperature-table">
          <h1 className="temperature-main">
            <p className="temperature-label">Temperatura atual</p>
            <RiTempColdLine size={40} color="#FFFFFF" />
            {ultimaTrans ? ultimaTrans.temperatura : "--"}
            <TbTemperatureCelsius />
            <p className="temperature-recommendation">
              Referência:{" "}
              {editingField === "referencia_temp" ? (
                <input
                  type="text"
                  value={editableFields.referencia_temp}
                  onChange={(e) =>
                    handleFieldChange("referencia_temp", e.target.value)
                  }
                  onBlur={handleFieldBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="sensor-name-input sensor-ref-input"
                />
              ) : (
                <span
                  onClick={() => handleFieldClick("referencia_temp")}
                  style={{ cursor: "pointer" }}
                >
                  {editableFields.referencia_temp || "N/A"}
                  <HiPencil
                    size={15}
                    style={{ marginLeft: 4, verticalAlign: "middle" }}
                  />
                </span>
              )}
            </p>
          </h1>

          <div className="temperature-history">
            {minmax[0].map((temp, index) => (
              <div key={index} className="temperature-row">
                <span className="date">{temp.date}</span>
                <span className="temp-min">{temp.min}°</span>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span className="temp-max">{temp.max}°</span>
              </div>
            ))}
          </div>
          <p className="view-history">Ver histórico completo</p>
        </div>

        {/* Tabela de Umidade */}
        <div className="temperature-table">
          <h1 className="temperature-main">
            <p className="temperature-label">Umidade atual</p>
            <LuDroplet size={43} color="#FFFFFF" />{" "}
            {ultimaTrans ? ultimaTrans.umidade : "--"}
            <AiOutlinePercentage size={30} />
            <p className="temperature-recommendation">
              Referência:{" "}
              {editingField === "referencia_umid" ? (
                <input
                  type="text"
                  value={editableFields.referencia_umid}
                  onChange={(e) =>
                    handleFieldChange("referencia_umid", e.target.value)
                  }
                  onBlur={handleFieldBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="sensor-name-input sensor-ref-input"
                />
              ) : (
                <span
                  onClick={() => handleFieldClick("referencia_umid")}
                  style={{ cursor: "pointer" }}
                >
                  {editableFields.referencia_umid || "N/A"}
                  <HiPencil
                    size={15}
                    style={{ marginLeft: 4, verticalAlign: "middle" }}
                  />
                </span>
              )}
            </p>
          </h1>

          <div className="temperature-history">
            {minmax[1].map((temp, index) => (
              <div key={index} className="temperature-row">
                <span className="date">{temp.date}</span>
                <span className="temp-min">{temp.min}%</span>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span className="temp-max">{temp.max}%</span>
              </div>
            ))}
          </div>
          <p className="view-history">Ver histórico completo</p>
        </div>
      </div>
    </div>
  );
}
