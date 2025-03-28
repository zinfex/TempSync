import React from 'react';
import { FiServer, FiUser, FiCpu } from 'react-icons/fi';
import './LogItem.css';

const LogItem = ({ type, timestamp, event, details, severity }) => {
    const getIcon = () => {
        switch (type) {
            case 'device':
                return <FiCpu />;
            case 'system':
                return <FiServer />;
            case 'user':
                return <FiUser />;
            default:
                return <FiServer />;
        }
    };

    const getSeverityClass = () => {
        switch (severity.toLowerCase()) {
            case 'critical':
                return 'critical';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            case 'success':
                return 'success';
            default:
                return 'info';
        }
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="log-item">
            <div className="log-icon">
                {getIcon()}
            </div>
            <div className="log-content">
                <div className="log-header">
                    <span className="log-timestamp">{formatTimestamp(timestamp)}</span>
                    <span className={`log-severity ${getSeverityClass()}`}>
                        {severity}
                    </span>
                </div>
                <div className="log-event">{event}</div>
                <div className="log-details">{details}</div>
            </div>
        </div>
    );
};

export default LogItem; 