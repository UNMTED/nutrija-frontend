import { MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarrinhoModal from "../../components/carrinho/CarrinhoModal";
import ListaCategorias from "../../components/categoria/listacategorias/ListaCategorias";
import FavoritosProdutoModal from "../../components/favorito/FavoritoModal";
import ListaProdutos from "../../components/produto/listaprodutos/ListaProdutos";
import { AuthContext } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { useDebounce } from "../../hooks/useDebounce";
import { type Produto } from "../../models/Produto";

interface CartItem extends Produto {
    quantidadeCarrinho: number;
}

export default function Home() {
    const { usuario } = useContext(AuthContext);
    const {
        produtosFavoritos,
        adicionarAosFavoritos,
        removerDosFavoritos,
        verificarSeFavorito,
    } = useFavoritos();
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [atualizarLista, setAtualizarLista] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [favoritosAberto, setFavoritosAberto] = useState(false);
    const [itensCarrinho, setItensCarrinho] = useState<CartItem[]>([]);

    const debouncedQuery = useDebounce(query, 500);
    const navigate = useNavigate();
    const token = usuario.token;

    const totalItens = itensCarrinho.reduce(
        (acc, item) => acc + item.quantidadeCarrinho,
        0
    );

    // Listener para evento de adicionar ao carrinho vindo da NavBar/Favoritos
    useEffect(() => {
        const handleAdicionarProduto = (event: CustomEvent) => {
            const detail = event.detail as any;
            const { produto, abrirCarrinho } =
                detail && typeof detail === "object" && "produto" in detail
                    ? {
                          produto: detail.produto as Produto,
                          abrirCarrinho: Boolean(detail.abrirCarrinho),
                      }
                    : { produto: detail as Produto, abrirCarrinho: false };

            adicionarAoCarrinho(produto);
            if (abrirCarrinho) {
                setCarrinhoAberto(true);
            }
        };

        window.addEventListener(
            "adicionarAoCarrinho" as any,
            handleAdicionarProduto as EventListener
        );

        return () => {
            window.removeEventListener(
                "adicionarAoCarrinho" as any,
                handleAdicionarProduto as EventListener
            );
        };
    }, [itensCarrinho]);

    useEffect(() => {
        if (token === "") {
            navigate("/login");
        }
    }, [token, navigate]);

    function buscarPorCategoria(id: number | null) {
        if (id === null) {
            setAtualizarLista(!atualizarLista);
            setCategoriaId(0);
        } else {
            setCategoriaId(id);
        }
    }

    function adicionarAoCarrinho(produtoAdicionado: Produto) {
        setItensCarrinho((prevItems) => {
            const itemExistente = prevItems.find(
                (item) => item.id === produtoAdicionado.id
            );

            if (itemExistente) {
                return prevItems.map((item) =>
                    item.id === produtoAdicionado.id
                        ? {
                              ...item,
                              quantidadeCarrinho: item.quantidadeCarrinho + 1,
                          }
                        : item
                );
            }

            return [
                ...prevItems,
                {
                    ...produtoAdicionado,
                    quantidadeCarrinho: 1,
                },
            ];
        });
    }

    function removerDoCarrinho(produtoId: number) {
        setItensCarrinho((prevItems) =>
            prevItems.filter((item) => item.id !== produtoId)
        );
    }

    function atualizarQuantidadeCarrinho(
        produtoId: number,
        novaQuantidade: number
    ) {
        if (novaQuantidade < 1) {
            removerDoCarrinho(produtoId);
            return;
        }

        setItensCarrinho((prevItems) =>
            prevItems.map((item) =>
                item.id === produtoId
                    ? { ...item, quantidadeCarrinho: novaQuantidade }
                    : item
            )
        );
    }

    function finalizarCompra() {
        // Lógica de checkout aqui
        console.log("Finalizando compra com items:", itensCarrinho);
        // Após finalizar, você pode limpar o carrinho
        // setItensCarrinho([]);
        // setCarrinhoAberto(false);
    }

    return (
        <main className="relative">
            {/* Background Decorativo */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-br from-primary-50 via-lime-50/30 to-transparent -z-10 pattern-dots" />

            <div className="flex items-center justify-between gap-2 sm:gap-4 my-8 px-4 sm:px-6 md:px-8">
                {/* Search Bar Melhorada */}
                <div className="flex-1 max-w-2xl mx-auto">
                    <div
                        className="relative group"
                        style={{
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <div
                            className={`
                                flex items-center gap-3 px-3 sm:px-4 md:px-6 h-10 sm:h-12 md:h-14
                                bg-white rounded-full shadow-lg
                                border-2 transition-all duration-300
                                ${
                                    isFocused
                                        ? "border-primary-400 shadow-xl shadow-primary-100"
                                        : "border-neutral-200 hover:border-primary-200"
                                }
                            `}
                        >
                            <MagnifyingGlass
                                size={20}
                                weight="bold"
                                className={`shrink-0 transition-colors duration-300 ${
                                    isFocused
                                        ? "text-primary-500"
                                        : "text-neutral-400"
                                }`}
                            />

                            <input
                                type="text"
                                placeholder="O que você quer comer hoje?"
                                className="w-full h-full outline-none focus:outline-none text-xs sm:text-sm md:text-base placeholder:text-neutral-400 bg-transparent"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />

                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                                    aria-label="Limpar busca"
                                >
                                    <svg
                                        className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Indicador de Loading */}
                        {query !== debouncedQuery && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="w-8 h-0.5 bg-primary-400 rounded-full loading-pulse" />
                            </div>
                        )}
                    </div>
                </div>

                {usuario.role !== "admin" && (
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Botão Carrinho */}
                        <button
                            onClick={() => setCarrinhoAberto(true)}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center hover:shadow-xl hover:border-primary-200 transition-all hover:scale-105 active:scale-95"
                            aria-label="Carrinho de compras"
                        >
                            <ShoppingCart
                                size={28}
                                className="text-neutral-700"
                            />

                            {itensCarrinho.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-linear-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 shadow-lg animate-bounce-subtle">
                                    {totalItens > 99 ? "99+" : totalItens}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Conteúdo Principal */}
            <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 mt-10 px-4 sm:px-6 md:px-8">
                <section
                    className="animate-fade-in-up"
                    style={{
                        animationDelay: "0.1s",
                        animationFillMode: "both",
                    }}
                >
                    <ListaCategorias buscarPorCategoria={buscarPorCategoria} />
                </section>

                <section
                    className="animate-fade-in-up"
                    style={{
                        animationDelay: "0.2s",
                        animationFillMode: "both",
                    }}
                >
                    <ListaProdutos
                        query={debouncedQuery}
                        add={adicionarAoCarrinho}
                        categoriaId={categoriaId}
                        atualizarLista={atualizarLista}
                        onFavorite={adicionarAosFavoritos}
                        isFavorite={verificarSeFavorito}
                    />
                </section>
            </div>

            {/* Modal do Carrinho */}
            <CarrinhoModal
                open={carrinhoAberto}
                onClose={setCarrinhoAberto}
                items={itensCarrinho}
                onRemove={removerDoCarrinho}
                onUpdateQuantidade={atualizarQuantidadeCarrinho}
                onCheckout={finalizarCompra}
            />

            {/* Modal de Favoritos */}
            <FavoritosProdutoModal
                open={favoritosAberto}
                onClose={setFavoritosAberto}
                produtos={produtosFavoritos}
                onRemove={removerDosFavoritos}
                onAddToCart={adicionarAoCarrinho}
            />

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite;
                }

                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
            `}</style>
        </main>
    );
}
