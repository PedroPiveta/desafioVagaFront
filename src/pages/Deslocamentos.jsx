import CreateDeslocamento from "../components/CreateDeslocamento";
import useFetchGet from "../hooks/useFetchGet";
import { useState, useEffect } from "react";
import { Plus, Trash, Check } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from "axios";

const Deslocamentos = () => {
    const { data, error, isPending } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento');
    const condutores = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const veiculos = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');
    const clientes = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
    const [formattedData, setFormattedData] = useState(null);
    const [createHandler, setCreateHandler] = useState(true);
    const [missing, setMissing] = useState('Para criar um deslocamento é necessário ter pelo menos um condutor, um veículo e um cliente cadastrados.');
    const [kmFinal, setKmFinal] = useState(0);
    const [observacao, setObservacao] = useState('');

    let color = '#6c68ff';


    useEffect(() => {
        if (condutores.data && veiculos.data && clientes.data) {
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

                inicioDeslocamento.setHours(inicioDeslocamento.getHours() - 3);
                const formattedInicio = inicioDeslocamento.toLocaleString('pt-BR', options);

                if (fimDeslocamento) {
                    fimDeslocamento.setHours(fimDeslocamento.getHours() - 3);
                }
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

    const handleDelete = async (id) => {
        if (formattedData) {
            const deslocamentoToDelete = formattedData.find((item) => item.id === id);
            if (deslocamentoToDelete) {
                const deleteData = {
                    id: deslocamentoToDelete.id,
                };

                try {
                    await axios.delete(
                        `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: deleteData,
                        }
                    );
                    alert("Deslocamento excluído com sucesso!");
                    window.location.reload();
                } catch {
                    alert("Não foi possível excluir o deslocamento!");
                }
            }
        }
    };

    const handleEncerrar = async (id) => {
        if (formattedData) {
            const deslocamentoToEncerrar = formattedData.find((item) => item.id === id);
            const fimDeslocamento = new Date().toISOString();

            if (deslocamentoToEncerrar) {

                const deslocamento = {
                    id: id,
                    kmFinal: parseInt(kmFinal),
                    fimDeslocamento : fimDeslocamento,
                    observacao : observacao,
                };

                try {
                    await axios.put(
                        `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}/EncerrarDeslocamento`, deslocamento);
                    alert("Deslocamento encerrado com sucesso!");
                    window.location.reload();
                } catch (error) {
                    alert("Não foi possível encerrar o deslocamento!");
                    console.log(formattedData)
                    console.log(deslocamento);
                    console.error(error);
                }
            } else {
                alert("Não é possível encerrar um deslocamento com data de fim menor ou igual à data de início!");
            }
        }
    };

    return (
        <main>
            <Dialog.Root>
                <Dialog.Trigger disabled={createHandler} className='dialog-trigger' asChild>
                    <button>Cadastrar novo deslocamento <Plus size={16} color={color} /></button>
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
                <div className='card deslocamento' key={index}>
                    <div className="info">
                        <div>Início do deslocamento: {deslocamento.inicioDeslocamento}</div>
                        {deslocamento.fimDeslocamento && <div>Fim do deslocamento: {deslocamento.fimDeslocamento}</div>}
                        <div>Km inicial: {deslocamento.kmInicial}</div>
                        {deslocamento.kmFinal && <div>Km final: {deslocamento.kmFinal}</div>}
                        <div>Checklist: {deslocamento.checkList}</div>
                        <div>Motivo: {deslocamento.motivo}</div>
                        <div>Observação: {deslocamento.observacao}</div>
                        {/* <div>Condutor: {condutor.data.nome}</div> */}
                    </div>
                    <div className="deslocamento-btn">
                        <abbr title="Clique para finalizar deslocamento">
                            <Dialog.Root>
                                <Dialog.Trigger className="dialog-trigger" asChild>
                                    <button disabled={deslocamento.fimDeslocamento ? true : false}>
                                        <Check size={24} color={color} className={deslocamento.fimDeslocamento ? 'encerrado' : ''} />
                                    </button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="dialog-overlay" />
                                    <Dialog.Content className="dialog-content">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleEncerrar(deslocamento.id)
                                        }}>
                                            <Dialog.Title className="dialog-title">Finalizar deslocamento</Dialog.Title>
                                            <label htmlFor="kmFinal">Km Final</label>
                                            <input type="number" id="kmFinal" name="kmFinal"  onChange={(e) => setKmFinal(e.target.value)} />
                                            <label htmlFor="observacao">Observação</label>
                                            <input type="text" id="observacao" name="observacao"  onChange={(e) => setObservacao(e.target.value)} />
                                            <input type="submit" />
                                        </form>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </abbr>
                        {formattedData && (<AlertDialog.Root>
                            <AlertDialog.Trigger className="dialog-trigger">
                                <Trash size={24} color={color} className="delete" />
                            </AlertDialog.Trigger>
                            <AlertDialog.Portal>
                                <AlertDialog.Overlay className="dialog-overlay" />
                                <AlertDialog.Content className="dialog-content">
                                    <AlertDialog.Title className="dialog-title">Você tem certeza?</AlertDialog.Title>
                                    <AlertDialog.Description className="dialog-description">
                                        Você está prestes a excluir o deslocamento {deslocamento.id}. Essa ação não pode ser desfeita.
                                    </AlertDialog.Description>
                                    <div className="alert-buttons">
                                        <AlertDialog.Cancel asChild>
                                            <button className="Button mauve">Cancelar</button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action asChild>
                                            <button id="delete-btn" onClick={() => handleDelete(deslocamento.id)}>Tudo bem, apagar deslocamento</button>
                                        </AlertDialog.Action>
                                    </div>
                                </AlertDialog.Content>
                            </AlertDialog.Portal>
                        </AlertDialog.Root>)}
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Deslocamentos;