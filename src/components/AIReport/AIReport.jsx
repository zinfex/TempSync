import React from 'react';
import { AiOutlineOpenAI } from "react-icons/ai";
import './AIReport.css';

export default function AIReport({ report, onGenerateReport }) {
    return (
        <div className="right-panel">
            {report ? (
                <div className="ai-report">
                    <div className="report-header">
                        <h3><AiOutlineOpenAI /> Análise de IA</h3>
                        <span className="timestamp">Gerado às {new Date().toLocaleTimeString()}</span>
                    </div>
                    <pre className="report-content">
                        {report}
                    </pre>
                </div>
            ) : (
                <div className="empty-report">
                    <AiOutlineOpenAI size={50} />
                    <p>Clique no botão abaixo para gerar uma análise detalhada com IA</p>
                </div>
            )}

            <button
                className="generate-report-btn"
                onClick={onGenerateReport}
            >
                <AiOutlineOpenAI size={30} /> Gerar Relatório com IA
            </button>
        </div>
    );
} 