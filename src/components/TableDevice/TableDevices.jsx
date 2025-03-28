import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { RiTempColdLine } from "react-icons/ri";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Api from "../../config/Api"; // Importa a API (Axios)
import { useSensor } from "../../context/SensorContext";
import { RiEditBoxFill } from "react-icons/ri";

// Ícones de Wi-Fi
import {
  MdSignalWifiStatusbar4Bar,
  MdSignalWifiStatusbar3Bar,
  MdSignalWifiStatusbar2Bar,
  MdSignalWifiStatusbar1Bar,
  MdSignalWifiStatusbarConnectedNoInternet,
} from "react-icons/md";

// Ícones de bateria
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
import { BlinkBlur, Commet, Riple } from "react-loading-indicators";
import { IoIosMore, IoMdArrowDropdown } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";
import { CgMoreO, CgMoreR } from "react-icons/cg";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import Alert from "../Modal/Alert";

export default function TableDevices() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [device, setDevice] = useState({});
  const { setSensorDados, setUltimoDados, configsSensor} = useSensor()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [step, setStep] = useState(0);
  const [newDevice, setNewDevice] = useState({
    ssid: "",
    temperatura: "",
    umidade: "",
    rssi: "",
    local: "",
    status: ""
  });
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  // useEffect(() => {
  //   async function fetchDevices() {
  //     try {
  //       const response = await Api.get("/sensores");
  //         setDevices(response.data)
  //     } catch (error) {
  //       console.error("Erro ao buscar os dados da API:", error);
  //     }
  //   }
  //   fetchDevices();
  // }, [setUltimoDados]);

  useEffect(() => {
    fetch('/devices.json')
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error("Erro ao buscar arquivo JSON:", error));
  }, []);

  const openModal = () => {setIsModalOpen(true); setStep(0); setNewDevice({sid: "", rssi: "", local: ""})};
  const closeModal = () => setIsModalOpen(false);
  const handleNextStep = () => setStep((prevStep) => prevStep + 1);

  //Por enquanto não está havendo aprovação de criação de cards
  // const handleAddDevice = () => {
  //   const newSensor = {
  //     ...newDevice,
  //     temperatura: (Math.random() * -30).toFixed(1), // Simula temperatura
  //     chipid: `sensor-${devices.length + 1}`,
  //   };

  //   setDevices([...devices, newSensor]);
  //   closeModal();
  // };

  const getWifiIcon = (rssi) => {
    if (rssi >= -30) return <MdSignalWifiStatusbar4Bar size={30} />;
    if (rssi >= -50) return <MdSignalWifiStatusbar3Bar size={30} />;
    if (rssi >= -65) return <MdSignalWifiStatusbar2Bar size={30} />;
    if (rssi >= -80) return <MdSignalWifiStatusbar1Bar size={30} />;
    return <MdSignalWifiStatusbarConnectedNoInternet size={30} />;
  };

  const getBatteryIcon = (bateria) => {
    if (!bateria) return <MdBatteryAlert size={30} color="red" />;
    if (bateria >= 90) return <MdBatteryFull size={30} />;
    if (bateria >= 80) return <MdBattery90 size={30} />;
    if (bateria >= 60) return <MdBattery80 size={30} />;
    if (bateria >= 50) return <MdBattery60 size={30} />;
    if (bateria >= 30) return <MdBattery50 size={30} />;
    if (bateria >= 20) return <MdBattery30 size={30} />;
    if (bateria >= 10) return <MdBattery20 size={30} />;
    return <MdBatteryAlert size={30} color="red" />;
  };

  return (
    <div className="deviceclientPage">
      <div className="box1">
        <div className="order-container client">
          <header>
            <div className="infoheader">
              <h2 style={{ margin: "0" }}>Meus sensores cadastrado</h2>
              <p style={{ marginTop: "0" }}>Escolha o sensor que você queira ver as informações</p>
            </div>

            <div className="infoheader2">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar sensores"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-bar"
                />
              </div>
            </div>
          </header>

          <div className="devices-container">
              {devices.length === 0 ? (
                <div className="loading">
                  <Riple color="#6132E8" size="large" text="" textColor="" />
                </div>
              ) : (
                devices
                  .filter((dev) =>
                    dev.nome_dispositivo
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((dev) => (
                    <div
                      key={dev.id}
                      className="device-card"
                      onClick={() => {
                        setSensorDados(dev);
                        navigate(`/dashboard/${dev.chipid}`);
                      }}
                    >
                      <h3 className="device-name">
                        <span>
                          {getWifiIcon(dev.rssi || -100)}{" "}
                          {dev.nome_dispositivo || dev.chipid || "Desconhecido"}
                        </span>
                        <p
                          className={
                            dev.status?.toLowerCase() === "ativo"
                              ? "active"
                              : dev.status?.toLowerCase() === "pendente"
                              ? "pending"
                              : "inactive"
                          }
                        ></p>
                      </h3>

                      <p className="device-desc">
                        <FaLocationCrosshairs />{" "}
                        {dev.local || "Local não definido"}
                      </p>

                      <div className="device-info">
                        <RiTempColdLine size={30} />
                        <span className="temperature">
                          {dev.media_atual
                            ? parseFloat(dev.media_atual).toFixed(1)
                            : "--"}
                          <TbTemperatureCelsius size={20} />
                        </span>
                      </div>

                      {dev.referencia_temp && (
                        <span style={{ fontSize: 13 ,border: '1px solid rgba(255, 255, 255, 0.1)', padding: 5, borderRadius: 20}}>Recomendado: {dev.referencia_temp}</span>
                      )}

                      <div className="device-actions">
                        <div style={{ display: "flex", alignItems: "end" }}>
                          <button
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <FiEdit size={24} />
                          </button>
                        </div>

                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 13,
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          <span className="bgok">ALERTA ATIVO</span>
                          {getBatteryIcon(dev.bateria)}
                          {dev.bateria ? `${dev.bateria}%` : ""}
                        </div>
                      </div>
                    </div>
                  ))
              )}

              <div className="addcard" onClick={openModal}>
                <IoAddCircleOutline color="rgba(255, 255, 255, 0.436)" size={40} />
              </div>
            </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 style={{textAlign: 'center'}}>Selecione o sensor que deseja ativar</h3>
            <ul style={{ marginTop: "15px" }}>
              {devices.map((sensor) => (
                <li key={sensor.id} style={{ marginBottom: "10px"}}>
                  <label style={{ fontWeight: 600, fontSize: 20 }}>
                    <input
                      type="checkbox"
                      checked={true}
                      className="checkbox"
                      // onChange={() => handleCheckboxChange(sensor.id)}
                    />
                    {sensor.nome_dispositivo}
                  </label>
                  <IoMdArrowDropdown size={20}/>
                    <ul
                      style={{
                        marginLeft: "24px",
                        lineHeight: "1.4",
                        marginBottom: 20
                      }}
                    >
                      <li style={{ fontSize: 16 }}>
                        <span>CID:</span> {sensor.chipid}
                      </li>
                      <li style={{ fontSize: 16 }}>
                        <span>Local:</span> {sensor.local}
                      </li>
                      <li style={{ fontSize: 16 }}>
                        <span>IP:</span> {sensor.ip}
                      </li>
                    </ul>
                </li>
              ))}
            </ul>
            <button onClick={closeModal}>Pronto</button>
          </div>
        </div>
      )}

      {showAlert && (
        <Alert chipId="94C2540EE93C" onClose={handleCloseAlert} />
      )}
      {/* <Alert chipId={'94C2540EE93C'}/> */}
    </div>
  );
}
