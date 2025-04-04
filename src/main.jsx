import { StrictMode, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Devices from '../pages/Devices/Devices.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import { SensorProvider } from './context/SensorContext'; // Importa o SensorProvider
import Reports from '../pages/Reports/Reports.jsx';
// import Logs from '../pages/Logs/Logs.jsx';
import LogItem from './components/LogItem/LogItem.jsx';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function Root() {
  const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/devices', element: <Devices /> },
    { path: '/dashboard/:chipid', element: <Dashboard />},
    // { path: '/dashboard', element: <Dashboard/> },
    // { path: '/reports', element: <Reports />},
  ]);

  return (
    <AuthContext.Provider>
      <SensorProvider> 
        <RouterProvider router={router} />
      </SensorProvider>
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
    <Root />
);