import useFetchGet from "../hooks/useFetchGet";

const Deslocamentos = () => {
    const {data, error} = useFetchGet('https://api-deslocamento.herokuapp.com/api/v1/Deslocamento');

    return (  
        <>
            
            {
                data ? data.reverse().map((deslocamento, index) => (
                    <div key={index}>
                        <div>id: {deslocamento.id}</div>
                    </div>
                )) : (
                    <div>Carregando...</div>
                )
            }
        </>
    );
}
 
export default Deslocamentos;