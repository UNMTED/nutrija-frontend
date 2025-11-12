import { PencilSimple } from "@phosphor-icons/react";
import React, { useCallback, useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type { Produto } from "../../../models/Produto";

interface ProdutoEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    produto: Produto | null;
    onUpdate: () => void;
}

export default function ProdutoEditModal({
    isOpen,
    onClose,
    produto,
    onUpdate,
}: ProdutoEditModalProps) {

    const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(produto);
    const [isLoading, setIsLoading] = useState(false);
    const { usuario, handleLogout } = useContext(AuthContext);

    React.useEffect(() => {
        if (isOpen && produto) {
            setProdutoEmEdicao(produto);
        } else if (!isOpen) {
             setProdutoEmEdicao(null);
        }
    }, [isOpen, produto]);

    if (!isOpen) return null;

    if (!produtoEmEdicao) return (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
             <ClipLoader color="#29a114" size={50} />
         </div>
    );
    

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProdutoEmEdicao((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };
    
    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = parseFloat(value.replace(',', '.')); 
        setProdutoEmEdicao((prev) =>
            prev ? { ...prev, [name]: isNaN(numberValue) ? value : numberValue } : null
        );
    };

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!produtoEmEdicao) return;
            setIsLoading(true);

            try {
                const dadosParaAtualizar = {
                    ...produtoEmEdicao,
                    categoria: produtoEmEdicao.categoria, 
                    usuario: produtoEmEdicao.usuario, 
                };
                
                await atualizar(`/produtos`, dadosParaAtualizar, setProdutoEmEdicao, {
                    headers: { Authorization: usuario.token },
                });

                ToastAlerta("Produto atualizado com sucesso!", "sucesso");
                onUpdate(); 
                onClose();
            } catch (error: any) {
                ToastAlerta("Erro ao atualizar o produto!", "erro");
                if (error.toString().includes("401")) handleLogout();
            } finally {
                setIsLoading(false);
            }
        },
        [produtoEmEdicao, usuario.token, handleLogout, onUpdate, onClose]
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100 border border-nutri-green/30"
                onClick={(e) => e.stopPropagation()}
            >
        
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-nutri-green-dark inline-flex items-center gap-2">
                        <PencilSimple size={24} weight="fill" />
                        Editar Produto: {produtoEmEdicao.nome}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100"
                        aria-label="Fechar modal"
                    >
                        &times;
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label
                            htmlFor="nome"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={produtoEmEdicao.nome}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="foto"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Foto (URL)
                        </label>
                        <input
                            type="url"
                            id="foto"
                            name="foto"
                            value={produtoEmEdicao.foto || ""}
                            onChange={handleChange}
                            placeholder="URL da imagem"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                        />
                        {produtoEmEdicao.foto && (
                            <img
                                src={produtoEmEdicao.foto}
                                alt="Pré-visualização"
                                className="mt-2 w-full max-h-32 object-contain rounded-lg border border-gray-200"
                            />
                        )}
                    </div>
                    
                    <div>
                        <label
                            htmlFor="preco"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Preço (R$)
                        </label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={produtoEmEdicao.preco}
                            onChange={handleNumberChange}
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="quantidade"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Quantidade em Estoque
                        </label>
                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={produtoEmEdicao.quantidade}
                            onChange={handleNumberChange}
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="descricao"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows={4}
                            value={produtoEmEdicao.descricao}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none resize-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-nutri-green-dark text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader color="#ffffff" size={18} />
                                    Salvando...
                                </div>
                            ) : (
                                "Salvar Alterações"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}