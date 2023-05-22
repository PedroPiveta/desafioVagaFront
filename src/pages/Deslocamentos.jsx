import CreateDeslocamento from "../components/CreateDeslocamento";
import useFetchGet from "../hooks/useFetchGet";
import * as Dialog from '@radix-ui/react-dialog';

const Deslocamentos = () => {
    const { data, error } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento');

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger className='dialog-trigger' asChild>
                    <button>Cadastrar novo deslocamento</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo deslocamento</Dialog.Title>
                        <CreateDeslocamento />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            {
                data ? data.reverse().map((deslocamento, index) => (
                    <div className='card' key={index}>
                        <div>id: {deslocamento.id}</div>
                    </div>
                )) : (
                    <div>Carregando...</div>
                )
            }
        </main>
    );
}

export default Deslocamentos;