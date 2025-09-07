import React, { useState } from 'react';

import { Paso1 } from "./Paso1";
import { Paso2 } from "./Paso2";
import { Paso3 } from "./Paso3";
import { Paso4 } from "./Paso4";


export interface FormData {
    nombre: string;
    energia: string;
    descripcion: string;
    pasos: string[];
    software: string[];
    hardware: string[];
    recursos: string[];
  }

  const MultiPaso: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
      nombre: "",
      energia: "",
      descripcion: "",
      pasos: [],
      software: [],
      hardware: [],
      recursos: ["", "", ""],
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);


    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
      };

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

        
            if (!response.ok) {
                throw new Error("Error en la API");
            }
  
            const data = await response.json();
            console.log("✅ Respuesta de la API:", data);
            alert("Formulario enviado con éxito 🎉");
    
    }


   
        return (
            <div className="p-6 max-w-xl mx-auto border rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Formulario multipaso</h2>
        
              {step === 1 && <Paso1 data={formData} update={updateFormData} />}
              {step === 2 && <Paso2 data={formData} update={updateFormData} />}
              {step === 3 && <Paso3 data={formData} update={updateFormData} />}
              {step === 4 && <Paso4 data={formData} update={updateFormData} />}
        
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={prevStep}
                  >
                    Atrás
                  </button>
                )}
                {step < 4 ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={nextStep}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleSubmit}
                  >
                    Enviar
                  </button>
                )}
              </div>
            </div>
          );
    
  }


  export default MultiPaso;