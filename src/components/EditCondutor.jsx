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

        if (!categoriaHabilitacao && categoriaHabilitacao !== data.categoriaHabilitacao) {
            alert('Preencha a categoria da habilitação');
        } else {
            try {
                await axios.put(`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`, condutor);
                window.location.reload()
            } catch (error) {
                alert("Erro ao editar condutor");
            }
        }

    }
    return (
        <>
            {isPending && <div>Carregando...</div>}
            {error && <div>{error}</div>}
            {data && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoria">Categoria da habilitação</label>
                    <select type="text" name="categoria" id="categoria" placeholder={data.categoriaHabilitacao} onChange={(e) => setCategoriaHabilitacao(e.target.value)} >
                        <option value={null}>Selecione uma categoria</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                    <label htmlFor="vencimentoHabilitacao">Vencimento da habilitação</label>
                    <input type="date" name="vencimentoHabilitacao" id="vencimentoHabilitacao" placeholder={data.vencimentoHabilitacao} onChange={(e) => setVencimentoHabilitacao(e.target.value)} />
                    <input type="submit" value="Salvar novos dados do condutor" />
                </form>
            )}
        </>
    );
}

export default EditCondutor;