import './index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineSensorWindow } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";

export default function DesktopSidebar({ page }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // Novo estado para controlar a abertura do dropdown no mobile
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const items = [
    { icon: <MdOutlineSensorWindow size={32} />, label: 'Sensores', direct: '/devices' },
    { icon: <LuLayoutDashboard  size={32} />, label: 'Dashboard', direct: '/dashboard' },
    { icon: <HiOutlineDocumentReport size={32} />, label: 'Relatórios', direct: '/reports' },
  ];

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  // Função que alterna a exibição do dropdown no mobile
  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  // Quando o usuário clicar em um link dentro do dropdown, feche o menu
  const handleLinkClick = () => {
    setMobileDropdownOpen(false);
  };

  return (
    <div id='sidebar'>
      {/* Botão de notificações */}
      <div className="nav-button notification-button">
        <FaBell size={25} />
      </div>

      {/* SIDEBAR DESKTOP */}
      <ul className='desktopSidebar'>
        {items.map((item, index) => (
          <Link to={item.direct} key={index} style={{ color: '#DFE1E5' }}>
            <li
              className={page === item.direct ? 'active' : ''} 
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.icon}
              <span className={`tooltip ${hoveredItem === index ? 'visible' : ''}`}>
                {item.label}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <ul className='mobileSidebar'>
        <li onClick={toggleMobileDropdown}>
          <RxDashboard size={32} />
          {mobileDropdownOpen && (
            <div className="mobile-dropdown">
              <Link to="/devices" onClick={handleLinkClick}>
                <MdOutlineSensorWindow size={17}/> Sensores
              </Link>
              <Link to="/dashboard" onClick={handleLinkClick}>
                <LuLayoutDashboard  size={17}/> Dashboard
              </Link>
              <Link to="/reports" onClick={handleLinkClick}>
                <HiOutlineDocumentReport size={17}/> Relatórios
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* Avatar e modo */}
      <div className="nav-button avatar-button" onClick={toggleTooltip}>
        <FaUserCircle size={30} />
        {tooltipVisible && (
          <div className="avatar-tooltip">
            <Link to='/devices'>
              <button>Modo Cliente</button>
            </Link>
            <Link to='/devices/admin'>
              <button>Modo Admin</button>
            </Link>
            <Link to='/logs'>
              <button>Logs</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
