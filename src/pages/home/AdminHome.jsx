import { useNavigate } from 'react-router-dom';
import './adminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <section className="admin-home">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <button className="btn-volver" onClick={() => navigate('/')}>
          Ver Sitio Público
        </button>
      </header>

      <section className="admin-panel">
        <h2>Gestión</h2>
        <div className="admin-cards">
          <div className="admin-card" onClick={() => navigate('/admin/productos')}>Productos</div>
          <div className="admin-card" onClick={() => navigate('/admin/clientes')}>Clientes</div>
          <div className="admin-card" onClick={() => navigate('/admin/pedidos')}>Pedidos</div>
          <div className="admin-card" onClick={() => navigate('/admin/usuarios')}>Administradores</div>
        </div>
      </section>
    </section>
  );
};

export default AdminHome;
