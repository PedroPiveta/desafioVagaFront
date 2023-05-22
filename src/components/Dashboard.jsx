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
                <div className="dashboard-item" onClick={() => navigate('/clientes')}>
                    <UserCircle size={48} color="#252525" />
                    <li>Clientes</li>
                </div>
                <div className="dashboard-item" onClick={() => navigate('/condutores')}>
                    <Person size={48} color="#252525" />
                    <li>Condutores</li>
                </div>
                <div className="dashboard-item" onClick={() => navigate('/veiculos')}>
                    <Truck size={48} color="#252525" />
                    <li>Veiculos</li>
                </div>
                <div className="dashboard-item" onClick={() => navigate('/deslocamentos')}>
                    <Package size={48} color="#252525" />
                    <li>Deslocamentos</li>
                </div>
            </ul>
        </aside>
     );
}
 
export default DashBoard;