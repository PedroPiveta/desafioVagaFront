import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Desculpa</h2>
            <p>Essa página não foi encontrada</p>
            <Link to="/">Voltar para página principal...</Link>
        </div>
    );
}
 
export default NotFound;