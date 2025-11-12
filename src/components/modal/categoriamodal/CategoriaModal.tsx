import { PencilSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (categoria) {
                setNome(categoria.nome ?? "");
                setDescricao(categoria.descricao ?? "");
                setFoto(categoria.foto ?? "");
            } else {
                setNome("");
                setDescricao("");
                setFoto("");
            }
        } else {
            // limpa ao fechar
            setNome("");
            setDescricao("");
            setFoto("");
            setIsSubmitting(false);
        }
    }, [isOpen, categoria]);

    if (!isOpen) return null;

    const isEditMode = !!categoria;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload: Categoria = {
                id: categoria?.id ?? 0,
                nome: nome.trim(),
                descricao: descricao.trim(),
                foto: foto.trim(),
            } as Categoria;

            onSave(payload);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100 rounded-2xl shadow-2xl border border-nutri-green-light"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-nutri-green-dark inline-flex items-center gap-2">
                        <PencilSimple
                            size={24}
                            weight="fill"
                        />
                        {isEditMode
                            ? `Editar Categoria: ${categoria?.nome}`
                            : "Cadastrar Categoria"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-nutri-green-dark hover:bg-gray-100"
                        aria-label="Fechar modal"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {!isSubmitting ? (
                    <form
                        onSubmit={handleSubmit}
                        className="p-8 space-y-6"
                    >
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
                                    className="mt-3 w-full h-32 object-contain rounded-lg"
                                />
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-nutri-green hover:bg-nutri-green-dark py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                            >
                                {isEditMode
                                    ? "Salvar Alterações"
                                    : "Cadastrar Categoria"}
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-lg bg-gray-400 hover:bg-gray-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 flex items-center justify-center">
                        <ClipLoader
                            color="#29a114"
                            size={36}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
