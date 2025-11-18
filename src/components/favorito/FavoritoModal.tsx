import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Heart, ShoppingBag } from "@phosphor-icons/react";
import type { Produto } from "../../models/Produto";

interface FavoritosProdutoModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
    produtos: Produto[];
    onRemove: (produtoId: number) => void;
    onAddToCart: (produto: Produto) => void;
}

const FavoritosProdutoModal = ({
    open,
    onClose,
    produtos,
    onRemove,
    onAddToCart,
}: FavoritosProdutoModalProps) => {
    const estaVazio = produtos.length === 0;

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-[85vw] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="border-b border-neutral-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex-shrink-0 bg-gradient-to-br from-primary-50 via-lime-50/30 to-earth-100/20 shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 flex items-center gap-3">
                            Meus Favoritos
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm sm:text-base text-neutral-600 mt-2">
                        {produtos.length === 0
                            ? "Você não tem produtos favoritos ainda"
                            : `${produtos.length} ${
                                  produtos.length === 1 ? "produto" : "produtos"
                              } marcados como favorito`}
                    </p>
                </div>

                {/* Conteúdo */}
                <div className="overflow-y-auto flex-1 scrollbar-thin">
                    {estaVazio ? (
                        <div className="flex items-center justify-center h-full min-h-80">
                            <div className="text-center px-6 py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-100 to-pink-100 mb-6 shadow-lg">
                                    <Heart
                                        size={40}
                                        weight="fill"
                                        className="text-red-400 sm:size-48"
                                    />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 mb-3">
                                    Nenhum favorito ainda
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 mb-6 max-w-md">
                                    Explore nossa loja e marque seus produtos
                                    favoritos para acessá-los rapidamente aqui!
                                </p>
                                <button
                                    onClick={() => onClose(false)}
                                    className="px-6 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                                >
                                    Explorar Produtos
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 lg:p-10">
                            {produtos.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="group flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Imagem */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-lime-50/30 to-earth-100/20 aspect-[4/5]">
                                        <img
                                            src={produto.foto || ""}
                                            alt={produto.nome}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Badge de Categoria */}
                                        {produto.categoria && (
                                            <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                                {produto.categoria.nome}
                                            </div>
                                        )}

                                        {/* Botão Remover Favorito */}
                                        <button
                                            onClick={() => onRemove(produto.id)}
                                            className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-red-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                                            aria-label="Remover dos favoritos"
                                        >
                                            <Heart
                                                size={20}
                                                weight="fill"
                                                className="text-red-500"
                                            />
                                        </button>

                                        {/* Overlay no Hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>

                                    {/* Informações */}
                                    <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                                        {/* Nome */}
                                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-neutral-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                                            {produto.nome}
                                        </h4>

                                        {/* Descrição */}
                                        <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 mb-4 flex-1">
                                            {produto.descricao ||
                                                "Sem descrição"}
                                        </p>

                                        {/* Preço */}
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-sm text-neutral-400">
                                                R$
                                            </span>
                                            <span className="text-xl sm:text-2xl md:text-3xl font-black text-primary-600">
                                                {
                                                    Number(produto.preco)
                                                        .toFixed(2)
                                                        .split(".")[0]
                                                }
                                            </span>
                                            <span className="text-base sm:text-lg text-neutral-400">
                                                ,
                                                {
                                                    Number(produto.preco)
                                                        .toFixed(2)
                                                        .split(".")[1]
                                                }
                                            </span>
                                        </div>

                                        {/* Botão Adicionar ao Carrinho */}
                                        <button
                                            onClick={() => onAddToCart(produto)}
                                            disabled={produto.quantidade === 0}
                                            className={`
                                                w-full py-3 px-4 rounded-xl text-sm font-bold
                                                flex items-center justify-center gap-2
                                                transition-all duration-300
                                                ${
                                                    produto.quantidade > 0
                                                        ? "bg-primary-500 text-white hover:bg-primary-600 active:scale-95 shadow-md hover:shadow-lg"
                                                        : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            <ShoppingBag
                                                size={18}
                                                weight="bold"
                                            />
                                            <span className="truncate">
                                                {produto.quantidade > 0
                                                    ? "Adicionar ao Carrinho"
                                                    : "Fora de Estoque"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FavoritosProdutoModal;
