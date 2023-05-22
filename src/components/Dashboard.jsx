import { useLocation, useNavigate } from "react-router-dom";

const DashBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route){
        if(location.pathname === route){
            return true;
        }
    }
    return ( 
        <aside>
            <ul>
                <li onClick={() => navigate('/clientes')}>Clientes</li>
                <li onClick={() => navigate('/condutores')}>Condutores</li>
                <li onClick={() => navigate('/veiculos')}>Veiculos</li>
                <li onClick={() => navigate('/deslocamentos')}>Deslocamentos</li>
            </ul>
        </aside>
     );
}
 
export default DashBoard;