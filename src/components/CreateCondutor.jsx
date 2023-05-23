import axios from 'axios';
import { useState } from "react";

const CreateCondutor = () => {
    const [nome, setNome] = useState('');
    const [numeroHabilitacao, setNumeroDocumento] = useState('');
    const [categoriaHabilitacao, setTipoDocumento] = useState('');
    const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condutor = {
            nome,
            numeroHabilitacao,
            categoriaHabilitacao,
            vencimentoHabilitacao,
        }
        await axios.post('https://api-deslocamento.herokuapp.com/api/v1/Condutor', condutor);
        window.location.reload()
    }
    return (
        <>
           <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do Condutor</label>
                <input type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} required />
                <label htmlFor="numeroDoc">Número da habilitação</label>
                <input type="text" name="numeroDoc" id="numeroDoc" onChange={(e) => setNumeroDocumento(e.target.value)} required />
                <label htmlFor="tipoDoc">Categoria da habilitação</label>
                <input type="text" name="tipoDoc" id="tipoDoc" onChange={(e) => setTipoDocumento(e.target.value)} required />
                <label htmlFor="vencimentoHabilitacao">Vencimento da habilitação</label>
                <input type="date" name="vencimentoHabilitacao" id="vencimentoHabilitacao" onChange={(e) => setVencimentoHabilitacao(e.target.value)} required />
                <input type="submit" value="Cadastrar condutor" />
              </form>
        </>
    );
}

export default CreateCondutor;