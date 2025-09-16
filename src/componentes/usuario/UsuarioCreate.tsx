
import React, { useState } from 'react';


interface FormData {
  username: string;
  password: string;
  tipo_id: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  tipo_id?: string;
}

interface UserType {
  value: number;
  label: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    tipo_id: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const userTypes: UserType[] = [
    { value: 1, label: 'EMPRENDEDOR' },
    { value: 2, label: 'EMPRENDEDOR PREMIUM' },
    { value: 3, label: 'INVERSIONISTA' },
    { value: 4, label: 'INVERSIONISTA PREMIUM' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.tipo_id) {
      newErrors.tipo_id = 'Debe seleccionar un tipo de usuario';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          tipo_id: parseInt(formData.tipo_id)
        }),
      });

      if (response.ok) {
        alert('Usuario creado con éxito!');
        // Limpiar formulario después del éxito
        setFormData({
          username: '',
          password: '',
          tipo_id: ''
        });
        setErrors({});
      } else {
        const errorData: any = await response.json();
        alert(`Error al crear usuario: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error: unknown) {
      console.error('Error al crear usuario:', error);
      alert('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Usuario</h1>
          <p className="text-gray-600">Completa los datos para registrar un nuevo usuario</p>
        </div>

        <div className="space-y-6">
          {/* Campo Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el nombre de usuario"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Campo Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa la contraseña"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Campo Tipo de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Usuario
            </label>
            <div className="space-y-3">
              {userTypes.map(type => (
                <div key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`tipo-${type.value}`}
                    name="tipo_id"
                    value={type.value}
                    checked={formData.tipo_id === type.value.toString()}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`tipo-${type.value}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.tipo_id && (
              <p className="mt-2 text-sm text-red-600">{errors.tipo_id}</p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Creando Usuario...
              </div>
            ) : (
              'Crear Usuario'
            )}
          </button>
        </div>

        
      </div>
    </div>
  );
}