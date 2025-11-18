<<<<<<< HEAD
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Package, ShoppingBag, X } from "@phosphor-icons/react";
=======
import { Check, Package, ShoppingBag, X } from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
import { type Produto } from "../../../models/Produto";

interface DetalhesProdutoModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
    produto: Produto;
    add: () => void;
}

<<<<<<< HEAD
const DetalhesProdutoModal = ({
    open,
    onClose,
    produto,
    add,
}: DetalhesProdutoModalProps) => {
=======
const DetalhesProdutoModal = ({ produto, add }: DetalhesProdutoModalProps) => {
    const { usuario } = useContext(AuthContext); // Adicionando AuthContext
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
    const disponivel = produto.quantidade > 0;

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-[85vw] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="border-b border-neutral-100 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 shrink-0">
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 pr-8 wrap-break-word">
                            {produto.nome}
                        </DialogTitle>
                    </DialogHeader>

                    {produto.categoria && (
                        <div className="mt-2 inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium">
                            <Package
                                size={12}
                                weight="bold"
                                className="sm:w-4 sm:h-4"
                            />
<<<<<<< HEAD
                            <span className="truncate">
                                {produto.categoria.nome}
                            </span>
=======
                            

                            {!disponivel && (
                                <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="text-center">
                                        <X size={48} weight="bold" className="text-white mx-auto mb-2" />
                                        <span className="text-white font-bold text-lg">Produto Indisponível</span>
                                    </div>
                                </div>
                            )}
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                        </div>
                    )}
                </div>

<<<<<<< HEAD
                {/* Conteúdo */}
                <div className="overflow-y-auto flex-1 scrollbar-thin pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-4 sm:p-5 md:p-6 lg:p-8">
                        {/* Imagem */}
                        <div className="relative">
                            <div className="sticky top-0 bg-linear-to-br from-primary-50 via-lime-50/50 to-earth-100/30 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border border-primary-100">
                                <img
                                    src={produto.foto || ""}
                                    alt={`Foto do produto ${produto.nome}`}
                                    className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-contain transition-transform duration-700 hover:scale-110"
                                />

                                {!disponivel && (
                                    <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
                                        <div className="text-center px-4">
                                            <X
                                                size={32}
                                                weight="bold"
                                                className="text-white mx-auto mb-2 sm:size-40 md:size-48"
                                            />
                                            <span className="text-white font-bold text-sm sm:text-base md:text-lg block">
                                                Produto Indisponível
                                            </span>
                                        </div>
                                    </div>
=======
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
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                                )}
                            </div>
                        </div>

<<<<<<< HEAD
                        {/* Informações */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Preço */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 pb-4 sm:pb-5 md:pb-6 border-b border-neutral-100">
                                <div className="space-y-1">
                                    <p className="text-xs sm:text-sm text-neutral-500 font-medium uppercase tracking-wide">
                                        Preço
                                    </p>
                                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                                        <span className="text-xs sm:text-sm md:text-base text-neutral-400">
                                            R$
                                        </span>
                                        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-600">
                                            {
                                                Number(produto.preco)
                                                    .toFixed(2)
                                                    .split(".")[0]
                                            }
                                        </span>
                                        <span className="text-base xs:text-lg sm:text-xl md:text-2xl text-neutral-400">
                                            ,
                                            {
                                                Number(produto.preco)
                                                    .toFixed(2)
                                                    .split(".")[1]
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 flex items-center gap-2">
                                    <div className="w-0.5 sm:w-1 h-4 sm:h-6 bg-primary-500 rounded-full shrink-0" />
                                    <span>Descrição</span>
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed whitespace-pre-wrap wrap-break-word">
                                    {produto.descricao ||
                                        "Nenhuma descrição disponível."}
                                </p>
                            </div>

                            {/* Categoria e Usuário */}
                            {(produto.categoria || produto.usuario) && (
                                <div className="pt-3 sm:pt-4 md:pt-6 border-t border-neutral-100 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                                    {produto.categoria && (
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                                                Categoria
                                            </p>
                                            <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-800 truncate">
                                                {produto.categoria.nome}
                                            </p>
                                        </div>
                                    )}

                                    {produto.usuario && (
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                                                Cadastrado por
                                            </p>
                                            <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-800 truncate">
                                                {produto.usuario.nome}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Botão De Ação */}
                            <div className="pt-4 sm:pt-5 md:pt-6 space-y-2 sm:space-y-3">
                                <button
                                    className={`
                                        w-full py-3 xs:py-3.5 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl md:rounded-2xl text-xs xs:text-sm sm:text-base md:text-lg font-bold
                                        flex items-center justify-center gap-2 sm:gap-3
                                        shadow-lg transition-all duration-300
                                        ${
                                            disponivel
                                                ? "bg-linear-to-br from-primary-500 to-primary-600 text-white hover:scale-105 active:scale-95"
                                                : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
=======
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
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                                        }
                                    `}
                                    onClick={add}
                                    disabled={!disponivel}
                                >
<<<<<<< HEAD
                                    <ShoppingBag
                                        size={18}
                                        weight="bold"
                                        className="sm:size-7"
                                    />
                                    <span className="truncate">
                                        {disponivel
                                            ? "Adicionar ao Carrinho"
                                            : "Indisponível"}
                                    </span>
                                </button>
                            </div>
                        </div>
=======
                                    <ShoppingBag size={22} weight="bold" />
                                    {disponivel ? "Adicionar ao Carrinho" : "Produto Indisponível"}
                                </button>

                            </div>
                        )}
>>>>>>> d70bd57a3878f53a5efd4d94904b674693dc8150
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DetalhesProdutoModal;
