import {
    Heart,
    PencilSimple,
    ShoppingBag,
    Sparkle,
    Trash,
} from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";

interface CardProdutoProps {
    produto: Produto;
    add: () => void;
    remove: () => void;
    edit: () => void;
    detalhes: () => void;
}

export default function CardProduto({
    produto,
    add,
    remove,
    edit,
    detalhes,
}: CardProdutoProps) {
    const { usuario } = useContext(AuthContext);
    const [favorito, setFavorito] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const isAvailable = produto.quantidade > 0;

    return (
        <div
            className="w-full h-full bg-white rounded-2xl relative overflow-hidden shadow-lg border border-primary-100 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isHovered
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0) scale(1)",
                boxShadow: isHovered
                    ? "0 20px 40px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.1)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Badge de Estoque Baixo - REMOVIDO EXIBIÇÃO DA QUANTIDADE */}
            {produto.quantidade > 0 && produto.quantidade < 10 && usuario.role !== "admin" && (
                <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkle size={10} weight="fill" />
                    <span>Estoque baixo!</span>
                </div>
            )}

            <div className="absolute top-2 right-2 z-10 flex gap-1">
                {usuario.role === "admin" ? (
                    <>
                        <button
                            onClick={edit}
                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:bg-primary-50"
                            aria-label="Editar produto"
                        >
                            <PencilSimple
                                size={16}
                                weight="fill"
                                className="text-primary-600"
                            />
                        </button>
                        <button
                            onClick={remove}
                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:bg-red-50"
                            aria-label="Remover produto"
                        >
                            <Trash
                                size={16}
                                weight="bold"
                                className="text-red-600"
                            />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setFavorito(!favorito)}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        aria-label={
                            favorito
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"
                        }
                    >
                        <Heart
                            size={18}
                            weight={favorito ? "fill" : "regular"}
                            className={
                                favorito ? "text-red-500" : "text-neutral-400"
                            }
                        />
                    </button>
                )}
            </div>


            <div 
                onClick={detalhes}
                className="relative h-32 md:h-36 lg:h-40 bg-linear-to-br from-primary-50 via-primary-100/50 to-lime-50 overflow-hidden cursor-pointer"
            >
                <img
                    src={produto.foto}
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                    style={{
                        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isHovered ? "scale(1.15)" : "scale(1.05)",
                        filter: isHovered
                            ? "contrast(1.1) saturate(1.15)"
                            : "contrast(1.05) saturate(1.1)",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

                {!isAvailable && (
                    <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            Indisponível
                        </span>
                    </div>
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-3 md:p-4 space-y-3">
                <div>
                    <h4 className="font-semibold text-neutral-800 text-sm md:text-base leading-tight line-clamp-2 mb-1 transition-colors duration-300 group-hover:text-primary-600">
                        {produto.nome}
                    </h4>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-neutral-100">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-neutral-400 font-medium">
                            R$
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-primary-600">
                            {Number(produto.preco).toFixed(2).split(".")[0]}
                        </span>
                        <span className="text-sm text-neutral-400">
                            ,{Number(produto.preco).toFixed(2).split(".")[1]}
                        </span>
                    </div>

                    {usuario.role !== "admin" && (
                        <button
                            onClick={add}
                            disabled={!isAvailable}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            aria-label="Adicionar ao carrinho"
                        >
                            <ShoppingBag size={18} weight="bold" />
                        </button>
                    )}
                </div>
            </div>

            {isHovered && (
                <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    style={{
                        animation: "shimmer-slide 1.5s infinite",
                    }}
                />
            )}

            <style>{`
                @keyframes shimmer-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
