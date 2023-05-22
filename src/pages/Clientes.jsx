import * as Dialog from '@radix-ui/react-dialog';
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
          <div className='card' key={index}>
            <div>nome: {cliente.nome}</div>
            <div>numero documento: {cliente.numeroDocumento}</div>
            <div>tipo documento: {cliente.tipoDocumento}</div>
            <div>logradouro: {cliente.logradouro}</div>
            <div>numero: {cliente.numero}</div>
            <div>bairro: {cliente.bairro}</div>
            <div>cidade: {cliente.cidade}</div>
            <div>uf: {cliente.uf}</div>
          </div>
        )) : (
          <div>Carregando...</div>
        )
      }
    </main>
  );
}

export default Clientes;