import useFetchGet from "../hooks/useFetchGet";
import CreateVeiculo from "../components/CreateVeiculo";
import { Plus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

const Veiculos = () => {
    const { data, error, isPending } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger className='dialog-trigger' asChild>
                    <button>Cadastrar novo veículo <Plus size={16} color='#ebf1f1' /></button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo Veiculo</Dialog.Title>
                        <CreateVeiculo />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            
            {isPending && <div>Carregando...</div>}
            {error && <div>{error}</div>}
            {data && data.reverse().map((veiculo, index) => (
                <div className='card' key={index}>
                    <div>Marca: {veiculo.marcaModelo}</div>
                </div>
            ))}
        </main>
    );
}

export default Veiculos;