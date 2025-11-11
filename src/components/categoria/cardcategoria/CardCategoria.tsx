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
            <div className="w-[120px] mx-2 md:w-[w-150] bg-white rounded-2xl relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md border border-white/20 group">
                <div className=" h-full flex flex-col gap-3 relative">
                    {usuario.role === "admin" && (
                        <PencilSimple
                            size={28}
                            weight="fill"
                            className="absolute top-0 right-0 text-nutri-green-dark z-20 p-1 cursor-pointer"
                            onClick={edit}
                        />
                    )}
                    {usuario.role === "admin" && (
                        <Trash
                            size={28}
                            weight="bold"
                            className="absolute text-red-600 z-20 p-1 cursor-pointer"
                            onClick={remove}
                        />
                    )}
                    <div className="w-full h-20 rounded-b-3xl bg-linear-to-br from-nutri-green-light to-nutri-green transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]">
                        <img
                            src={categoria.foto}
                            alt={categoria.nome}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-5">
                        <p className="text-xs font-bold text-center text-slate-900 transition-all duration-300 group-hover:text-nutri-green-dark">
                            {categoria.nome}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-center pb-4 shadow-2xl">
                        <button
                            onClick={buscar}
                            aria-label="add"
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white bg-nutri-green-dark transform scale-95 transition-all duration-300 group-hover:scale-100 group-hover:shadow-[0_0_0_6px_rgba(124,58,237,0.12)]"
                        >
                            <svg
                                className="w-4 h-4 mx-auto"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* active press */}
                <div className="absolute inset-0 -z-10 pointer-events-none"></div>
            </div>
        </>
    );
}
