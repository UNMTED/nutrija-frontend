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
            className="relative w-full max-w-xs 2xl:min-w-100 mx-auto"
            style={{
                perspective: "51rem",
                height: isLoginMode ? "22rem" : "31rem",
            }}
        >
            <input
                type="checkbox"
                id="auth-mode-toggle"
                className="hidden"
                checked={!isLoginMode}
                onChange={toggleMode}
            />

            {/* Login  */}
            <div className="log-in-container absolute inset-0 w-full bg-white text-nutri-gray p-4 rounded-lg shadow-lg border border-nutri-green/30 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-base 2xl:text-xl font-bold">Login</h2>
                    <label
                        htmlFor="auth-mode-toggle"
                        className="text-xs 2xl:text-sm text-nutri-green underline cursor-pointer hover:text-nutri-green-dark"
                    >
                        Não tem uma conta?
                    </label>
                </div>

                <form
                    onSubmit={login}
                    className="flex flex-col"
                >
                    <div>
                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm text-nutri-gray pl-1 mb-1 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="usuario"
                                placeholder="seu@email.com"
                                className="w-full bg-gray-100 placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioLogin.usuario}
                                onChange={atualizarEstadoLogin}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm  text-nutri-gray pl-1 mb-1 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="••••••••"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioLogin.senha}
                                onChange={atualizarEstadoLogin}
                                required
                            />
                        </div>

                        <Link
                            to="/recuperar-senha"
                            className="text-xs 2xl:text-sm text-nutri-green hover:text-nutri-green-dark underline ml-auto mb-3 block text-right"
                        >
                            Esqueceu sua senha?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="bg-nutri-green hover:bg-nutri-green-dark disabled:bg-nutri-green-light text-white py-2 rounded text-sm 2xl:text-base font-medium"
                        disabled={isLoadingLogin}
                    >
                        {isLoadingLogin ? (
                            <div className="flex justify-center">
                                <ClipLoader
                                    color="#ffffff"
                                    size={18}
                                />
                            </div>
                        ) : (
                            "Confirmar"
                        )}
                    </button>
                </form>
            </div>

            {/* Cadastro  */}
            <div className="sign-up-container absolute inset-0 w-full bg-white text-nutri-gray p-4 rounded-lg shadow-lg border border-nutri-green/30 flex flex-col">
                <div className="flex justify-between items-center ">
                    <h2 className="text-base font-bold">Cadastrar</h2>
                    <label
                        htmlFor="auth-mode-toggle"
                        className="text-xs 2xl:text-sm text-nutri-green underline cursor-pointer hover:text-nutri-green-dark"
                    >
                        Já tem uma conta?
                    </label>
                </div>

                <form
                    onSubmit={cadastrarNovoUsuario}
                    className="flex flex-col flex-1"
                >
                    {" "}
                    {/* ✅ flex-1 aqui */}
                    <div className="mb-5 overflow-y-auto">
                        {" "}
                        {/* ✅ Container scrollável */}
                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm text-nutri-gray pl-1 mb-1 block">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioCadastro.nome}
                                onChange={atualizarEstadoCadastro}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm text-nutri-gray pl-1 mb-1 block">
                                Usuário
                            </label>
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Seu usuário"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm  2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioCadastro.usuario}
                                onChange={atualizarEstadoCadastro}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm text-nutri-gray pl-1 mb-1 block">
                                Foto (URL)
                            </label>
                            <input
                                type="text"
                                name="foto"
                                placeholder="https://exemplo.com/foto.jpg"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioCadastro.foto}
                                onChange={atualizarEstadoCadastro}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-xs 2xl:text-sm text-nutri-gray pl-1 mb-1 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="••••••••"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={usuarioCadastro.senha}
                                onChange={atualizarEstadoCadastro}
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-xs text-nutri-gray pl-1 mb-1 block">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                placeholder="••••••••"
                                className="w-full bg-gray-100 text-nutri-gray placeholder-gray-500 border-b-2 rounded-t px-3 py-2 text-sm 2xl:text-base border-0 focus:border-nutri-green focus:outline-none"
                                value={confirmarSenha}
                                onChange={handleConfirmarSenha}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-nutri-gray py-2 rounded text-sm 2xl:text-base font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-nutri-green hover:bg-nutri-green-dark disabled:bg-nutri-green-light text-white py-2 rounded text-sm 2xl:text-base font-medium"
                            disabled={isLoadingCadastro}
                        >
                            {isLoadingCadastro ? (
                                <div className="flex justify-center">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                    />
                                </div>
                            ) : (
                                "Cadastrar"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
        .sign-up-container, .log-in-container { backface-visibility: hidden; transform-style: preserve-3d; }
        .sign-up-container { animation: flipOut 0.5s linear forwards; }
        .log-in-container { animation: flipIn 0.5s linear forwards; }
        #auth-mode-toggle:checked ~ .sign-up-container { animation: flipIn 0.5s linear forwards; }
        #auth-mode-toggle:checked ~ .log-in-container { animation: flipOut 0.5s linear forwards; }
        @keyframes flipIn { 0% { transform: rotateY(-90deg); z-index: 1; } 50% { transform: rotateY(-90deg); z-index: 1; } 100% { transform: rotateY(0deg); z-index: 2; } }
        @keyframes flipOut { 0% { transform: rotateY(0deg); z-index: 2; } 50% { transform: rotateY(90deg); z-index: 2; } 100% { transform: rotateY(90deg); z-index: 1; } }
      `}</style>
        </div>
    );
}
