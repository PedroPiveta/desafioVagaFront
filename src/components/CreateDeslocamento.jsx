import axios from "axios";
import useFetchGet from "../hooks/useFetchGet";
import { useState, useEffect } from "react";

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

    useEffect(() => {
        if (condutores.data && condutores.data.length > 0) {
          setIdCondutor(condutores.data[0].id);
        }
        if (veiculos.data && veiculos.data.length > 0) {
          setIdVeiculo(veiculos.data[0].id);
        }
        if (clientes.data && clientes.data.length > 0) {
          setIdCliente(clientes.data[0].id);
        }
      }, [condutores, veiculos, clientes]);
    

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
        
        try {
            await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', deslocamento);
            window.location.reload()
        } catch (error) {
            console.log(idCliente, idCondutor, idVeiculo);
            console.log(error);
        }
    }

    if(condutores.isPending || veiculos.isPending || clientes.isPending){
        return (<div>Carregando...</div>)
    } 
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="clientes">Selecione o cliente</label>
                <select value={idCliente} name="clientes" id="clientes" onChange={(e) => setIdCliente(parseInt(e.target.value))}>
                    {clientes.isPending && <option>Carregando...</option>}
                    {clientes.error && <option>{clientes.error}</option>}
                    {clientes.data && clientes.data.map((cliente, index) => (
                        <option key={index} value={cliente.id}>{cliente.nome}</option>
                    ))}
                </select>
                <label htmlFor="condutores">Selecione o condutor</label>
                <select value={idCondutor} name="condutores" id="condutores" onChange={(e) => setIdCondutor(parseInt(e.target.value))}>
                    {condutores.isPending && <option>Carregando...</option>}
                    {condutores.error && <option>{condutores.error}</option>}
                    {condutores.data && condutores.data.map((condutor, index) => (
                        <option key={index} value={condutor.id}>{condutor.nome}</option>
                    ))}
                </select>
                <label htmlFor="veiculos">Selecione o veiculo</label>
                <select value={idVeiculo} name="veiculos" id="veiculos" onChange={(e) => setIdVeiculo(parseInt(e.target.value))}>
                    {veiculos.isPending && <option>Carregando...</option>}
                    {veiculos.error && <option>{veiculos.error}</option>}
                    {veiculos.data && veiculos.data.map((veiculo, index) => (
                        <option key={index} value={veiculo.id}>{veiculo.marcaModelo}</option>
                    ))}
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