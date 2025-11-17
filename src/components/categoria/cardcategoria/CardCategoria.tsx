import { ArrowRight, PencilSimple, Trash } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Categoria } from "../../../models/Categoria";

interface CardCategoriaProps {
    categoria: Categoria;
    buscar: () => void;
    remove: () => void;
    edit: () => void;
}

export default function CardCategoria({
    categoria,
    buscar,
    edit,
    remove,
}: CardCategoriaProps) {
    const { usuario } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="h-full w-full bg-white rounded-xl relative overflow-hidden shadow-md border border-primary-100/50 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={buscar}
            style={{
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
                boxShadow: isHovered 
                    ? '0 12px 24px -8px rgba(34, 197, 94, 0.2)'
                    : '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
        >
            {/* Ações do Admin */}
            {usuario.role === "admin" && (
                <div className="absolute top-1 right-1 z-20 flex gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            edit();
                        }}
                        className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform hover:bg-primary-50"
                        aria-label="Editar categoria"
                    >
                        <PencilSimple size={14} weight="fill" className="text-primary-600" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            remove();
                        }}
                        className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform hover:bg-red-50"
                        aria-label="Remover categoria"
                    >
                        <Trash size={14} weight="bold" className="text-red-600" />
                    </button>
                </div>
            )}

            {/* Imagem da Categoria */}
            <div className="w-full h-16 md:h-20 bg-gradient-to-br from-primary-50 to-lime-50 flex items-center justify-center overflow-hidden rounded-b-2xl">
                <img
                    src={categoria.foto}
                    alt={categoria.nome}
                    className="w-full h-full object-contain p-2"
                    style={{
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                    }}
                />
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col items-center gap-2 px-3 py-3">
                <p className="text-xs md:text-sm font-bold text-center text-neutral-800 transition-all duration-300 group-hover:text-primary-600 line-clamp-2">
                    {categoria.nome}
                </p>

                {/* Botão de Ação */}
                <div 
                    className="mt-auto flex items-center justify-center"
                    style={{
                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-primary-500 to-primary-600 shadow-md shadow-primary-200">
                        <ArrowRight size={14} weight="bold" />
                    </div>
                </div>
            </div>

            {/* Efeito de Brilho no Hover */}
            {isHovered && (
                <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    style={{
                        animation: 'shimmer-slide 1.2s infinite',
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