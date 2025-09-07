import React from "react";
import type { FormData } from "./MultiPaso";


interface Step3Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }



export const Paso3: React.FC<Step3Props> = ({ data, update }) => {
    return (
        <div>
          <label className="block mb-2">Tecnología de Software</label>
          <select
            className="border p-2 w-full mb-4"
            value={data.software}
            onChange={(e) => update({ software: e.target.value })}
          >
            <option value="">Seleccione...</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
          </select>
    
          <label className="block mb-2">Tecnología de Hardware</label>
          <select
            className="border p-2 w-full"
            value={data.hardware}
            onChange={(e) => update({ hardware: e.target.value })}
          >
            <option value="">Seleccione...</option>
            <option value="raspberry">Raspberry Pi</option>
            <option value="arduino">Arduino</option>
            <option value="iot">IoT Device</option>
          </select>
        </div>
      );
    }
    
  