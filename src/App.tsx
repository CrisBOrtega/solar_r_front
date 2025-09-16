
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import MultiPaso from './componentes/creacion_proyecto/MultiPaso'
import UserForm from './componentes/usuario/UsuarioCreate'
import LoginForm from './componentes/usuario/Login';
import ProjectsList from './componentes/Proyectos/ProjectList';
import InversionForm from './componentes/inversion/Inversion';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/usuarios/crear" element={<UserForm />} />
        <Route path="/proyectos/crear" element={<MultiPaso />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/proyectos/lista" element={<ProjectsList />} />
        <Route path="/proyectos/invertir" element={<InversionForm />} />
      </Routes>

    </Router>
  )
}

export default App
