import React, { useContext, useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

export const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const linkBase =
        "rounded py-2 px-4 hover:bg-white hover:text-black hover:cursor-pointer transition-colors";
    const linkAtivo = "bg-white text-black";

    const links = [
        { to: "/home", label: "Início" },
        { to: "/produtos", label: "Produtos" },
        { to: "/categorias", label: "Categorias" },
        { to: "", label: "Sair" },
    ];
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
        navigate("/");
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <header className="relative border-b border-white bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    <div className="flex items-center gap-4"></div>

                    {/* botão hamburger - visível em telas pequenas */}
                    <button
                        type="button"
                        aria-controls="primary-navigation"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    >
                        <span className="sr-only">Abrir menu</span>
                        {/* ícone simples */}
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {open ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* navegação desktop */}
                    <nav className="hidden lg:flex lg:items-center lg:gap-3">
                        {links.map((l) =>
                            l.label === "Sair" ? (
                                <span
                                    onClick={logout}
                                    className="hover:cursor-pointer"
                                >
                                    Sair
                                </span>
                            ) : (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `${linkBase} ${
                                            isActive ? linkAtivo : "text-black"
                                        }`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            )
                        )}
                    </nav>
                </div>

                {/* menu mobile (colapsável) */}
                <nav
                    id="primary-navigation"
                    className={`absolute left-0 right-0 top-full z-40 transform origin-top transition-all duration-200 ease-in-out
                        bg-conduzze-dark/95 backdrop-blur-sm shadow-md
                        ${
                            open
                                ? "scale-y-100 opacity-100 pointer-events-auto"
                                : "scale-y-0 opacity-0 pointer-events-none"
                        }`}
                    style={{ transformOrigin: "top" }}
                >
                    <div className="flex flex-col gap-2">
                        {links.map((l) =>
                            l.label === "Sair" ? (
                                <span
                                    onClick={logout}
                                    className="hover:cursor-pointer"
                                >
                                    Sair
                                </span>
                            ) : (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    onClick={() => setOpen(false)} // fecha ao navegar
                                    className={({ isActive }) =>
                                        `${linkBase} ${
                                            isActive ? linkAtivo : "text-black"
                                        } block`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            )
                        )}
                    </div>
                </nav>
            </header>
        );
    }

    return <>{component}</>;
};

export default NavBar;
