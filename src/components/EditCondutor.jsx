import axios from 'axios';
import useFetchGet from '../hooks/useFetchGet';
import { useParams } from 'react-router-dom';
import { useState } from "react";

const EditCondutor = () => {
    const { id } = useParams();
    const { data, error, isPending } = useFetchGet(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`);

    const [categoriaHabilitacao, setCategoriaHabilitacao] = useState('');
    const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condutor = {
            id: id,
            categoriaHabilitacao,
            vencimentoHabilitacao,
        }

        try {
            await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`, condutor);
            window.location.reload()
        } catch (error) {
            alert("Erro ao editar condutor");
        }
    }
    return (
        <>
            {data ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoria">Categoria da habilitação</label>
                    <input type="text" name="categoria" id="categoria" placeholder={data.categoriaHabilitacao} onChange={(e) => setCategoriaHabilitacao(e.target.value)} />
                    <label htmlFor="vencimentoHabilitacao">Vencimento da habilitação</label>
                    <input type="date" name="vencimentoHabilitacao" id="vencimentoHabilitacao" placeholder={data.vencimentoHabilitacao} onChange={(e) => setVencimentoHabilitacao(e.target.value)} />
                    <input type="submit" value="Salvar novos dados do condutor" />
                </form>
            ) : (
                <div>Carregando...</div>
            )}
        </>
    );
}

export default EditCondutor;