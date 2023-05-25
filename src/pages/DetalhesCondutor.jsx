import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";
import EditCondutor from "../components/EditCondutor";
import axios from "axios";

const DeatlhesCondutor = () => {
    const { id } = useParams();
    const { data, error } = useFetchGet(
        `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`
    );

    error && console.log(error);

    const [formattedData, setFormattedData] = useState(null);

    const condutor = {
        id: data?.id,
    };

      useEffect(() => {
        if (data) {
          const vencimentoHabilitacao = new Date(data.vencimentoHabilitacao);
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(
            vencimentoHabilitacao
          );

          setFormattedData(formattedDate);
        }
      }, [data]);

    const handleDelete = async () => {
        if (data) {

            try {
                await axios.delete(
                    `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: condutor, // Usar a variável condutor ao invés de cliente
                    }
                );
                alert("Condutor excluído com sucesso!");
                window.location.href = "/condutores";
            } catch {
                alert("Não foi possível excluir o condutor!");
            }
        }
    };

    return (
        <main className="detalhes">
            
            <h1>Dados Condutor</h1>
            <div><span>Nome:</span> {data?.nome}</div>
            <div><span>Número habilitação:</span> {data?.numeroHabilitacao}</div>
            <div><span>Categoria habilitação:</span> {data?.catergoriaHabilitacao}</div>
            <div><span>Vencimento da habilitação:</span> {formattedData}</div>

            <div className="manage">
                <Dialog.Root>
                    <Dialog.Trigger className="dialog-trigger" asChild>
                        <button>Editar condutor</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title className="dialog-title">
                                Editar dados do condutor
                            </Dialog.Title>
                            <EditCondutor />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

                {data && (<AlertDialog.Root>
                    <AlertDialog.Trigger id="delete-btn">
                        <div>Excluir Condutor</div>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="dialog-overlay" />
                        <AlertDialog.Content className="dialog-content">
                            <AlertDialog.Title className="dialog-title">Você tem certeza?</AlertDialog.Title>
                            <AlertDialog.Description className="dialog-description">
                                <p>Todos os deslocamentos associados com o condutor {data.nome} serão apagados</p>
                            </AlertDialog.Description>
                            <div className="alert-buttons">
                                <AlertDialog.Cancel asChild>
                                    <button className="Button mauve">Cancelar</button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <button id="delete-btn" onClick={() => handleDelete(data.id)}>Tudo bem, apagar condutor</button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>)}
            </div>
        </main>
    );
};

export default DeatlhesCondutor;
