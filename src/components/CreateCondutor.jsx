import axios from 'axios';
import { useState } from "react";
import InputMask from 'react-input-mask';

const CreateCondutor = () => {
    const [nome, setNome] = useState('');
    const [numeroHabilitacao, setNumeroDocumento] = useState('');
    const [categoriaHabilitacao, setCategoriaHabilitacao] = useState('');
    const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState('');
    const [dataMask, setDataMask] = useState('99999999999');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condutor = {
            nome,
            numeroHabilitacao,
            categoriaHabilitacao,
            vencimentoHabilitacao,
        }

        if (!categoriaHabilitacao) {
            alert('Preencha a categoria da habilitação');
        } else {
            try {
                await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Condutor', condutor);
                window.location.reload()
            } catch (error) {
                alert("Erro ao criar condutor");
            }
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Condutor</label>
                <input type="text" placeholder='Ex. João' name="nome" id="nome" onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="categoria">Categoria da habilitação</label>
                <select type="text" name="categoria" id="categoria" placeholder={categoriaHabilitacao} onChange={(e) => setCategoriaHabilitacao(e.target.value)} >
                    <option value={null}>Selecione uma categoria</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <label htmlFor="numeroDoc">Número da habilitação</label>
                <InputMask mask={dataMask} placeholder={dataMask} type="text" name="numeroDoc" id="numeroDoc" onChange={(e) => setNumeroDocumento(e.target.value)} required />
                <label htmlFor="vencimentoHabilitacao">Vencimento da habilitação</label>
                <input type="date" name="vencimentoHabilitacao" id="vencimentoHabilitacao" onChange={(e) => setVencimentoHabilitacao(e.target.value)} required />
                <input type="submit" value="Cadastrar condutor" />
            </form>
        </>
    );
}

export default CreateCondutor;