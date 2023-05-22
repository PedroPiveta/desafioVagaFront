import axios from "axios";
import useFetchGet from "../hooks/useFetchGet";
import { useState } from "react";

const CreateDeslocamento = () => {
    const condutor = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor');
    const cliente = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
    const veiculos = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Veiculo');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deslocamento = {
            placa,
            marcaModelo,
            anoFabricacao,
            kmAtual,
        }
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento', deslocamento);
        window.location.href = '/deslocamentos';
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="veiculos">Selecione o veiculo</label>
                <select name="veiculos" id="veiculos">
                    { veiculos ? veiculos.data.map((veiculo, index) => (
                        <option key={index} value={veiculo.id}>{veiculo.marcaModelo}</option>
                    )) : (<option>Carregando...</option>)}
                </select>
            </form>
        </>
    );
}


export default CreateDeslocamento;