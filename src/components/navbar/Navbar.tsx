import { Heart, House, SignOut, User } from "@phosphor-icons/react";
import { useContext, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PerfilModal from "../../components/perfilModal/PerfilModal";
import { AuthContext } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";
import type { Produto } from "../../models/Produto";
import { ToastAlerta } from "../../utils/ToastAlerta";
import FavoritosProdutoModal from "../favorito/FavoritoModal";

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, handleLogout } = useContext(AuthContext);
    const { produtosFavoritos, removerDosFavoritos } = useFavoritos();

    const [profileOpen, setProfileOpen] = useState(false);
    const [showPerfilModal, setShowPerfilModal] = useState(false);
    const [showFavoritosModal, setShowFavoritosModal] = useState(false);

    function logout() {
        handleLogout();
        ToastAlerta("Usuário desconectado com sucesso!", "info");
        navigate("/");
    }

    function adicionarAoCarrinho(produto: Produto) {
        // Dispara evento customizado que a página Home vai escutar
        window.dispatchEvent(
            new CustomEvent("adicionarAoCarrinho", { detail: produto })
        );
        ToastAlerta(`${produto.nome} adicionado ao carrinho!`, "sucesso");
    }

    const profileLinks = [
        {
            to: "/home",
            label: "Início",
            icon: (
                <House
                    size={16}
                    weight="bold"
                />
            ),
            action: undefined,
        },
        {
            to: "",
            label: "Perfil",
            icon: (
                <User
                    size={16}
                    weight="bold"
                />
            ),
            action: () => setShowPerfilModal(true),
        },
        ...(usuario.role !== "admin"
            ? [
                  {
                      to: "",
                      label: "Favoritos",
                      icon: (
                          <Heart
                              size={16}
                              weight="bold"
                          />
                      ),
                      action: () => setShowFavoritosModal(true),
                  },
              ]
            : []),
        {
            to: "",
            label: "Sair",
            icon: (
                <SignOut
                    size={16}
                    weight="bold"
                />
            ),
            action: logout,
        },
    ];

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <header className="relative bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link
                        to="/home"
                        className="flex items-center gap-2 group"
                    >
                        <img
                            src="/Icon-nutrija.svg"
                            alt="NutriJa"
                        />
                        <span className="text-2xl font-bold">
                            <span className="text-primary-600">Nutri</span>
                            <span className="text-neutral-800">Já</span>
                        </span>
                    </Link>

                    {/* Menu do Usuário */}
                    <div className="relative flex items-center gap-4">
                        <span className="text-neutral-600 text-sm md:text-base font-medium hidden md:block">
                            Olá,{" "}
                            <span className="font-bold text-neutral-800">
                                {usuario.nome.split(" ")[0]}
                            </span>
                        </span>

                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="relative w-11 h-11 rounded-xl bg-linear-to-br from-primary-100 to-lime-100 border-2 border-primary-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                            aria-expanded={profileOpen}
                            aria-label="Menu do Usuário"
                        >
                            {usuario.foto ? (
                                <img
                                    src={usuario.foto}
                                    alt="Foto do Usuário"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User
                                    size={22}
                                    weight="bold"
                                    className="text-primary-700"
                                />
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {profileOpen && (
                            <>
                                {/* Overlay para fechar ao clicar fora */}
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setProfileOpen(false)}
                                />

                                <nav className="absolute right-0 top-full mt-3 w-56 rounded-2xl shadow-2xl bg-white ring-1 ring-neutral-200 z-40 overflow-hidden border border-primary-100">
                                    {/* Header do Menu Mobile */}
                                    <div className="md:hidden px-4 py-3 bg-linear-to-br from-primary-50 to-lime-50 border-b border-primary-100">
                                        <p className="text-sm font-bold text-neutral-800">
                                            {usuario.nome.split(" ")[0]}
                                        </p>
                                        <p className="text-xs text-neutral-600 truncate">
                                            {usuario.usuario}
                                        </p>
                                    </div>

                                    <div
                                        className="py-2"
                                        role="menu"
                                    >
                                        {profileLinks.map((l, index) => (
                                            <div key={index}>
                                                {l.to ? (
                                                    <Link
                                                        to={l.to}
                                                        onClick={() =>
                                                            setProfileOpen(
                                                                false
                                                            )
                                                        }
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                                        role="menuitem"
                                                    >
                                                        {l.icon}
                                                        <span className="flex-1">
                                                            {l.label}
                                                        </span>
                                                        {l.label ===
                                                            "Favoritos" &&
                                                            produtosFavoritos.length >
                                                                0 && (
                                                                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                                    {produtosFavoritos.length >
                                                                    99
                                                                        ? "99+"
                                                                        : produtosFavoritos.length}
                                                                </span>
                                                            )}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (l.action)
                                                                l.action();
                                                            setProfileOpen(
                                                                false
                                                            );
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-left"
                                                        role="menuitem"
                                                    >
                                                        {l.icon}
                                                        <span className="flex-1">
                                                            {l.label}
                                                        </span>
                                                        {l.label ===
                                                            "Favoritos" &&
                                                            produtosFavoritos.length >
                                                                0 && (
                                                                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                                    {produtosFavoritos.length >
                                                                    99
                                                                        ? "99+"
                                                                        : produtosFavoritos.length}
                                                                </span>
                                                            )}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </nav>
                            </>
                        )}
                    </div>
                </div>

                {/* Modal de Perfil */}
                <PerfilModal
                    isOpen={showPerfilModal}
                    onClose={() => setShowPerfilModal(false)}
                />

                {/* Modal de Favoritos */}
                <FavoritosProdutoModal
                    open={showFavoritosModal}
                    onClose={setShowFavoritosModal}
                    produtos={produtosFavoritos}
                    onRemove={removerDosFavoritos}
                    onAddToCart={adicionarAoCarrinho}
                />
            </header>
        );
    } else {
        component = (
            <header className="relative bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                    >
                        <img
                            src="/Icon-nutrija.svg"
                            alt="NutriJa"
                        />
                        <span className="text-2xl font-bold">
                            <span className="text-primary-600">Nutri</span>
                            <span className="text-neutral-800">Já</span>
                        </span>
                    </Link>

                    {/* Botão de Login */}
                    {!location.pathname.startsWith("/login") && (
                        <Link
                            to="/login"
                            className="px-4 sm:px-6 py-2.5 bg-linear-to-br from-primary-600 to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-600 hover:shadow-xl hover:shadow-primary-600 hover:scale-105 active:scale-95 transition-all"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </header>
        );
    }

    return <>{component}</>;
};

export default NavBar;
