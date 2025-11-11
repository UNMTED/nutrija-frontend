import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardProduto from "../cardproduto/CardProduto";

interface Props {
    limits?: { sm?: number; md?: number; lg?: number; xl?: number };
    query?: string;
    add: () => void;
}

export default function ListaProdutos({ limits, query = "", add }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [limit, setLimit] = useState<number>(3);
    const [produtos, setProdutos] = useState<Produto[]>([]); // <- inicial como array
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token, navigate]);

    const buscarProdutos = useCallback(async () => {
        try {
            setIsLoading(true);
            const q = query?.trim();
            const url = q
                ? `/produtos/nome/${encodeURIComponent(q)}`
                : "/produtos";
            await buscar(url, setProdutos, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }, [token, handleLogout, query]);

    useEffect(() => {
        buscarProdutos();
    }, [buscarProdutos]);

    const cfg = useMemo(
        () => ({
            sm: limits?.sm ?? 4,
            md: limits?.md ?? 6,
            lg: limits?.lg ?? 8,
            xl: limits?.xl ?? 12,
        }),
        [limits]
    );

    useEffect(() => {
        function calcLimit() {
            const w = window.innerWidth;
            if (w >= 1024) setLimit(cfg.xl);
            else if (w >= 768) setLimit(cfg.lg);
            else if (w >= 640) setLimit(cfg.md);
            else setLimit(cfg.sm);
        }

        calcLimit();
        window.addEventListener("resize", calcLimit);
        return () => window.removeEventListener("resize", calcLimit);
    }, [cfg]);

    const visible = expanded ? produtos : produtos.slice(0, limit);

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-2xl text-gray-700">
                    Os mais pedidos
                </h2>
                <div>
                    <button className="mr-2 md:mr-10 text-sm text-nutri-green-dark hover:underline">
                        Adicionar
                    </button>
                    <button
                        type="button"
                        onClick={() => setExpanded((s) => !s)}
                        className="text-sm text-nutri-green-dark hover:underline"
                        aria-expanded={expanded}
                    >
                        {expanded
                            ? "Mostrar menos"
                            : `Ver todos ${
                                  produtos.length >= limit
                                      ? "(" + produtos.length + ")"
                                      : ""
                              }`}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
            ) : (
                <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {visible.map((prod) => (
                        <CardProduto
                            key={prod.id}
                            produto={prod}
                            add={add}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
