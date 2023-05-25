import useFetchGet from "../hooks/useFetchGet";
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useParams } from "react-router-dom";
import axios from "axios";
import Editveiculo from "../components/EditVeiculo";

const DetalhesVeiculo = () => {
    const { id } = useParams();
    const { data, error } = useFetchGet(
        `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`
    );

    error && console.log(error);

    const veiculo = {
        "id": data?.id,
    };

    const handleDelete = async () => {
        if (data) {
            try {
                await axios.delete(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }, data: veiculo,
                });
                alert('Veiculo excluído com sucesso!');
                window.location.href = '/Veiculos';
            } catch {
                alert('Não foi possível excluir o Veiculo!');
            }
        }

    };

    return (
        <main className="detalhes">
            <h1>Dados do veiculo</h1>
            <div>Marca: {data?.marcaModelo}</div>
            <div>Placa: {data?.placa}</div>
            <div>Ano de fabricação: {data?.anoFabricacao}</div>
            <div>Quilometragem atual: {data?.kmAtual}</div>
    
            <div className="manage">
                <Dialog.Root>
                    <Dialog.Trigger className="dialog-trigger" asChild>
                        <button>Editar Veiculo</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title className="dialog-title">Editar Veiculo</Dialog.Title>
                            <Editveiculo />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                
                {data && (<AlertDialog.Root>
                    <AlertDialog.Trigger id="delete-btn">
                        <div>Excluir Veiculo</div>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="dialog-overlay" />
                        <AlertDialog.Content className="dialog-content">
                            <AlertDialog.Title className="dialog-title">Você tem certeza?</AlertDialog.Title>
                            <AlertDialog.Description className="dialog-description">
                                Todos os deslocamentos associados com o veiculo {data.marcaModelo} {data.anoFabricacao} serão apagados
                            </AlertDialog.Description>
                            <div className="alert-buttons">
                                <AlertDialog.Cancel asChild>
                                    <button className="Button mauve">Cancelar</button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <button id="delete-btn" onClick={() => handleDelete(data.id)}>Tudo bem, apagar veiculo</button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>)}
            </div>
        </main>
    );
};
 
export default DetalhesVeiculo;