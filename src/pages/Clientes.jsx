import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimple } from 'phosphor-react';
import { Link } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';
import CreateCliente from '../components/CreateCliente';

const Clientes = () => {
  const { data, error } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Cliente');

  return (
    <main>
      <Dialog.Root>
        <Dialog.Trigger className='dialog-trigger' asChild>
          <button>Cadastrar novo cliente</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='dialog-overlay' />
          <Dialog.Content className='dialog-content'>
            <Dialog.Title className='dialog-title'>Cadastrar novo cliente</Dialog.Title>
            <CreateCliente />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {
        data ? data.reverse().map((cliente, index) => (
          <div key={index}>
            <Link className='link' to={`/clientes/${cliente.id}`}   >
              <div className='card' key={index}>
                <div className='card-title'>nome: {cliente.nome}</div>
                <PencilSimple size={24} color='#252525' />
              </div>
            </Link>
          </div>
        )) : (
          <div>Carregando...</div>
        )
      }

    </main>
  );
}

export default Clientes;