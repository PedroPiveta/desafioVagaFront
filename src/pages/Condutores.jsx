import CreateCondutor from "../components/CreateCondutor";
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from "react-router-dom";
import { Plus, PencilSimple } from "phosphor-react";
import { useState, useEffect } from "react";
import useFetchGet from "../hooks/useFetchGet";

const Condutores = () => {
    const { data, error, isPending } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const [formattedData, setFormattedData] = useState(null);

    let color = '#6c68ff';


    useEffect(() => {
        if (data) {
            const formattedCondutors = data.reverse().map((condutor) => {
                const vencimentoHabilitacao = new Date(condutor.vencimentoHabilitacao);

                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };

                const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(vencimentoHabilitacao);

                return {
                    ...condutor,
                    vencimentoHabilitacao: formattedDate,
                };
            });

            setFormattedData(formattedCondutors);
        }
    }, [data]);

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger className="dialog-trigger" asChild>
                    <button>Cadastrar novo condutor <Plus size={16} color={color} /></button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo condutor</Dialog.Title>
                        <CreateCondutor />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            
            { isPending && <div>Carregando...</div> }
            { error && <div>{ error }</div> }
            { formattedData && formattedData.map((condutor, index) => (
                <div key={index}>
                    <Link className="link" to={`/condutores/${condutor.id}`}>
                        <div className='card'>
                            <div>nome: {condutor.nome}</div>
                            <PencilSimple size={24} color={color} />
                        </div>
                    </Link>
                </div>
            ))}
        </main>
    );
}

export default Condutores;