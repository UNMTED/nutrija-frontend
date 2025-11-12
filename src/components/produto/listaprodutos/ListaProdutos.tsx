import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Produto } from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Modal from "../../modal/Modal";
import ModalConfirm from "../../modal/ModalConfirm";
import DetalhesProdutoModal from "../../modal/detalhesprodutomodal/DetalhesProdutoModal";
import CardProduto from "../cardproduto/CardProduto";
import ProdutoEditModal from "../../modal/produtoeditmodal/ProdutoEditModal";

interface Props {
    limits?: { sm?: number; md?: number; lg?: number; xl?: number };
    query?: string;
    add: () => void;
    categoriaId?: number | null;
    atualizarLista: boolean;
}

export default function ListaProdutos({
    limits,
    query = "",
    add,
    categoriaId,
    atualizarLista,
}: Props) {
    const [expanded, setExpanded] = useState(false);
    const [limit, setLimit] = useState<number>(3);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [produto, setProduto] = useState<Produto | undefined>();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalDetalhesOpen, setIsModalDetalhesOpen] =
        useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] =
        useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);

    const navigate = useNavigate();
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token, navigate]);

    const abreModalConfirm = useCallback((produto: Produto) => {
        setProduto(produto);
        setIsModalDeleteOpen(true);
    }, []);

    const abreModalDetalhes = useCallback((produto: Produto) => {
        setProduto(produto);
        setIsModalDetalhesOpen(true);
    }, []);

    const abreModalEdit = useCallback((produto: Produto) => {
        setProduto(produto);
        setIsModalEditOpen(true);
    }, []);

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

    const buscarProdutosPorCategoria = useCallback(
        async (catId: number) => {
            try {
                setIsLoading(true);
                if (catId !== 0) {
                    await buscar(`/produtos/categoria/${catId}`, setProdutos, {
                        headers: { Authorization: token },
                    });
                } else {
                    buscarProdutos();
                }
            } catch (error: any) {
                if (error.toString().includes("401")) handleLogout();
            } finally {
                setIsLoading(false);
            }
        },
        [token, handleLogout, buscarProdutos]
    );
    const handleRemove = useCallback(
        async (produto: Produto | undefined) => {
            if (produto == undefined) return;
            try {
                await deletar(`/produtos/${produto.id}`, {
                    headers: { Authorization: token },
                });

                buscarProdutos();
                ToastAlerta("Produto removido com sucesso", "sucesso");
            } catch (err) {
                ToastAlerta("Erro ao remover produto", "error");
            } finally {
                setIsModalDeleteOpen(false);
                setProduto(undefined);
            }
        },
        [token, buscarProdutos]
    );

    const onConfirm = useCallback(() => {
        void handleRemove(produto);
    }, [handleRemove, produto]);

    useEffect(() => {
        if (categoriaId !== null) {
            void buscarProdutosPorCategoria(categoriaId!);
        } else {
            void buscarProdutos();
        }
    }, [categoriaId, buscarProdutos, buscarProdutosPorCategoria]);

    useEffect(() => {
        void buscarProdutos();
    }, [atualizarLista, buscarProdutos]);

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
                    {usuario.role === "admin" && (
                        <button className="mr-2 md:mr-10 text-sm text-nutri-green-dark hover:underline">
                            Adicionar
                        </button>
                    )}
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
                            remove={() => abreModalConfirm(prod)}
                            add={add}
                            edit={() => abreModalEdit(prod)}
                            detalhes={() => abreModalDetalhes(prod)}
                        />
                    ))}
                </div>
            )}
            
            <ModalConfirm
                text={`Tem certeza que deseja excluir o produto ${produto?.nome}?`}
                open={isModalDeleteOpen}
                onConfirm={onConfirm}
                onClose={() => setIsModalDeleteOpen(false)}
            />
            
            <Modal
                open={isModalDetalhesOpen}
                onClose={() => setIsModalDetalhesOpen(false)}
            >
                <DetalhesProdutoModal
                    add={add}
                    produto={produto!}
                />
            </Modal>

            {usuario.role === "admin" && produto && ( 
                <ProdutoEditModal
                    isOpen={isModalEditOpen}
                    onClose={() => setIsModalEditOpen(false)}
                    produto={produto}
                    onUpdate={buscarProdutos}
                />
            )}
        </section>
    );
}