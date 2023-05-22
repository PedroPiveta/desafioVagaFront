import useFetchGet from "../hooks/useFetchGet";
import CreateVeiculo from "../components/CreateVeiculo";
import * as Dialog from '@radix-ui/react-dialog';

const Veiculos = () => {
    const { data, error } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger className='dialog-trigger' asChild>
                    <button>Cadastrar novo veículo</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo Veiculo</Dialog.Title>
                        <CreateVeiculo />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            {
                data ? data.reverse().map((veiculo, index) => (
                    <div className='card' key={index}>
                        <div>Placa: {veiculo.placa}</div>
                        <div>Marca: {veiculo.marcaModelo}</div>
                        <div>Ano Fabricação: {veiculo.anoFabricacao}</div>
                        <div>Quilometragem do veículo: {veiculo.kmAtual}</div>
                    </div>
                )) : (<div>Carregando...</div>)
            }
        </main>
    );
}

export default Veiculos;