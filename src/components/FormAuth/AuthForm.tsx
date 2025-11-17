import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type { Usuario } from "../../models/Usuario";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

export default function AuthCard() {
    const navigate = useNavigate();
    const {
        usuario,
        handleLogin,
        isLoading: isLoadingLogin,
    } = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoadingCadastro, setIsLoadingCadastro] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        role: "",
        foto: "",
        token: "",
    });

    const [usuarioCadastro, setUsuarioCadastro] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });

    useEffect(() => {
        if (usuario.token !== "") navigate("/home");
    }, [usuario, navigate]);

    const toggleMode = () => setIsLoginMode(!isLoginMode);

    function atualizarEstadoLogin(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    function atualizarEstadoCadastro(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioCadastro({
            ...usuarioCadastro,
            [e.target.name]: e.target.value,
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (
            confirmarSenha === usuarioCadastro.senha &&
            usuarioCadastro.senha.length >= 8
        ) {
            setIsLoadingCadastro(true);
            try {
                await cadastrarUsuario(
                    `/usuarios/cadastrar`,
                    usuarioCadastro,
                    setUsuarioCadastro
                );
                ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
                setUsuarioCadastro({
                    id: 0,
                    nome: "",
                    usuario: "",
                    senha: "",
                    foto: "",
                });
                setConfirmarSenha("");
                setIsLoginMode(true);
            } catch {
                ToastAlerta("Erro ao cadastrar o usuário!", "erro");
            } finally {
                setIsLoadingCadastro(false);
            }
        } else {
            ToastAlerta(
                "Dados inconsistentes! Senha deve ter no mínimo 8 caracteres.",
                "erro"
            );
            setUsuarioCadastro({ ...usuarioCadastro, senha: "" });
            setConfirmarSenha("");
        }
    }

    return (
        <div
            className="relative w-full max-w-md mx-auto"
            style={{
                perspective: "51rem",
                height: isLoginMode ? "28rem" : "38rem",
                transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
        >
            <input
                type="checkbox"
                id="auth-mode-toggle"
                className="hidden"
                checked={!isLoginMode}
                onChange={toggleMode}
            />

            {/* Login Card */}
            <div className="log-in-container absolute inset-0 w-full bg-white text-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-primary-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Entrar</h2>
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors"
                    >
                        Criar conta
                    </button>
                </div>

                <form onSubmit={login} className="flex flex-col gap-5 flex-1">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="usuario"
                                placeholder="seu@email.com"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioLogin.usuario}
                                onChange={atualizarEstadoLogin}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="••••••••"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioLogin.senha}
                                onChange={atualizarEstadoLogin}
                                required
                            />
                        </div>

                        <Link
                            to="/recuperar-senha"
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 underline underline-offset-4 block text-right transition-colors"
                        >
                            Esqueceu sua senha?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="mt-auto bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-primary-300 disabled:to-primary-400 text-white py-3.5 rounded-xl text-base font-bold shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:scale-105 active:scale-95 transition-all disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={isLoadingLogin}
                    >
                        {isLoadingLogin ? (
                            <div className="flex justify-center items-center gap-2">
                                <ClipLoader color="#ffffff" size={18} />
                                <span>Entrando...</span>
                            </div>
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>
            </div>

            {/* Cadastro Card */}
            <div className="sign-up-container absolute inset-0 w-full bg-white text-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-primary-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Criar Conta</h2>
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors"
                    >
                        Já tenho conta
                    </button>
                </div>

                <form onSubmit={cadastrarNovoUsuario} className="flex flex-col flex-1">
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome completo"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioCadastro.nome}
                                onChange={atualizarEstadoCadastro}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="usuario"
                                placeholder="seu@email.com"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioCadastro.usuario}
                                onChange={atualizarEstadoCadastro}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Foto de Perfil (URL)
                            </label>
                            <input
                                type="url"
                                name="foto"
                                placeholder="https://exemplo.com/foto.jpg"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioCadastro.foto}
                                onChange={atualizarEstadoCadastro}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Mínimo 8 caracteres"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={usuarioCadastro.senha}
                                onChange={atualizarEstadoCadastro}
                                required
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-neutral-700 mb-2 block">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                placeholder="Digite a senha novamente"
                                className="w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                value={confirmarSenha}
                                onChange={handleConfirmarSenha}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3.5 rounded-xl text-base font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-primary-300 disabled:to-primary-400 text-white py-3.5 rounded-xl text-base font-bold shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:scale-105 active:scale-95 transition-all disabled:cursor-not-allowed disabled:hover:scale-100"
                            disabled={isLoadingCadastro}
                        >
                            {isLoadingCadastro ? (
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader color="#ffffff" size={18} />
                                    <span>Criando...</span>
                                </div>
                            ) : (
                                "Criar Conta"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .sign-up-container, .log-in-container { 
                    backface-visibility: hidden; 
                    transform-style: preserve-3d; 
                }
                
                .sign-up-container { 
                    animation: flipOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
                
                .log-in-container { 
                    animation: flipIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
                
                #auth-mode-toggle:checked ~ .sign-up-container { 
                    animation: flipIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
                
                #auth-mode-toggle:checked ~ .log-in-container { 
                    animation: flipOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
                
                @keyframes flipIn { 
                    0% { transform: rotateY(-90deg); z-index: 1; opacity: 0; } 
                    50% { transform: rotateY(-45deg); z-index: 1; opacity: 0.5; } 
                    100% { transform: rotateY(0deg); z-index: 2; opacity: 1; } 
                }
                
                @keyframes flipOut { 
                    0% { transform: rotateY(0deg); z-index: 2; opacity: 1; } 
                    50% { transform: rotateY(45deg); z-index: 2; opacity: 0.5; } 
                    100% { transform: rotateY(90deg); z-index: 1; opacity: 0; } 
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f5f5f4;
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #22c55e, #16a34a);
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #16a34a, #15803d);
                }
            `}</style>
        </div>
    );
}