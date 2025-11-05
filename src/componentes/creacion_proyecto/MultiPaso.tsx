import React, { useState } from 'react';
import { Paso1 } from "./Paso1";
import { Paso2 } from "./Paso2";
import { Paso3 } from "./Paso3";
import { Paso4 } from "./Paso4";
import ProgressBar from "./ProgressBar";
import "./MultiPaso.css";
import { useNavigate } from "react-router-dom";
import NavBarEmp from "../navegacion/NavBarEmp";

export interface FormData {
  nombre: string;
  energia: string;
  descripcion: string;
  pasos: string[];
  software: string[];
  hardware: string[];
  recursos: {
    nombre: string;
    valor: number;
    cantidad: number;
  }[];
  usuario_id: number;
}

const MultiPaso: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    energia: "",
    descripcion: "",
    pasos: [],
    software: [],
    hardware: [],
    recursos: [
      { nombre: "", valor: 0, cantidad: 0 },
      { nombre: "", valor: 0, cantidad: 0 },
      { nombre: "", valor: 0, cantidad: 0 },
    ],
    usuario_id: +localStorage.getItem("user_id")!
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const validateStep = () => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
      if (!formData.energia) newErrors.energia = "Seleccione un tipo de energía";
      if (!formData.descripcion) newErrors.descripcion = "Ingrese una descripción";
    }

    if (step === 4) {
      formData.recursos.forEach((r, i) => {
        if (!r.nombre) newErrors[`rNombre${i}`] = "Requerido";
        if (!r.valor) newErrors[`rValor${i}`] = "Requerido";
        if (!r.cantidad) newErrors[`rCantidad${i}`] = "Requerido";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    
            console.log("Datos finales:", formData);
            // Guardar los datos en la base de datos
            const response = await fetch('http://localhost:3000/proyecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log("🌐 detas que llegan:", response);
        
            if (!response.ok) {
                throw new Error("Error en la API");
            }
  
            const data = await response.json();
            console.log("✅ Respuesta de la API:", data);
            alert("Proyecto creado con éxito 🎉");
            navigate('/emprendedor/lista');

    

  };

  return (
     <>
    {/* ✅ Barra de navegación */}
    <NavBarEmp />

    {/* ✅ Contenido ajustado hacia abajo */}
    <div className="mp-container" style={{ marginTop: "70px" }}>
      <div className="mp-box">
        
        <ProgressBar step={step} total={totalSteps} />

        <h2 className="mp-title">Crear Nuevo Proyecto</h2>
        <p className="mp-step">Paso {step} de {totalSteps}</p>

        <div key={step} className="step-transition">
          {step === 1 && <Paso1 data={formData} update={updateFormData} errors={errors} />}
          {step === 2 && <Paso2 data={formData} update={updateFormData} errors={errors} />}
          {step === 3 && <Paso3 data={formData} update={updateFormData} errors={errors} />}
          {step === 4 && <Paso4 data={formData} update={updateFormData} errors={errors} />}
        </div>

        <div className="mp-buttons">
          {step > 1 && (
            <button className="btn-secondary" onClick={prevStep}>
              ⬅ Atrás
            </button>
          )}

          {step < totalSteps ? (
            <button className="btn-primary" onClick={nextStep}>
              Siguiente ➜
            </button>
          ) : (
            <button className="btn-success" onClick={handleSubmit}>
              ✅ Enviar Proyecto
            </button>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default MultiPaso;