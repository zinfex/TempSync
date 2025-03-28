import React from 'react';
import './EventLog.css';

export default function EventLog({ events }) {
    return (
        <div className="logs-section">
            <div className="logs-header">
                <h2>Histórico de Eventos</h2>
                <div className="logs-filter">
                    <button className="filter-btn active">Todos</button>
                    <button className="filter-btn">Alertas</button>
                    <button className="filter-btn">Normalizações</button>
                </div>
            </div>

            <div className="logs-list">
                {events.map((event, index) => (
                    <React.Fragment key={index}>
                        <div className="log-item">
                            <div className="log-time">{event.time}</div>
                            <div className={`${event.status} status-dot`}></div>
                            <div className="log-content">
                                <p className="log-title">{event.title}</p>
                                <p className="log-details">{event.details}</p>
                            </div>
                        </div>
                        {index < events.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
} 