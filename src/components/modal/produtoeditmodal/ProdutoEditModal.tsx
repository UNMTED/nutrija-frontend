import { PencilSimple } from "@phosphor-icons/react";
import {
    useCallback,
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Categoria } from "../../../models/Categoria";
import type { Produto } from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ProdutoEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    produto: Produto | null; // se null => modo "criar"
    onUpdate: () => void; // chamado após sucesso (create ou update)
}

export default function ProdutoEditModal({
    isOpen,
    onClose,
    produto,
    onUpdate,
}: ProdutoEditModalProps) {
    const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // inicializa/limpa estado quando modal abre/fecha ou produto muda
    useEffect(() => {
        if (isOpen) {
            if (produto) {
                setProdutoEmEdicao({ ...produto });
            } else {
                // default para criação
                setProdutoEmEdicao({
                    id: 0,
                    nome: "",
                    foto: "",
                    preco: 0,
                    quantidade: 0,
                    descricao: "",
                    categoria: undefined as any,
                    usuario: { id: usuario.id } as any, // ajuste conforme seu modelo
                } as Produto);
            }
        } else {
            setProdutoEmEdicao(null);
        }
    }, [isOpen, produto, usuario.id]);

    // busca categorias quando modal abre
    useEffect(() => {
        if (!isOpen) return;
        let mounted = true;
        (async () => {
            try {
                await buscar(
                    "/categorias",
                    (data: Categoria[]) => {
                        if (mounted) setCategorias(data);
                    },
                    {
                        headers: { Authorization: token },
                    }
                );
            } catch (err: any) {
                // buscar já trata logout em outros lugares; aqui só log
                console.error(err);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [isOpen, token]);

    // handlers de mudança
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProdutoEmEdicao((prev) =>
            prev ? { ...prev, [name]: value } : prev
        );
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = parseFloat(String(value).replace(",", "."));
        setProdutoEmEdicao((prev) =>
            prev
                ? {
                      ...prev,
                      [name]: isNaN(numberValue) ? (value as any) : numberValue,
                  }
                : prev
        );
    };

    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value) || null;
        setProdutoEmEdicao((prev) =>
            prev ? { ...prev, categoria: id ? ({ id } as any) : null } : prev
        );
    };

    // esse useCallback dá erro se ficar lá pra baixo
    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!produtoEmEdicao) return;
            setIsLoading(true);

            try {
                const payload = {
                    ...produtoEmEdicao,
                    preco: Number(
                        String(produtoEmEdicao.preco).replace(",", ".")
                    ),
                    categoria: produtoEmEdicao.categoria
                        ? { id: produtoEmEdicao.categoria.id }
                        : null,
                    usuario: produtoEmEdicao.usuario ?? { id: usuario.id },
                };

                if (produto && produto.id) {
                    // edição
                    await atualizar(`/produtos`, payload, setProdutoEmEdicao, {
                        headers: { Authorization: token },
                    });
                    ToastAlerta("Produto atualizado com sucesso!", "sucesso");
                } else {
                    // criação
                    await cadastrar(`/produtos`, payload, () => {}, {
                        headers: { Authorization: token },
                    });
                    ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
                }

                onUpdate();
                onClose();
            } catch (error: any) {
                ToastAlerta("Erro ao salvar o produto!", "erro");
                if (error.toString().includes("401")) handleLogout();
            } finally {
                setIsLoading(false);
            }
        },
        [
            produtoEmEdicao,
            produto,
            token,
            usuario.id,
            onUpdate,
            onClose,
            handleLogout,
        ]
    );

    if (!isOpen) return null;

    if (!produtoEmEdicao)
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
                <ClipLoader
                    color="#29a114"
                    size={50}
                />
            </div>
        );

    const isEditMode = !!(produto && produto.id);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100 rounded-2xl shadow-2xl border border-nutri-green-light"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-nutri-green-dark inline-flex items-center gap-2">
                        <PencilSimple
                            size={24}
                            weight="fill"
                        />
                        {isEditMode
                            ? `Editar Produto: ${produtoEmEdicao.nome}`
                            : "Cadastrar Produto"}
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

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                >
                    <div>
                        <label
                            htmlFor="nome"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={produtoEmEdicao.nome ?? ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="foto"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Foto (URL)
                        </label>
                        <input
                            type="url"
                            id="foto"
                            name="foto"
                            value={produtoEmEdicao.foto ?? ""}
                            onChange={handleChange}
                            placeholder="URL da imagem"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                        />
                        {produtoEmEdicao.foto && (
                            <img
                                src={produtoEmEdicao.foto}
                                alt="Pré-visualização"
                                className="mt-2 w-full max-h-32 object-contain rounded-lg border border-gray-200"
                            />
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="preco"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Preço (R$)
                        </label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={produtoEmEdicao.preco ?? 0}
                            onChange={handleNumberChange}
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="quantidade"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Quantidade em Estoque
                        </label>
                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={produtoEmEdicao.quantidade ?? 0}
                            onChange={handleNumberChange}
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="categoria"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Categoria
                        </label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={produtoEmEdicao.categoria?.id ?? ""}
                            onChange={handleCategoriaChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none bg-white"
                            required
                        >
                            <option value="">Selecione a categoria</option>
                            {categorias.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="descricao"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows={4}
                            value={produtoEmEdicao.descricao ?? ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-nutri-green focus:border-nutri-green-dark outline-none resize-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-nutri-green-dark text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                    />
                                    Salvando...
                                </div>
                            ) : isEditMode ? (
                                "Salvar Alterações"
                            ) : (
                                "Cadastrar Produto"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
