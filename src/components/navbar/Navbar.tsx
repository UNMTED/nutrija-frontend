import { House, SignOut, User } from "@phosphor-icons/react";
import { useContext, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import PerfilModal from "../../components/perfilModal/PerfilModal"; // Importe o modal
=======
import PerfilModal from "../../components/perfilModal/PerfilModal";
>>>>>>> f6c11983c05ad430ab30dac2f61fbeeeddb710cf
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, handleLogout } = useContext(AuthContext);

    const [profileOpen, setProfileOpen] = useState(false);
<<<<<<< HEAD
    const [showPerfilModal, setShowPerfilModal] = useState(false); // Novo estado

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
=======
    const [showPerfilModal, setShowPerfilModal] = useState(false);

    function logout() {
        handleLogout();
        ToastAlerta("Usuário desconectado com sucesso!", "info");
>>>>>>> f6c11983c05ad430ab30dac2f61fbeeeddb710cf
        navigate("/");
    }

    const profileLinks = [
<<<<<<< HEAD
        { to: "/home", label: "Início" },
        {
            to: "",
            label: "Perfil",
            action: () => setShowPerfilModal(true), // Abre o modal
        },
        { to: "", label: "Sair", action: logout },
=======
        { 
            to: "/home", 
            label: "Início",
            icon: <House size={16} weight="bold" />,
            action: undefined 
        },
        {
            to: "",
            label: "Perfil",
            icon: <User size={16} weight="bold" />,
            action: () => setShowPerfilModal(true),
        },
        { 
            to: "", 
            label: "Sair", 
            icon: <SignOut size={16} weight="bold" />,
            action: logout 
        },
>>>>>>> f6c11983c05ad430ab30dac2f61fbeeeddb710cf
    ];

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
<<<<<<< HEAD
            <header className="relative border-b border-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-nutri-green-light">
                        <Link
                            to="/home"
                            className="flex items-center h-8 md:h-10"
                        >
                            <span className="text-nutri-green">NutriJá</span>
                        </Link>
                    </div>

                    <div className="relative flex items-center gap-4">
                        <span className="text-gray-600 text-base font-medium hidden md:block">
                            Olá, {usuario.nome.split(" ")[0]}
                        </span>

                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-nutri-green-light border-2 border-nutri-green-dark focus:outline-none focus:ring-2 focus:ring-nutri-green-light"
                            aria-expanded={profileOpen}
                            aria-label="Menu do Usuário"
                        >
                            {usuario.foto ? (
                                <img
                                    src={usuario.foto}
                                    alt="Foto do Usuário"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <svg
                                    className="w-6 h-6 text-nutri-green-dark"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            )}
                        </button>

                        {profileOpen && (
                            <nav className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                                <div
                                    className="py-1"
                                    role="menu"
                                >
                                    <p className="px-4 py-2 text-sm text-gray-700 font-bold md:hidden">
                                        Olá, {usuario.nome.split(" ")[0]}
                                    </p>
                                    <div className="border-t border-gray-100 md:hidden" />

                                    {profileLinks.map((l, index) => (
                                        <div key={index}>
                                            {l.to ? (
                                                <Link
                                                    to={l.to}
                                                    onClick={() =>
                                                        setProfileOpen(false)
                                                    }
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nutri-green-light hover:text-nutri-green-dark"
                                                    role="menuitem"
                                                >
                                                    {l.label}
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        if (l.action)
                                                            l.action();
                                                        setProfileOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-nutri-green-light hover:text-nutri-green-dark"
                                                    role="menuitem"
                                                >
                                                    {l.label}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </nav>
                        )}
                    </div>
                </div>

                {/* Renderiza o Modal */}
=======
            <header className="relative bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    
                    {/* Logo */}
                    <Link
                        to="/home"
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🥗</span>
                        </div>
                        <span className="text-2xl font-bold">
                            <span className="text-primary-600">Nutri</span>
                            <span className="text-neutral-800">Já</span>
                        </span>
                    </Link>

                    {/* Menu do Usuário */}
                    <div className="relative flex items-center gap-4">
                        <span className="text-neutral-600 text-sm md:text-base font-medium hidden md:block">
                            Olá, <span className="font-bold text-neutral-800">{usuario.nome.split(" ")[0]}</span>
                        </span>

                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-lime-100 border-2 border-primary-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
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
                                <User size={22} weight="bold" className="text-primary-700" />
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
                                    <div className="md:hidden px-4 py-3 bg-gradient-to-br from-primary-50 to-lime-50 border-b border-primary-100">
                                        <p className="text-sm font-bold text-neutral-800">
                                            {usuario.nome.split(" ")[0]}
                                        </p>
                                        <p className="text-xs text-neutral-600 truncate">
                                            {usuario.usuario}
                                        </p>
                                    </div>

                                    <div className="py-2" role="menu">
                                        {profileLinks.map((l, index) => (
                                            <div key={index}>
                                                {l.to ? (
                                                    <Link
                                                        to={l.to}
                                                        onClick={() => setProfileOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                                        role="menuitem"
                                                    >
                                                        {l.icon}
                                                        {l.label}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (l.action) l.action();
                                                            setProfileOpen(false);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-left"
                                                        role="menuitem"
                                                    >
                                                        {l.icon}
                                                        {l.label}
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
>>>>>>> f6c11983c05ad430ab30dac2f61fbeeeddb710cf
                <PerfilModal
                    isOpen={showPerfilModal}
                    onClose={() => setShowPerfilModal(false)}
                />
            </header>
        );
    } else {
        component = (
<<<<<<< HEAD
            // ... resto do código permanece igual
            <header className="relative border-b border-gray-300">
                <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-nutri-green-light">
                        <Link
                            to="/"
                            className="flex items-center h-8 md:h-10"
                        >
                            <span className="text-nutri-green">NutriJá</span>
                        </Link>
                    </div>
                    {location.pathname.startsWith("/login") ? null : (
                        <Link
                            to="/login"
                            className="bg-nutri-green text-white px-4 py-1 rounded cursor-pointer hover:bg-nutri-green-dark transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </header>
        );
    }

=======
            <header className="relative bg-white border-b border-neutral-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🥗</span>
                        </div>
                        <span className="text-2xl font-bold">
                            <span className="text-primary-600">Nutri</span>
                            <span className="text-neutral-800">Já</span>
                        </span>
                    </Link>

                    {/* Botão de Login */}
                    {!location.pathname.startsWith("/login") && (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:scale-105 active:scale-95 transition-all"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </header>
        );
    }

>>>>>>> f6c11983c05ad430ab30dac2f61fbeeeddb710cf
    return <>{component}</>;
};

export default NavBar;
