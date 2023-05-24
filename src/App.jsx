import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Clientes from './pages/Clientes'
import DetalhesCliente from './pages/DetalhesCliente';
import Condutores from './pages/Condutores';
import DeatlhesCondutor from './pages/DetalhesCondutor';
import Deslocamentos from './pages/Deslocamentos';
import DashBoard from './components/Dashboard';
import Veiculos from './pages/Veiculos';
import NotFound from './pages/NotFound';
import DetalhesVeiculos from './pages/DetalhesVeiculos';

function App() {
  
  return (
    <>
      <Router>
        <DashBoard />
        <Routes>
          <Route path='/' element={<Clientes />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/clientes/:id' element={<DetalhesCliente />} />
          <Route path='/condutores' element={<Condutores />} />
          <Route path='/condutores/:id' element={<DeatlhesCondutor />} />
          <Route path='/deslocamentos' element={<Deslocamentos />} />
          <Route path='/veiculos' element={<Veiculos />} />
          <Route path='/veiculos/:id' element={<DetalhesVeiculos />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
