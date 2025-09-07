import React from "react";
import type { FormData } from "./MultiPaso";

interface Step1Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
}



export const Paso1: React.FC<Step1Props> = ({ data, update }) => {
    return (
        <div>
          <label className="block mb-2">Nombre del proyecto</label>
          <input type="text"
            className="border p-2 w-full"
            value={data.nombre}
            onChange={(e) => update({ nombre: e.target.value })}
          />
          <label className="block mb-2">Tipo de energía</label>
          <select
            className="border p-2 w-full mb-4"
            value={data.energia}
            onChange={(e) => update({ energia: e.target.value })}
          >
            <option value="">Seleccione...</option>
            <option value="eolica">Eólica</option>
            <option value="solar">Solar</option>
            <option value="hidroelectrica">Hidroeléctrica</option>
          </select>
    
          <label className="block mb-2">Descripción del proyecto</label>
          <textarea
            className="border p-2 w-full"
            value={data.descripcion}
            onChange={(e) => update({ descripcion: e.target.value })}
          />
        </div>
      );
}
