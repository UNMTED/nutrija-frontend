// EditarPerfilForm.tsx - Apenas o essencial
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface EditarPerfilFormProps {
  onCancel: () => void; 
}

export default function EditarPerfilForm({ onCancel }: EditarPerfilFormProps) {
  const { usuario } = useContext(AuthContext);
  
  // Apenas para mostrar/editar a foto atual
  const [foto, setFoto] = useState(usuario.foto || "");

  return (
    <form className="w-full">
      <div className="space-y-5">
        {/* Campo Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-nutri-green-light border-2 border-nutri-green-dark flex items-center justify-center overflow-hidden">
              {foto ? (
                <img src={foto} alt="Foto atual" className="w-full h-full object-cover rounded-full" />
              ) : (
                <svg className="w-10 h-10 text-nutri-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <input
              type="text"
              placeholder="URL da imagem (opcional)"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green-light focus:border-nutri-green-light outline-none text-sm"
            />
          </div>
        </div>

        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
          <input
            type="text"
            defaultValue={usuario.nome}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green-light focus:border-nutri-green-light outline-none"
            required
          />
        </div>

        {/* Campo Email  */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue=""
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green-light focus:border-nutri-green-light outline-none"
            required
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" className="flex-1 py-3 px-4 bg-nutri-green text-white font-medium rounded-lg hover:bg-nutri-green-dark">
            <span className="inline-flex items-center gap-2">Confirmar</span>
          </button>
        </div>
      </div>
    </form>
  );
}