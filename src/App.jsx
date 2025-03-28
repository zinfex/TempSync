import Devices from '../pages/Devices/Devices'
import Alert from './components/Modal/Alert';
import { useState } from 'react';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  // Função para abrir o modal
  const handleOpenAlert = () => {
    setShowAlert(true);
  };

  // Função para fechar o modal
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
        <Devices />
    </>
  )
}

export default App;