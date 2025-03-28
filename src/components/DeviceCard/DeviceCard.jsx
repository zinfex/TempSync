import React from 'react';
import { BiDevices } from "react-icons/bi";
import { FiThermometer, FiClock, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import './DeviceCard.css';

export default function DeviceCard({
    deviceName,
    status,
    temperature,
    lastReading,
    alertMessage
}) {
    return (
        <div className="device-card report-card">
            <div className="card-header">
                <h2><BiDevices /> {deviceName}</h2>
                <span className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                </span>
            </div>

            <div className="sensor-details">
                <div className="detail-item">
                    <FiThermometer />
                    <span>Temperatura Atual: <strong>{temperature}</strong></span>
                </div>
                <div className="detail-item">
                    <FiClock />
                    <span>Última Leitura: <strong>{lastReading}</strong></span>
                </div>
            </div>

            {alertMessage && (
                <div className="alert-message">
                    <FiAlertTriangle />
                    <p>{alertMessage}</p>
                </div>
            )}

            <button className="verify-btn">
                <FiCheckCircle /> Verificar Dispositivo
            </button>
        </div>
    );
} 