import React, {
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

const DeliveryIcon = ({ className = "" }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_2579_155_navbar)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.6219 15C37.2429 15.0002 41.2618 18.1666 42.3435 22.6592L44.5769 31.9395C46.6609 33.5878 47.9998 36.1367 47.9998 39C47.9998 43.9706 43.9703 48 38.9998 48C35.0813 48 31.7491 45.4953 30.5135 42H21.4861C20.2505 45.4953 16.9183 48 12.9998 48C8.02923 48 3.99979 43.9706 3.99979 39C3.99979 37.5473 4.34555 36.1758 4.95682 34.9609L2.50956 18.4395C2.2412 16.6274 3.64547 15 5.47733 15H32.6219Z"
                fill="#A5F647"
            />
            <path
                d="M47.25 40.5C47.25 38.046 45.9158 35.8215 43.8105 34.6335C44.0955 33.756 44.25 32.832 44.25 31.8833C44.25 28.2038 41.9347 24.8625 38.4885 23.5703L38.25 23.4803V22.083C38.6932 22.341 39.201 22.5 39.75 22.5H45.75V16.5H39.75C39.201 16.5 38.6932 16.659 38.25 16.917V16.5C38.25 15.2993 37.6672 14.1773 36.7095 13.476C36.5153 12.219 35.4352 11.25 34.125 11.25L24.9533 11.2493C26.0265 10.305 26.7593 8.98729 26.946 7.49854H29.2478C30.4883 7.49854 31.4978 6.48904 31.4978 5.24854C31.4978 4.00804 30.4883 2.99854 29.2478 2.99854H25.6672C24.5325 1.58704 22.821 0.748535 20.9977 0.748535C17.6895 0.748535 14.9977 3.44029 14.9977 6.74854C14.9977 8.97303 16.2172 10.914 18.0203 11.9505C16.4535 12.7253 15.2317 14.0873 14.6415 15.75H3C1.7595 15.75 0.75 16.7595 0.75 18V27C0.75 28.2405 1.7595 29.25 3 29.25H5.33325C4.3575 30.204 3.75 31.5315 3.75 33V34.5195C2.84475 35.2043 2.25 36.2798 2.25 37.5C2.25 39.5678 3.93225 41.25 6 41.25H7.57575C7.9245 42.9593 9.43875 44.25 11.25 44.25C13.0612 44.25 14.5755 42.9593 14.9242 41.25H35.3258C35.6745 42.9593 37.1888 44.25 39 44.25C40.8112 44.25 42.3255 42.9593 42.6742 41.25H47.25V40.5ZM42.75 31.8833C42.75 33.8543 41.9827 35.7075 40.5885 37.101L37.9395 39.75H35.25V16.2368C35.706 16.0185 36.087 15.6758 36.351 15.249C36.5985 15.6158 36.75 16.0448 36.75 16.5V24.5198L37.962 24.9743C40.8263 26.0483 42.75 28.8248 42.75 31.8833ZM32.1623 37.044L30.03 27.981C29.475 25.6193 27.57 23.835 25.1753 23.436L24.75 23.3648L24.7485 16.5H33.75V39.75H31.722C32.0625 39.2243 32.2493 38.6138 32.2485 37.9725V37.7925C32.2485 37.5435 32.2192 37.2923 32.1623 37.044ZM44.25 21H42.75V18H44.25V21ZM39.75 18H41.25V21H39.75C38.9227 21 38.25 20.3273 38.25 19.5C38.25 18.6728 38.9227 18 39.75 18ZM29.9985 5.24854C29.9985 5.66179 29.6625 5.99854 29.2485 5.99854H22.962L23.0903 5.74278C23.4743 4.97553 24.2453 4.49854 25.1033 4.49854H29.2485C29.6625 4.49854 29.9985 4.83529 29.9985 5.24854ZM20.9985 2.24854C22.0297 2.24854 23.013 2.60928 23.8013 3.23778C22.9237 3.56103 22.1842 4.19929 21.7485 5.07154L21.285 5.99854H16.566C16.9252 3.87379 18.7732 2.24854 20.9985 2.24854ZM16.566 7.49854H25.4303C25.0718 9.62329 23.2237 11.2485 20.9977 11.2485C18.7717 11.2485 16.9252 9.62329 16.566 7.49854ZM15.7485 18C15.7485 15.1043 18.1042 12.7485 21 12.7485L34.125 12.75C34.7453 12.75 35.25 13.2548 35.25 13.875C35.25 14.4953 34.7453 15 34.125 15H20.25V16.5H23.2485L23.25 24.6353L24.9292 24.9158C26.7247 25.2143 28.1535 26.553 28.5697 28.3238L30.7013 37.3845C30.7328 37.5203 30.7485 37.6568 30.7485 37.7925V37.9733C30.7485 38.448 30.564 38.8943 30.2288 39.2295C29.8927 39.5655 29.4473 39.75 28.9725 39.75C28.1558 39.75 27.4478 39.1965 27.249 38.4045L25.296 30.5903C24.8775 28.9178 23.382 27.75 21.6578 27.75L19.4977 27.7493C17.43 27.7493 15.7485 26.067 15.7485 23.9993V18ZM26.2207 39.75H23.25V33C23.25 31.5323 22.6425 30.2048 21.6683 29.2508C22.698 29.2553 23.5912 29.9543 23.8417 30.9533L25.7948 38.7675C25.8833 39.1245 26.0302 39.4545 26.2207 39.75ZM3 27.75C2.586 27.75 2.25 27.414 2.25 27V18C2.25 17.5868 2.586 17.25 3 17.25H14.2927C14.265 17.4968 14.2485 17.7465 14.2485 18V23.9993C14.2485 25.4678 14.8567 26.796 15.8317 27.75H15H9H3ZM11.25 42.75C10.2735 42.75 9.4485 42.1208 9.138 41.25H13.3612C13.0515 42.1208 12.2265 42.75 11.25 42.75ZM18.75 39.75H6C4.7595 39.75 3.75 38.7405 3.75 37.5C3.75 36.2595 4.7595 35.25 6 35.25H16.5C17.7405 35.25 18.75 36.2595 18.75 37.5V39.75ZM16.5 33.75H6C5.7435 33.75 5.49225 33.7763 5.25 33.8258V33C5.25 30.9323 6.93225 29.25 9 29.25H15H18C20.0677 29.25 21.75 30.9323 21.75 33V39.75H20.25V37.5C20.25 35.4323 18.5677 33.75 16.5 33.75ZM39 42.75C38.0235 42.75 37.1985 42.1208 36.888 41.25H41.1112C40.8015 42.1208 39.9765 42.75 39 42.75ZM40.0605 39.75L41.649 38.1615C42.2903 37.5203 42.819 36.7973 43.2308 36.018C44.568 36.8325 45.474 38.2013 45.6968 39.75H40.0605Z"
                fill="#219C10"
            />
            <path d="M11.25 36.75H12.75V38.25H11.25V36.75Z" fill="#219C10" />
            <path d="M5.25 36.75H6.75V38.25H5.25V36.75Z" fill="#219C10" />
            <path d="M8.25 36.75H9.75V38.25H8.25V36.75Z" fill="#219C10" />
        </g>
        <defs>
            <clipPath id="clip0_2579_155_navbar">
                <rect width="48" height="48" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    const [profileOpen, setProfileOpen] = useState(false);
    const [isTitleIcon, setIsTitleIcon] = useState(false);

    useEffect(() => {
        if (usuario.token !== "") {
            const intervalId = setInterval(() => {
                setIsTitleIcon((prev) => !prev);
            }, 2500);
            return () => clearInterval(intervalId);
        }
    }, [usuario.token]);

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
        navigate("/");
    }

    const profileLinks = [
        { to: "/home", label: "Início" },
        { to: `/perfil/${usuario.id}`, label: "Perfil" },
        { to: "", label: "Sair", action: logout },
    ];

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <header className="relative border-b border-gray-300 bg-white">
                <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-nutri-green-dark">
                        <Link to="/home" className="flex items-center h-8 md:h-10">
                            <span className="text-nutri-green-dark">
                                {isTitleIcon ? (
                                    <DeliveryIcon className="w-8 h-8 md:w-10 md:h-10" />
                                ) : (
                                    "NutriJá"
                                )}
                            </span>
                        </Link>
                    </div>

                    
                    <div className="relative flex items-center gap-4">
                        
                        <span className="text-gray-600 text-base font-medium hidden md:block">
                            Olá, {usuario.nome.split(" ")[0]}
                        </span>
                        
                        
                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-nutri-green-light border-2 border-nutri-green-dark focus:outline-none"
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
                                    xmlns="http://www.w3.org/2000/svg"
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
                            <nav
                                className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                onBlur={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                        setProfileOpen(false);
                                    }
                                }}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <p className="px-4 py-2 text-sm text-gray-700 font-bold md:hidden">
                                        Olá, {usuario.nome.split(" ")[0]}
                                    </p>
                                    <div className="border-t border-gray-100 md:hidden" />
                                    
                                    {profileLinks.map((l) => (
                                        <Link
                                            key={l.to}
                                            to={l.to}
                                            onClick={() => {
                                                if (l.action) l.action();
                                                setProfileOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-nutri-green-light hover:text-nutri-green-dark"
                                            role="menuitem"
                                        >
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        );
    }

    return <>{component}</>;
};

export default NavBar;