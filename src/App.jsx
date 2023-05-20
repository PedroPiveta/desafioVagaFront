import * as Tabs from '@radix-ui/react-tabs';
import './App.css'
import Clientes from './pages/Clientes'
import Condutores from './pages/Condutores';
import Deslocamentos from './pages/Deslocamentos';

function App() {
  
  return (
    <>
      <Tabs.Root className='tabs-root' defaultValue='tab1'>
        <Tabs.List className='tabs-list'>
          <Tabs.Trigger className='tabs-trigger' value='tab1'>
            Clientes
          </Tabs.Trigger>
          <Tabs.Trigger className='tabs-trigger' value='tab2'>
            Condutor
          </Tabs.Trigger>
          <Tabs.Trigger className='tabs-trigger' value='tab3'>
            Deslocamento
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className='tabs-content' value='tab1'>
          <Clientes />
        </Tabs.Content>
        <Tabs.Content className='tabs-content' value='tab2'>
          <Condutores />
        </Tabs.Content>
        <Tabs.Content className='tabs-content' value='tab3'>
          <Deslocamentos />
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default App
