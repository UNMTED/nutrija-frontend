import { PencilSimple, Trash } from "@phosphor-icons/react";
import { useContext } from "react";
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

    return (
        <>
            <div 
                onClick={buscar}
                className="relative bg-linear-to-br from-nutri-green-light to-nutri-green rounded-2xl p-1 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
                {/* Botões de Edição e Exclusão */}
                {usuario.role === "admin" && (
                    <div className="absolute top-1 right-1 flex gap-1 z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                edit();
                            }}
                            className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                        >
                            <PencilSimple
                                size={16}
                                weight="fill"
                                className="text-nutri-green-dark"
                            />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                remove();
                            }}
                            className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                        >
                            <Trash
                                size={16}
                                weight="bold"
                                className="text-red-600"
                            />
                        </button>
                    </div>
                )}

                {/* Container do Conteúdo */}
                <div className="flex items-center gap-2">
                    {/* Texto da Categoria */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-semibold text-green-950 truncate text-center">
                            {categoria.nome}
                        </p>
                    </div>

                    {/* Imagem da Categoria */}
                    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20">
                        <img
                            src={categoria.foto}
                            alt={categoria.nome}
                            className="w-full h-full object-contain drop-shadow-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}