import axios from 'axios';
import useFetchGet from '../hooks/useFetchGet';
import { useParams } from 'react-router-dom';
import { useState } from "react";

const EditCliente = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFetchGet(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`);

    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [nome, setNome] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const cliente = {
            id: data.id,
            nome,
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
        }

        try {
            await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`, cliente);
            window.location.reload()
        } catch (error) {
            alert("Erro ao editar cliente");
        }

    }
    return (
        <>
            {data ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome do Cliente</label>
                    <input type="text" name="nome" id="nome" placeholder={data.nome} onChange={(e) => setNome(e.target.value)} />
                    <label htmlFor="logradouro">Logradouro</label>
                    <input type="text" name="logradouro" id="logradouro" placeholder={data.logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                    <label htmlFor="numero">Número</label>
                    <input type="number" name="numero" id="numero" placeholder={data.numero} onChange={(e) => setNumero(e.target.value)} />
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" name="bairro" id="bairro" placeholder={data.bairro} onChange={(e) => setBairro(e.target.value)} />
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" name="cidade" id="cidade" placeholder={data.cidade} onChange={(e) => setCidade(e.target.value)} />
                    <label htmlFor="uf">UF</label>
                    <input type="text" name="uf" id="uf" placeholder={data.uf} onChange={(e) => setUf(e.target.value)} />
                    <input type="submit" value="Salvar novos dados do cliente" />
                </form>
            ) : (
                <div>Carregando...</div>
            )}
        </>
    );
}

export default EditCliente;