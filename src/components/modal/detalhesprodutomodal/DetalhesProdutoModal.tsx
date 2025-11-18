import { Check, Package, ShoppingBag, X } from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { type Produto } from "../../../models/Produto";

interface DetalhesProdutoModalProps {
    produto: Produto;
    add: () => void;
}

const DetalhesProdutoModal = ({ produto, add }: DetalhesProdutoModalProps) => {
    const { usuario } = useContext(AuthContext); // Adicionando AuthContext
    const disponivel = produto.quantidade > 0;

    return (
        <div
            className="rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100 flex flex-col bg-white"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header Fixo */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-neutral-100 px-6 py-5">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 leading-tight pr-8 line-clamp-2">
                    {produto.nome}
                </h2>
                
                {/* Badge de Categoria */}
                {produto.categoria && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        <Package size={14} weight="bold" />
                        {produto.categoria.nome}
                    </div>
                )}
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 p-6 md:p-8">
                    
                    {/* Imagem do Produto */}
                    <div className="relative">
                        <div className="sticky top-6 bg-gradient-to-br from-primary-50 via-lime-50/50 to-earth-100/30 rounded-2xl overflow-hidden shadow-lg border border-primary-100">
                            <img
                                src={produto.foto || ""}
                                alt={`Foto do produto ${produto.nome}`}
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 hover:scale-110"
                                style={{
                                    filter: 'contrast(1.05) saturate(1.1)'
                                }}
                            />
                            

                            {!disponivel && (
                                <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="text-center">
                                        <X size={48} weight="bold" className="text-white mx-auto mb-2" />
                                        <span className="text-white font-bold text-lg">Produto Indisponível</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informações do Produto */}
                    <div className="space-y-6">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6 border-b border-neutral-100">
                            <div className="space-y-1">
                                <p className="text-sm text-neutral-500 font-medium">Preço</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-base text-neutral-400">R$</span>
                                    <span className="text-4xl sm:text-5xl font-black text-primary-600">
                                        {Number(produto.preco).toFixed(2).split('.')[0]}
                                    </span>
                                    <span className="text-xl text-neutral-400">
                                        ,{Number(produto.preco).toFixed(2).split('.')[1]}
                                    </span>
                                </div>
                            </div>

                            <div 
                                className={`
                                    inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg
                                    ${disponivel 
                                        ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white' 
                                        : 'bg-neutral-200 text-neutral-700'
                                    }
                                `}
                            >
                                {disponivel ? (
                                    <>
                                        <Check size={18} weight="bold" />
                                        <span>Disponível</span>
                                    </>
                                ) : (
                                    <>
                                        <X size={18} weight="bold" />
                                        <span>Indisponível</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary-500 rounded-full" />
                                Descrição
                            </h3>
                            <p className="text-base text-neutral-600 leading-relaxed whitespace-pre-wrap">
                                {produto.descricao || "Nenhuma descrição disponível para este produto."}
                            </p>
                        </div>

                        {(produto.categoria || produto.usuario) && (
                            <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4">
                                {produto.categoria && (
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Categoria</p>
                                        <p className="text-sm font-semibold text-neutral-800">{produto.categoria.nome}</p>
                                    </div>
                                )}
                                
                                {produto.usuario && (
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Cadastrado por</p>
                                        <p className="text-sm font-semibold text-neutral-800">{produto.usuario.nome}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {usuario.role !== "admin" && (
                            <div className="pt-6">
                                <button
                                    className={`
                                        w-full py-4 px-6 rounded-xl text-base font-bold
                                        flex items-center justify-center gap-3
                                        shadow-lg transition-all duration-300
                                        ${disponivel
                                            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:scale-105 active:scale-95'
                                            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                        }
                                    `}
                                    onClick={add}
                                    disabled={!disponivel}
                                >
                                    <ShoppingBag size={22} weight="bold" />
                                    {disponivel ? "Adicionar ao Carrinho" : "Produto Indisponível"}
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalhesProdutoModal;