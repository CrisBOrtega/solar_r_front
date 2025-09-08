import React from "react";
import Select from "react-select";
import type { FormData } from "./MultiPaso";


interface Step3Props {
    data: FormData;
    update: (newData: Partial<FormData>) => void;
  }

  const softwareOptions = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
  ];

  const hardwareOptions = [
    { value: "raspberry", label: "Raspberry Pi" },
    { value: "arduino", label: "Arduino" },
    { value: "iot", label: "IoT Device" },
  ];
  


export const Paso3: React.FC<Step3Props> = ({ data, update }) => {
    return (
      <div>
      <label className="block mb-2">Tecnología de Software</label>
      <Select
        isMulti
        options={softwareOptions}
        value={softwareOptions.filter((opt) => data.software.includes(opt.value))}
        onChange={(selected) =>
          update({ software: selected.map((opt) => opt.value) })
        }
      />

      <label className="block mt-4 mb-2">Tecnología de Hardware</label>
      <Select
        isMulti
        options={hardwareOptions}
        value={hardwareOptions.filter((opt) => data.hardware.includes(opt.value))}
        onChange={(selected) =>
          update({ hardware: selected.map((opt) => opt.value) })
        }
      />
    </div>
      );
    }
    
  