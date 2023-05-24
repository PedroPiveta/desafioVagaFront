import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetchGet from "../hooks/useFetchGet";

const Editveiculo = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFetchGet(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`);
    const [marcaModelo, setMarcaModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState(data?.anoFabricacao);
    const [kmAtual, setKmAtual] = useState();
    const ano = new Date().getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (anoFabricacao < 1900 || anoFabricacao > ano) {
            alert('Ano de fabricação inválido');
            return;
        }
        const veiculo = {
            id,
            marcaModelo,
            anoFabricacao,
            kmAtual,
        }
        try {
            await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`, veiculo);
            window.location.reload()
        } catch (error) {
            alert('Não foi possível editar o veiculo!');
        }
    }

    return (
        <>
            {isPending && <div>Carregando...</div>}
            {error && <div>{error}</div>}
            {data ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="marca">Marca/Modelo</label>
                    <input type="text" placeholder={data?.marcaModelo} name="marca" id="marca" onChange={(e) => setMarcaModelo(e.target.value)} />
                    <label htmlFor="ano">Ano de Fabricação</label>
                    <input type="number" placeholder={data?.anoFabricacao} name="ano" id="ano" onChange={(e) => setAnoFabricacao(parseInt(e.target.value))} />
                    <label htmlFor="km">Quilometragem Atual</label>
                    <input type="number" name="km" id="km" placeholder={data?.kmAtual} onChange={(e) => setKmAtual(parseInt(e.target.value))} />
                    <input type="submit" value="Cadastrar veículo" />
                </form>
            ) : (<div>Carregando...</div>)}

        </>
    );
}

export default Editveiculo;