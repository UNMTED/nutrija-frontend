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

// --- shadcn/ui ---
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ProdutoEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    produto: Produto | null;
    onUpdate: () => void;
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

    // inicializa estado quando abre o modal
    useEffect(() => {
        if (isOpen) {
            if (produto) {
                setProdutoEmEdicao({ ...produto });
            } else {
                setProdutoEmEdicao({
                    id: 0,
                    nome: "",
                    foto: "",
                    preco: 0,
                    quantidade: 0,
                    descricao: "",
                    categoria: undefined as any,
                    usuario: { id: usuario.id } as any,
                });
            }
        } else {
            setProdutoEmEdicao(null);
        }
    }, [isOpen, produto, usuario.id]);

    // Carregar categorias
    useEffect(() => {
        if (!isOpen) return;
        let mounted = true;

        (async () => {
            try {
                await buscar(
                    "/categorias",
                    (data: Categoria[]) => mounted && setCategorias(data),
                    { headers: { Authorization: token } }
                );
            } catch (err) {
                console.error(err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [isOpen, token]);

    // Handlers

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
                ? { ...prev, [name]: isNaN(numberValue) ? value : numberValue }
                : prev
        );
    };

    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value) || null;
        setProdutoEmEdicao((prev) =>
            prev ? { ...prev, categoria: id ? ({ id } as any) : null } : prev
        );
    };

    // salvar
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
                    await atualizar(`/produtos`, payload, setProdutoEmEdicao, {
                        headers: { Authorization: token },
                    });
                    ToastAlerta("Produto atualizado com sucesso!", "sucesso");
                } else {
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

    const isEditMode = !!(produto && produto.id);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-nutri-green-dark">
                        <PencilSimple
                            size={24}
                            weight="fill"
                        />
                        {isEditMode
                            ? `Editar Produto: ${produtoEmEdicao?.nome}`
                            : "Cadastrar Produto"}
                    </DialogTitle>

                    <DialogDescription>
                        Preencha os campos abaixo para salvar o produto.
                    </DialogDescription>
                </DialogHeader>

                {!produtoEmEdicao ? (
                    <div className="w-full flex items-center justify-center py-10">
                        <ClipLoader
                            color="#29a114"
                            size={50}
                        />
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 pt-4"
                    >
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={produtoEmEdicao.nome}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-nutri-green"
                            />
                        </div>

                        {/* Foto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Foto (URL)
                            </label>
                            <input
                                type="url"
                                name="foto"
                                value={produtoEmEdicao.foto ?? ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {produtoEmEdicao.foto && (
                                <img
                                    src={produtoEmEdicao.foto}
                                    alt="Preview"
                                    className="mt-2 w-full max-h-32 object-contain border rounded-lg"
                                />
                            )}
                        </div>

                        {/* Preço */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                name="preco"
                                step="0.01"
                                min="0"
                                value={produtoEmEdicao.preco}
                                onChange={handleNumberChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Quantidade */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantidade em estoque
                            </label>
                            <input
                                type="number"
                                name="quantidade"
                                min="0"
                                value={produtoEmEdicao.quantidade}
                                onChange={handleNumberChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoria
                            </label>
                            <select
                                value={produtoEmEdicao.categoria?.id ?? ""}
                                onChange={handleCategoriaChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg bg-white"
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

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                rows={4}
                                value={produtoEmEdicao.descricao}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg resize-none"
                            />
                        </div>

                        {/* FOOTER */}
                        <DialogFooter className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="py-2 px-4 bg-nutri-green-dark text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
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
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
