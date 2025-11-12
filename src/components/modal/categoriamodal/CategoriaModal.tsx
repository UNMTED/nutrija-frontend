import { useState, useEffect } from "react";
import type { Categoria } from "../../../models/Categoria";

interface CategoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoria: Categoria | null;
  onSave: (categoria: Categoria) => void;
}

export default function CategoriaModal({
  isOpen,
  onClose,
  categoria,
  onSave,
}: CategoriaModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
      setDescricao(categoria.descricao);
      setFoto(categoria.foto);
    }
  }, [categoria]);

  if (!isOpen || !categoria) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...categoria, nome, descricao, foto });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-extrabold text-nutri-gray">
            Editar Categoria: {categoria.nome}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors text-3xl ml-4"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nome da Categoria
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              URL da Foto
            </label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutri-green focus:border-transparent"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {foto && (
              <img
                src={foto}
                alt="Preview"
                className="mt-3 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-nutri-green hover:bg-nutri-green-dark py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-400  hover:bg-gray-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}