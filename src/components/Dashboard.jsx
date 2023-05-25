import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle, Truck, Package, Person, Sun } from "phosphor-react";
import { useEffect, useState } from "react";

const DashBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("isLightMode");
        if (savedMode) {
            setIsLightMode(savedMode === "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isLightMode", isLightMode);
        // Aqui você pode adicionar lógica adicional para alternar temas, como adicionar ou remover classes do body ou atualizar estilos globais
        if (isLightMode) {
            document.body.classList.remove("dark-mode");
        } else {
            document.body.classList.add("dark-mode");
        }
    }, [isLightMode]);

    const toggleLightMode = () => {
        setIsLightMode(!isLightMode);
    }

    let color = '#6c68ff';

    function pathMatchRoute(route) {
        if (location.pathname === route) {
            return true;
        }
    }
    return (
        <aside className={isLightMode ? 'light-mode' : ''}>
            <button className="toggle" onClick={toggleLightMode}>
                <Sun size={24} color={color} />
            </button>
            <ul>
                <div className="dashboard-item" id={pathMatchRoute('/clientes') && "focus"} onClick={() => navigate('/clientes')}>
                    <UserCircle size={48} color={color} />
                    <li>Clientes</li>
                </div>
                <div className="dashboard-item" id={pathMatchRoute('/condutores') && "focus"} onClick={() => navigate('/condutores')}>
                    <Person size={48} color={color} />
                    <li>Condutores</li>
                </div>
                <div className="dashboard-item" id={pathMatchRoute('/veiculos') && "focus"} onClick={() => navigate('/veiculos')}>
                    <Truck size={48} color={color} />
                    <li>Veiculos</li>
                </div>
                <div className="dashboard-item" id={pathMatchRoute('/deslocamentos') && "focus"} onClick={() => navigate('/deslocamentos')}>
                    <Package size={48} color={color} />
                    <li>Deslocamentos</li>
                </div>
            </ul>
        </aside>
    );
}

export default DashBoard;