import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { atualizar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

interface EditarPerfilFormProps {
    onCancel: () => void;
}

export default function EditarPerfilForm({ onCancel }: EditarPerfilFormProps) {
    const { usuario, handleLogout, atualizarUsuarioContext } =
        useContext(AuthContext);
    const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogin>(() => ({
        ...usuario,
    }));
    const token = usuario.token;

    // sincroniza quando o context muda (útil se formulário abrir depois do fetch)
    useEffect(() => {
        setUsuarioLogado({ ...usuario });
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUsuarioLogado((prev) => ({ ...prev, [name]: value }));
    }

    async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await atualizar(
                `/usuarios/atualizar`,
                usuarioLogado,
                setUsuarioLogado,
                {
                    headers: { Authorization: token },
                }
            );
            atualizarUsuarioContext(usuarioLogado);
            ToastAlerta("Usuário atualizado com sucesso", "sucesso");
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
            else ToastAlerta("Erro ao atualizar usuário", "erro");
        }
    }

    return (
        <form
            className="w-full"
            onSubmit={atualizarUsuario}
        >
            <div className="space-y-4 sm:space-y-5">
                {/* Foto de Perfil */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Foto de Perfil
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-nutri-green-light border-2 border-nutri-green-dark flex items-center justify-center overflow-hidden shrink-0">
                            {usuarioLogado.foto ? (
                                <img
                                    src={usuarioLogado.foto}
                                    alt="Foto atual"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                /* svg fallback */
                                <svg
                                    className="w-8 h-8 sm:w-10 sm:h-10 text-nutri-green-dark"
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

                        <input
                            name="foto"
                            type="text"
                            placeholder="URL da imagem (opcional)"
                            value={usuarioLogado.foto ?? ""}
                            onChange={atualizarEstado}
                            className="flex-1 px-3 sm:px-4 py-2 border rounded-lg outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Nome
                    </label>
                    <input
                        name="nome"
                        type="text"
                        value={usuarioLogado.nome ?? ""}
                        onChange={atualizarEstado}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none text-sm sm:text-base"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Email
                    </label>
                    <input
                        name="usuario"
                        type="email"
                        value={usuarioLogado.usuario ?? ""}
                        onChange={atualizarEstado}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none text-sm sm:text-base"
                        required
                    />
                </div>

                {/* Senha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Senha
                    </label>
                    <input
                        name="senha"
                        type="password"
                        onChange={atualizarEstado}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none text-sm sm:text-base"
                        required
                    />
                </div>

                {/* Botões */}
                <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-nutri-green text-white rounded-lg text-sm sm:text-base font-medium hover:bg-nutri-green-dark transition-colors"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </form>
    );
}
