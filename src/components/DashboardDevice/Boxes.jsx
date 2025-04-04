import React from "react";
import { FaTemperatureLow } from "react-icons/fa";
import { LuDroplet } from "react-icons/lu";
import { RiAlarmWarningLine } from "react-icons/ri";
import { IoTimer } from "react-icons/io5";
import { TbTemperatureCelsius } from "react-icons/tb";
import { AiOutlinePercentage } from "react-icons/ai";
import "./index.css";

export default function Boxes({ sensorDados }) {
    return ( 
        <div className="infos">
            
            <div className="boxgrid"> 
                <div className="box">
                    <div className="info">
                        <FaTemperatureLow size={40} />
                        <span>Média últimas 24h</span>
                    </div>
                    <span className="value">{sensorDados ? sensorDados.mediaTemp : "--"}<TbTemperatureCelsius /></span>
 
                </div> 

                <div className="box">
                    <div className="info">
                        <LuDroplet  size={40} /> 
                        <span>Média últimas 24h</span>
                    </div>
                    <span className="value">{sensorDados ? sensorDados.mediaHum : "--"}<AiOutlinePercentage size={30} /></span>

                </div>

                <div className="box">
                    <div className="info">
                        <IoTimer size={40} />
                        <span>UPTIME</span>
                    </div>
                    <span className="value">99<AiOutlinePercentage size={30} /></span>
                </div>

                <div className="box">
                    <div className="info">
                        <RiAlarmWarningLine size={40} />
                        <span>Situação</span>
                    </div>
                    <div className="status">Normal</div>
                </div>
            </div>
            <div className="att">
                <span>Última transmissão:</span>{" "}
                <p>{sensorDados ? sensorDados.hora : "--"}</p>
            </div>
        </div>
    );
}
