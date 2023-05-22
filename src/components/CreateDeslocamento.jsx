import axios from "axios";
import useFetchGet from "../hooks/useFetchGet";
import { useState } from "react";

const CreateDeslocamento = () => {
    const condutores = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const veiculos = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');
    const clientes = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Cliente');

    const [checkList, setCheckList] = useState('');
    const [motivo, setMotivo] = useState('');
    const [observacao, setObservacao] = useState('');
    const [idCondutor, setIdCondutor] = useState(0);
    const [idVeiculo, setIdVeiculo] = useState(0);
    const [idCliente, setIdCliente] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deslocamento = {
            kmInicial: 0,
            inicioDeslocamento: new Date().toISOString(),
            checkList,
            motivo,
            observacao,
            idCondutor,
            idVeiculo,
            idCliente,
        }
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', deslocamento);
        window.location.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="condutores">Selecione o condutor</label>
                <select name="condutores" id="consutores" onChange={(e) => setIdCondutor(e.target.value)} >
                    { condutores.data ? condutores.data.map((condutor, index) => (
                        <option key={index} value={condutor.id}>{condutor.nome}</option>
                    )) : (<option>Carregando...</option>)}
                </select>
                <label htmlFor="veiculos">Selecione o veiculo</label>
                <select name="veiculos" id="veiculos" onChange={(e) => setIdVeiculo(e.target.value)} >
                    { veiculos.data ? veiculos.data.map((veiculo, index) => (
                        <option key={index} value={veiculo.id}>{veiculo.marcaModelo}</option>
                    )) : (<option>Carregando...</option>)}
                </select>
                <label htmlFor="clientes">Selecione o cliente</label>
                <select name="clientes" id="clientes" onChange={(e) => setIdCliente(e.target.value)} >
                    { clientes.data ? clientes.data.map((cliente, index) => (
                        <option key={index} value={cliente.id}>{cliente.nome}</option>
                    )) : (<option>Carregando...</option>)}
                </select>
                <label htmlFor="checkList">CheckList</label>
                <input type="text" name="checkList" id="checkList" onChange={(e) => setCheckList(e.target.value)} required />
                <label htmlFor="motivo">Motivo</label>
                <input type="text" name="motivo" id="motivo" onChange={(e) => setMotivo(e.target.value)} required />
                <label htmlFor="observacao">Observação</label>
                <input type="text" name="observacao" id="observacao" onChange={(e) => setObservacao(e.target.value)} required />
                <input type="submit" value="Iniciar novo deslocamento" />
            </form>
        </>
    );
}


export default CreateDeslocamento;