import useFetchGet from "../hooks/useFetchGet";

const Condutores = () => {
    const { data, error } = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Condutor')

    return (
        <>
            {
                data ? data.reverse().map((condutor, index) => (
                    <div key={index}>
                        <div>id: {condutor.id}</div>
                        <div>nome: {condutor.nome}</div>
                        <div>numero habilitacao: {condutor.numeroHabilitacao}</div>
                        <div>categoria habilitacao: {condutor.catergoriaHabilitacao}</div>
                        <div>vencimento habilitacao: {condutor.vencimentoHabilitacao}</div>
                    </div>
                )) : (
                    <div>Carregando...</div>
                )
            }
        </>
    );
}

export default Condutores;