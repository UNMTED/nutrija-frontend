/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, type ReactNode, useEffect, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    atualizarUsuarioContext(usuario: UsuarioLogin): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

const defaultUsuario: UsuarioLogin = {
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    role: "",
    token: "",
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        try {
            const raw = localStorage.getItem("usuario");
            return raw ? (JSON.parse(raw) as UsuarioLogin) : defaultUsuario;
        } catch {
            return defaultUsuario;
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    function atualizarUsuarioContext(novoUsuario: UsuarioLogin) {
        setUsuario(novoUsuario);
    }

    useEffect(() => {
        try {
            if (usuario && usuario.token) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
            } else {
                localStorage.removeItem("usuario");
            }
        } catch {
            console.error("erro");
        }
    }, [usuario]);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario(defaultUsuario);
        localStorage.removeItem("usuario");
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLogout,
                isLoading,
                atualizarUsuarioContext,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
