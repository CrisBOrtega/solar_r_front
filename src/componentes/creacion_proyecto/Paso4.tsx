import React from "react";
import type { FormData } from "./MultiPaso";

interface Step4Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }

export const Paso4: React.FC<Step4Props> = ({ data, update }) => {

    const handleChange = (index: number, value: string) => {
        const newRecursos = [...data.recursos];
        newRecursos[index] = value;
        update({ recursos: newRecursos });
      };

      


      return (
        <div>
          <h3 className="mb-2 font-bold">Recursos del proyecto</h3>
          {data.recursos.map((recurso, i) => (
            <input
              key={i}
              type="text"
              className="border p-2 w-full mb-2"
              placeholder={`Recurso ${i + 1}`}
              value={recurso}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>
      );
  }
  