import type { Produto } from "../../../models/Produto";

interface CardProdutoProps {
    produto: Produto;
    add: () => void;
}
export default function CardProduto({ produto, add }: CardProdutoProps) {
    return (
        <>
            <div className="w-[150px] md:w-[170px] lg:w-[190px] h-full bg-white rounded-xl relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl border border-white/20 group">
                {/* brilho estático ao hover (simula o shine) */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* glow roxo por trás */}

                <div className="h-full flex flex-col relative">
                    {/* imagem - gradiente placeholder; troque por <img /> se quiser */}
                    <div className="w-full h-24 mb-2 rounded-b-2xl bg-nutri-green-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]">
                        {/* se for imagem real:
                         */}
                        <img
                            src={produto.foto}
                            alt={produto.nome}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* texto */}
                    <div className="flex flex-col px-2">
                        <p className="text-center text-sm font-bold text-slate-900 transition-all duration-300 group-hover:text-nutri-green-dark">
                            {produto.nome}
                        </p>
                    </div>

                    {/* footer */}
                    <div className="mt-auto flex items-center justify-center">
                        <div className="text-base px-2 font-extrabold text-slate-900 transition-colors duration-300 group-hover:text-nutri-green-dark">
                            <span className="text-nutri-green-dark">R$</span>
                            {Number(produto.preco)
                                .toFixed(2)
                                .toLocaleString()
                                .replace(".", ",")}
                        </div>

                        <button
                            aria-label="add"
                            onClick={add}
                            className="w-7 h-7 m-2 rounded-full flex items-center justify-center text-white bg-nutri-green-dark transform scale-95 transition-all duration-300 group-hover:scale-100 group-hover:shadow-[0_0_0_6px_rgba(124,58,237,0.12)]"
                        >
                            <svg
                                className="w-5 h-7.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    d="M4 12H20M12 4V20"
                                />
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
