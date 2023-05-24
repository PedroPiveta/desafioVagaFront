import useFetchGet from "../hooks/useFetchGet";
import * as Dialog from '@radix-ui/react-dialog';
import { useParams } from "react-router-dom";
import axios from "axios";
import Editveiculo from "../components/EditVeiculo";

const DetalhesVeiculos = () => {
    const { id } = useParams();
    const { data, error } = useFetchGet(
        `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`
    );

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
        <main>
            <h1>Dados do veiculo</h1>
            <div>Marca: {data?.marcaModelo}</div>
            <div>Ano de fabricação: {data?.anoFabricacao}</div>
            <div>Quilometragem atual: {data?.kmAtual}</div>
    
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
            
            <button onClick={handleDelete}>Excluir Veiculo</button>

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
 
export default DetalhesVeiculos;