import type { Categoria } from "./Categoria";
import type { Usuario } from "./Usuario";

export interface Produto {
    id: number;
    preco: number;
    nome: string;
    descricao: string;
    quantidade: number;
    categoria: Categoria | null;
    usuario: Usuario | null;
}
