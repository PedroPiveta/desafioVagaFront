import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Clientes from './pages/Clientes'
import Condutores from './pages/Condutores';
import Deslocamentos from './pages/Deslocamentos';
import DashBoard from './components/Dashboard';
import Veiculos from './pages/Veiculos';

function App() {
  
  return (
    <>
      <Router>
        <DashBoard />
        <Routes>
          <Route path='/' element={<Clientes />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/condutores' element={<Condutores />} />
          <Route path='/deslocamentos' element={<Deslocamentos />} />
          <Route path='/veiculos' element={<Veiculos />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
