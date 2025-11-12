import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import EditarPerfilForm from "./EditarPerfil";

interface PerfilModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PerfilModal({ isOpen, onClose }: PerfilModalProps) {
    const { usuario } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            aria-modal="true"
            role="dialog"
        >
            <div className="w-11/12 max-w-md bg-white rounded-2xl shadow-2xl border border-nutri-green-light">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-nutri-green-dark">
                        {isEditing ? "Editar Perfil" : "Meu Perfil"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-nutri-green-dark hover:bg-gray-100"
                        aria-label="Fechar modal"
                    >
                        <svg
                            className="w-5 h-5"
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
                </div>

                {/* Body */}
                <div className="p-6">
                    {!isEditing ? (
                        <div className="flex flex-col items-center">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full bg-nutri-green-light border-4 border-nutri-green-dark flex items-center justify-center mb-4 overflow-hidden">
                                {usuario.foto ? (
                                    <img
                                        src={usuario.foto}
                                        alt="Foto"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <svg
                                        className="w-12 h-12 text-nutri-green-dark"
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
                            </div>

                            {/* Informações */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {}
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">{}</p>

                            {/* Botões */}
                            <div className="w-full flex flex-col gap-3">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full py-3 px-4 bg-nutri-green text-white font-medium rounded-xl hover:bg-nutri-green-dark"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        Editar Perfil
                                    </span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <EditarPerfilForm
                                onCancel={() => setIsEditing(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
