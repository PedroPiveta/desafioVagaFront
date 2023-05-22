import CreateCondutor from "../components/CreateCondutor";
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from "react";
import useFetchGet from "../hooks/useFetchGet";

const Condutores = () => {
    const { data, error } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const [formattedData, setFormattedData] = useState(null);

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
                    <button>Cadastrar novo condutor</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='dialog-overlay' />
                    <Dialog.Content className='dialog-content'>
                        <Dialog.Title className='dialog-title'>Cadastrar novo condutor</Dialog.Title>
                        <CreateCondutor />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            {
                formattedData ? formattedData.map((condutor, index) => (
                    <div className='card' key={index}>
                        <div>nome: {condutor.nome}</div>
                        <div>numero habilitacao: {condutor.numeroHabilitacao}</div>
                        <div>categoria habilitacao: {condutor.catergoriaHabilitacao}</div>
                        <div>vencimento habilitacao: {condutor.vencimentoHabilitacao}</div>
                    </div>
                )) : (
                    <div>Carregando...</div>
                )
            }
        </main>
    );
}

export default Condutores;