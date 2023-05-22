import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle, Truck, Package, Person } from "phosphor-react";

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
                <div className="dashboard-item">
                    <UserCircle size={48} color="#252525" />
                    <li onClick={() => navigate('/clientes')}>Clientes</li>
                </div>
                <div className="dashboard-item">
                    <Person size={48} color="#252525" />
                    <li onClick={() => navigate('/condutores')}>Condutores</li>
                </div>
                <div className="dashboard-item">
                    <Truck size={48} color="#252525" />
                    <li onClick={() => navigate('/veiculos')}>Veiculos</li>
                </div>
                <div className="dashboard-item">
                    <Package size={48} color="#252525" />
                    <li onClick={() => navigate('/deslocamentos')}>Deslocamentos</li>
                </div>
            </ul>
        </aside>
     );
}
 
export default DashBoard;