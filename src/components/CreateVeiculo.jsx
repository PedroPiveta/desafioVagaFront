import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router-dom";

const CreateVeiculo = () => {

    const [placa, setPlaca] = useState('');
    const [marcaModelo, setMarcaModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState(0);
    const [kmAtual, setKmAtual] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const veiculo = {
            placa,
            marcaModelo,
            anoFabricacao,
            kmAtual,
        }
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Veiculo', veiculo);
        window.location.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="placa">Placa</label>
                <input type="text" name="placa" id="placa" onChange={(e) => setPlaca(e.target.value)} required />
                <label htmlFor="marcaModelo">Marca/Modelo</label>
                <input type="text" name="marcaModelo" id="marcaModelo" onChange={(e) => setMarcaModelo(e.target.value)} required />
                <label htmlFor="anoFabricacao">Ano de Fabricação</label>
                <input type="number" name="anoFabricacao" id="anoFabricacao" onChange={(e) => setAnoFabricacao(parseInt(e.target.value))} required />
                <label htmlFor="kmAtual">Quilometragem Atual</label>
                <input type="number" name="kmAtual" id="kmAtual" onChange={(e) => setKmAtual(parseInt(e.target.value))} required />
                <input type="submit" value="Cadastrar veículo" />
            </form>
        </>
    );
}

export default CreateVeiculo;