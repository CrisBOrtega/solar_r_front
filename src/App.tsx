
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import './App.css'
import MultiPaso from './componentes/creacion_proyecto/MultiPaso'
import UserForm from './componentes/usuario/UsuarioCreate'
import LoginForm from './componentes/usuario/Login';
import ProjectsList from './componentes/Proyectos/ProjectList';
import InversionForm from './componentes/inversion/Inversion';
import { ProtectedRoutes } from './componentes/proteccion_rutas/ProtectedRoutes';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/usuarios/crear" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/proyectos/crear" element={<MultiPaso />} /> 

        <Route path="/proyectos/lista" element={<ProtectedRoutes roles={[1]}>
          <ProjectsList />
        </ProtectedRoutes>} />
        <Route path="/proyectos/invertir" element={<InversionForm />} />
      </Routes>

    </Router>
  )
}

export default App
