import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useParams } from "react-router-dom";
import useFetchGet from "../hooks/useFetchGet";
import EditCliente from "../components/EditCliente";
import axios from "axios";

const DetalhesCliente = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFetchGet(
        `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`
    );

    error && console.log(error);

    const cliente = {
        "id": data?.id,
    };

    const handleDelete = async () => {
        if (data) {
            try {
                await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }, data: cliente,
                });
                alert('Cliente excluído com sucesso!');
                window.location.href = '/clientes';
            } catch {
                alert('Não foi possível excluir o cliente!');
            }
        }

    };




    return (
        <main className="detalhes">
            <h1>Dados Cliente</h1>
            {isPending && <div>Carregando...</div>}
            <div>nome: {data?.nome}</div>
            <div>numero documento: {data?.numeroDocumento}</div>
            <div>tipo documento: {data?.tipoDocumento}</div>
            <div>logradouro: {data?.logradouro}</div>
            <div>numero: {data?.numero}</div>
            <div>bairro: {data?.bairro}</div>
            <div>cidade: {data?.cidade}</div>
            <div>uf: {data?.uf}</div>


            <div className="manage">
                <Dialog.Root>
                    <Dialog.Trigger className="dialog-trigger" asChild>
                        <button>Editar cliente</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title className="dialog-title">Editar cliente</Dialog.Title>
                            <EditCliente />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

                {data && (<AlertDialog.Root>
                    <AlertDialog.Trigger id="delete-btn">
                        <div>Excluir Cliente</div>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="dialog-overlay" />
                        <AlertDialog.Content className="dialog-content">
                            <AlertDialog.Title className="dialog-title">Você tem certeza?</AlertDialog.Title>
                            <AlertDialog.Description className="dialog-description">
                                <p>Todos os deslocamentos associados com o cliente {data.nome} serão apagados</p>
                            </AlertDialog.Description>
                            <div className="alert-buttons">
                                <AlertDialog.Cancel asChild>
                                    <button className="Button mauve">Cancelar</button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <button id="delete-btn" onClick={() => handleDelete(cliente.id)}>Tudo bem, apagar cliente</button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>)}
            </div>

            {/* <Dialog.Root>
                <Dialog.Trigger className="dialog-trigger" asChild>
                    <button>Excluir cliente</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                        <Dialog.Title className="dialog-title">Excluir cliente</Dialog.Title>
                        <button onClick={handleDelete}>Excluir Cliente</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root> */}
        </main>
    );
};

export default DetalhesCliente;
