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
import type UsuarioLogin from "../../models/UsuarioLogin";

export default function Login() {
    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }
    return (
        <>
            <main>
                <form
                    className=""
                    onSubmit={login}
                >
                    <h2 className="">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarEstado(e)
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded flex justify-center
                                    w-1/2 py-2"
                    >
                        {isLoading ? (
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />
                        ) : (
                            <span>Entrar</span>
                        )}
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{" "}
                        <Link to="/cadastro">Cadastre-se</Link>
                    </p>
                </form>
            </main>
            ;
        </>
    );
}
