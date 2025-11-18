/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext, useState } from "react";
import type { Produto } from "../models/Produto";

interface FavoritosContextProps {
    produtosFavoritos: Produto[];
    adicionarAosFavoritos: (produto: Produto) => void;
    removerDosFavoritos: (produtoId: number) => void;
    verificarSeFavorito: (produtoId: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContextProps | undefined>(
    undefined
);

interface FavoritosProviderProps {
    children: ReactNode;
}

export function FavoritosProvider({ children }: FavoritosProviderProps) {
    const [produtosFavoritos, setProdutosFavoritos] = useState<Produto[]>([]);

    function adicionarAosFavoritos(produto: Produto) {
        setProdutosFavoritos((prevFavoritos) => {
            const jaExiste = prevFavoritos.some((fav) => fav.id === produto.id);

            if (jaExiste) {
                // Se já existe, remove (toggle)
                return prevFavoritos.filter((fav) => fav.id !== produto.id);
            }

            // Se não existe, adiciona
            return [...prevFavoritos, produto];
        });
    }

    function removerDosFavoritos(produtoId: number) {
        setProdutosFavoritos((prevFavoritos) =>
            prevFavoritos.filter((fav) => fav.id !== produtoId)
        );
    }

    function verificarSeFavorito(produtoId: number): boolean {
        return produtosFavoritos.some((fav) => fav.id === produtoId);
    }

    return (
        <FavoritosContext.Provider
            value={{
                produtosFavoritos,
                adicionarAosFavoritos,
                removerDosFavoritos,
                verificarSeFavorito,
            }}
        >
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    const context = useContext(FavoritosContext);
    if (!context) {
        throw new Error(
            "useFavoritos deve ser usado dentro de FavoritosProvider"
        );
    }
    return context;
}
