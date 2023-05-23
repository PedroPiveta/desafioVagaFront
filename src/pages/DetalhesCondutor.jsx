import * as Dialog from "@radix-ui/react-dialog";
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
        <main>
            <h1>Dados Condutor</h1>
            <div>Nome: {data?.nome}</div>
            <div>Número habilitação: {data?.numeroHabilitacao}</div>
            <div>Categoria habilitação: {data?.catergoriaHabilitacao}</div>
            <div>Vencimento da habilitação: {formattedData}</div>

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
            <button onClick={handleDelete}>Excluir Condutor</button>
        </main>
    );
};

export default DeatlhesCondutor;
