import axios from 'axios';
import { useState } from "react";

const CreateCliente = () => {
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
            numeroDocumento,
            tipoDocumento,
            nome,
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
        }
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Cliente', cliente);
        window.location.reload()
    }
    return (
        <>
           <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Cliente</label>
                <input type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="numeroDoc">Número do documento</label>
                <input type="text" name="numeroDoc" id="numeroDoc" onChange={(e) => setNumeroDocumento(e.target.value)} required />
                <label htmlFor="tipoDoc">Tipo do documento</label>
                <input type="text" name="tipoDoc" id="tipoDoc" onChange={(e) => setTipoDocumento(e.target.value)} required />
                <label htmlFor="logradouro">Logradouro</label>
                <input type="text" name="logradouro" id="logradouro" onChange={(e) => setLogradouro(e.target.value)} required />
                <label htmlFor="numero">Número</label>
                <input type="text" name="numero" id="numero" onChange={(e) => setNumero(e.target.value)} required />
                <label htmlFor="bairro">Bairro</label>
                <input type="text" name="bairro" id="bairro" onChange={(e) => setBairro(e.target.value)} required />
                <label htmlFor="cidade">Cidade</label>
                <input type="text" name="cidade" id="cidade" onChange={(e) => setCidade(e.target.value)} required />
                <label htmlFor="uf">UF</label>
                <input type="text" name="uf" id="uf" onChange={(e) => setUf(e.target.value)} required />
                <input type="submit" value="Cadastrar cliente" />
              </form>
        </>
    );
}

export default CreateCliente;