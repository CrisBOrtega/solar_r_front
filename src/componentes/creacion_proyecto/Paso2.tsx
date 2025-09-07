import React from "react";
import type { FormData } from "./MultiPaso";

interface Step2Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }
  

export const Paso2: React.FC<Step2Props>= ({ data, update }) => {

    const handleChange = (index: number, value: string) => {
        const newPasos = [...data.pasos];
        newPasos[index] = value;
        update({ pasos: newPasos });
      };



      return (
        <div>
          <h3 className="mb-2 font-bold">Pasos del proyecto</h3>
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="text"
              className="border p-2 w-full mb-2"
              placeholder={`Paso ${i + 1}`}
              value={data.pasos[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>
      );
  }


  