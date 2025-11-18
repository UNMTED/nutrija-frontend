import { PencilSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type { Categoria } from "../../../models/Categoria";

// shadcn components
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
            setNome("");
            setDescricao("");
            setFoto("");
            setIsSubmitting(false);
        }
    }, [isOpen, categoria]);

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
            };

            onSave(payload);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-nutri-green-dark">
                        <PencilSimple
                            size={24}
                            weight="fill"
                        />
                        {isEditMode
                            ? `Editar Categoria: ${categoria?.nome}`
                            : "Cadastrar Categoria"}
                    </DialogTitle>

                    <DialogDescription>
                        {isEditMode
                            ? "Altere as informações da categoria selecionada."
                            : "Preencha os campos abaixo para cadastrar uma nova categoria."}
                    </DialogDescription>
                </DialogHeader>

                {!isSubmitting ? (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 mt-4"
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

                        <DialogFooter className="flex flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-nutri-green hover:bg-nutri-green-dark py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all"
                            >
                                {isEditMode
                                    ? "Salvar Alterações"
                                    : "Cadastrar Categoria"}
                            </button>

                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="flex-1 rounded-lg bg-gray-400 hover:bg-gray-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all"
                                >
                                    Cancelar
                                </button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="p-8 flex items-center justify-center">
                        <ClipLoader
                            color="#29a114"
                            size={36}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
