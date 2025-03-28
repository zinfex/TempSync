import React from 'react';
import './StatCard.css';

export default function StatCard({ icon: Icon, title, value, change, changeType }) {
    return (
        <div className="stat-card">
            <Icon className={`stat-icon ${changeType}`} />
            <div className="stat-info">
                <h3>{title}</h3>
                <p className="stat-value">{value}</p>
                {change && (
                    <p className={`stat-change ${changeType}`}>{change}</p>
                )}
            </div>
        </div>
    );
} 