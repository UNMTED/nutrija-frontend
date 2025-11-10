import type { Produto } from "./Produto";

export interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    produto?: Produto[] | null;
}
