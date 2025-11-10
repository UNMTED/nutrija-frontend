import { useContext, useEffect, useState } from "react";
import { PiBagLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ListaCategorias from "../../components/categoria/listacategorias/ListaCategorias";
import ListaProdutos from "../../components/produto/listaprodutos/ListaProdutos";
import { AuthContext } from "../../contexts/AuthContext";
import { useDebounce } from "../../hooks/useDebounce";
import { ToastAlerta } from "../../utils/ToastAlerta";

export default function Home() {
    const { usuario } = useContext(AuthContext);
    const [produto, setProduto] = useState<number>(0);

    const navigate = useNavigate();

    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token, navigate]);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    function addProduto() {
        setProduto(produto + 1);
    }

    return (
        <>
            <main>
                <div className="flex items-baseline">
                    <div className="flex mx-auto my-5 items-center border w-80 md:w-100 lg:w-150 focus-within:border-nutri-green-light transition duration-300 pr-3 gap-2 text-[#535353] bg-[#D2D8CC] border-gray-500/30 h-[46px] rounded-4xl overflow-hidden">
                        <input
                            type="text"
                            placeholder="O que você quer comer hoje?"
                            className="w-full h-full pl-4 outline-none text-center placeholder-gray-500 text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 30 30"
                            fill="#6B7280"
                            className="cursor-pointer"
                            onClick={() => {
                                setQuery((q) => q);
                            }}
                        >
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                        </svg>
                    </div>
                    <div className="hidden md:block mr-5 relative mt-10">
                        <PiBagLight
                            size={28}
                            className="text-gray-700"
                        />

                        {produto > 0 && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5">
                                {produto}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-10 mt-10 md:gap-15 md:mt-15 lg:gap-20">
                    <ListaCategorias />
                    <ListaProdutos
                        query={debouncedQuery}
                        add={addProduto}
                    />
                </div>
            </main>
        </>
    );
}