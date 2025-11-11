// Navbar.tsx
import { useContext, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import PerfilModal from "../../components/perfilModal/PerfilModal"; // Importe o modal

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, handleLogout } = useContext(AuthContext);

  const [profileOpen, setProfileOpen] = useState(false);
  const [showPerfilModal, setShowPerfilModal] = useState(false); // Novo estado

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  const profileLinks = [
    { to: "/home", label: "Início" },
    { 
      to: "", 
      label: "Perfil", 
      action: () => setShowPerfilModal(true) // Abre o modal
    },
    { to: "", label: "Sair", action: logout },
  ];

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <header className="relative border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-nutri-green-light">
            <Link to="/home" className="flex items-center h-8 md:h-10">
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
                <div className="py-1" role="menu">
                  <p className="px-4 py-2 text-sm text-gray-700 font-bold md:hidden">
                    Olá, {usuario.nome.split(" ")[0]}
                  </p>
                  <div className="border-t border-gray-100 md:hidden" />

                  {profileLinks.map((l, index) => (
                    <div key={index}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-nutri-green-light hover:text-nutri-green-dark"
                          role="menuitem"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            if (l.action) l.action();
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
        <PerfilModal
          isOpen={showPerfilModal}
          onClose={() => setShowPerfilModal(false)}
        />
      </header>
    );
  } else {
    component = (
      // ... resto do código permanece igual
      <header className="relative border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-nutri-green-light">
            <Link to="/" className="flex items-center h-8 md:h-10">
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

  return <>{component}</>;
};

export default NavBar;