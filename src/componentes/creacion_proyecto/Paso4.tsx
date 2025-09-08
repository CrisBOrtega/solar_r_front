import React from "react";
import type { FormData } from "./MultiPaso";

interface Step4Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }

export const Paso4: React.FC<Step4Props> = ({ data, update }) => {

  const handleChange = (
    index: number,
    field: "nombre" | "valor" | "cantidad",
    value: string | number
  ) => {
    const newRecursos = [...data.recursos];
    newRecursos[index] = {
      ...newRecursos[index],
      [field]: field === "valor" || field === "cantidad" ? Number(value) : value,
    };
    update({ recursos: newRecursos });
  };

      


  return (
    <div>
      <h3 className="mb-2 font-bold">Recursos del proyecto</h3>
      {data.recursos.map((recurso, i) => (
        <div key={i} className="border p-3 rounded mb-3">
          <label className="block mb-1">Nombre recurso {i + 1}</label>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            value={recurso.nombre}
            onChange={(e) => handleChange(i, "nombre", e.target.value)}
          />

          <label className="block mb-1">Valor</label>
          <input
            type="number"
            className="border p-2 w-full mb-2"
            value={recurso.valor}
            onChange={(e) => handleChange(i, "valor", e.target.value)}
          />

          <label className="block mb-1">Cantidad</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={recurso.cantidad}
            onChange={(e) => handleChange(i, "cantidad", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
  }
  