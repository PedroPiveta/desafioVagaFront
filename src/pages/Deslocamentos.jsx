import CreateDeslocamento from "../components/CreateDeslocamento";
import useFetchGet from "../hooks/useFetchGet";
import { useState, useEffect } from "react";
import { Plus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

const Deslocamentos = () => {
    const { data, error, isPending } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento');
    const condutores = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const veiculos = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');
    const clientes = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
    const [formattedData, setFormattedData] = useState(null);
    const [fim, setFim] = useState(null); 
    const [createHandler, setCreateHandler] = useState(true);
    const [missing, setMissing] = useState('Para criar um deslocamento é necessário ter pelo menos um condutor, um veículo e um cliente cadastrados.');

    useEffect(() => {
        if(condutores.data && veiculos.data && clientes.data) {
            if (condutores.data.length > 0 && veiculos.data.length > 0 && clientes.data.length > 0) {
                setCreateHandler(false);
            }
        }
      }, [condutores, veiculos, clientes]);

      useEffect(() => {
        if (data) {
          const formattedDeslocamentos = data.reverse().map((deslocamento) => {
            const inicioDeslocamento = new Date(deslocamento.inicioDeslocamento);
            const fimDeslocamento = deslocamento.fimDeslocamento ? new Date(deslocamento.fimDeslocamento) : null;
      
            const options = {
              timeZone: 'America/Sao_Paulo',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            };
      
            const formattedInicio = inicioDeslocamento.toLocaleString('pt-BR', options);
            const formattedFim = fimDeslocamento ? fimDeslocamento.toLocaleString('pt-BR', options) : null;
      
            return {
              ...deslocamento,
              inicioDeslocamento: formattedInicio,
              fimDeslocamento: formattedFim,
            };
          });
      
          setFormattedData(formattedDeslocamentos);
        }
      }, [data]);
      

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger disabled={createHandler} className='dialog-trigger' asChild>
                    <button>Cadastrar novo deslocamento <Plus size={16} color='#ebf1f1' /></button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo deslocamento</Dialog.Title>
                        <CreateDeslocamento />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            {createHandler && <p className='missing'>{missing}</p>}
            
            {isPending && <div>Carregando...</div>}
            {error && <div>{error}</div>}
            {formattedData && formattedData.map((deslocamento, index) => (
                <div className='card' key={index}>
                    <div>Km inicial: {deslocamento.kmInicial}</div>
                    <div>Início do deslocamento: {deslocamento.inicioDeslocamento}</div>
                    { fim && <div>Fim do deslocamento: {fim}</div>}
                </div>
            ))}
        </main>
    );
}

export default Deslocamentos;