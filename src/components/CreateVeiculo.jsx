import axios from "axios";
import { useState } from "react";
import InputMask from "react-input-mask";

const CreateVeiculo = () => {

    const [placa, setPlaca] = useState('');
    const [marcaModelo, setMarcaModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState(0);
    const [kmAtual, setKmAtual] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [mask, setMask] = useState('aaa-9999');
    const ano = new Date().getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (anoFabricacao < 1900 || anoFabricacao > ano) {
            alert('Ano de fabricação inválido');
            return;
        }
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
                <InputMask mask={mask} placeholder='AAA-0000' type="text" name="placa" id="placa" onChange={(e) => setPlaca(e.target.value.toUpperCase())} required />
                <label htmlFor="marcaModelo">Marca/Modelo</label>
                <input type="text" placeholder="Ex. Ford" name="marcaModelo" id="marcaModelo" onChange={(e) => setMarcaModelo(e.target.value)} required />
                <label htmlFor="anoFabricacao">Ano de Fabricação</label>
                <input type="number" placeholder="Ex. 2022" name="anoFabricacao" id="anoFabricacao" onChange={(e) => setAnoFabricacao(parseInt(e.target.value))} required />
                <label htmlFor="kmAtual">Quilometragem Atual</label>
                <input type="number" name="kmAtual" id="kmAtual" onChange={(e) => setKmAtual(parseInt(e.target.value))} required />
                <input type="submit" value="Cadastrar veículo" />
            </form>
        </>
    );
}

export default CreateVeiculo;