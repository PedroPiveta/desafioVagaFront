import axios from 'axios';
import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";

const CreateCliente = () => {
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [nome, setNome] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [dataMask, setDataMask] = useState('');

    useEffect(() => {
        if (tipoDocumento === 'CPF') {
            setDataMask('999.999.999-99')
        } else if (tipoDocumento === 'CNPJ') {
            setDataMask('99.999.999/9999-99')
        } else if (tipoDocumento === 'RG') {
            setDataMask('99.999.999-9')
        } 
    }), [tipoDocumento];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tipoDocumento) {
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
            console.log(cliente)
        } else {
            alert('Selecione um tipo de documento');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Cliente</label>
                <input type="text" placeholder='Ex. João' name="nome" id="nome" onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="tipoDoc">Tipo do documento</label>
                <select name="tipoDoc" id="tipoDoc" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                    <option value={null}>Selecione um tipo de documento</option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="RG">RG</option>
                </select>
                <label htmlFor="numeroDoc">Número do documento</label>
                <InputMask inputMode='numeric' mask={dataMask} defaultValue={numeroDocumento} placeholder={dataMask} onChange={(e) => setNumeroDocumento(e.target.value)} required />
                <label htmlFor="logradouro">Logradouro</label>
                <input type="text" placeholder='Ex. Rua México' name="logradouro" id="logradouro" onChange={(e) => setLogradouro(e.target.value)} required />
                <label htmlFor="numero">Número</label>
                <input type="number" placeholder='Ex. 1111' name="numero" id="numero" onChange={(e) => setNumero(e.target.value)} required />
                <label htmlFor="bairro">Bairro</label>
                <input type="text" placeholder='Ex. Jardim Gisela' name="bairro" id="bairro" onChange={(e) => setBairro(e.target.value)} required />
                <label htmlFor="cidade">Cidade</label>
                <input type="text" placeholder='Ex. Toledo' name="cidade" id="cidade" onChange={(e) => setCidade(e.target.value)} required />
                <label htmlFor="uf">UF</label>
                <input type="text" placeholder='Ex. PR' name="uf" id="uf" onChange={(e) => setUf(e.target.value)} required />
                <input type="submit" value="Cadastrar cliente" />
            </form>
        </>
    );
}

export default CreateCliente;