import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { type Produto } from "../../../models/Produto";

interface ProdutoModalProps {
    isOpen: boolean;
    onClose: () => void;
    produto: Produto | null;
}

export default function ProdutoModal({
    isOpen,
    onClose,
    produto,
}: ProdutoModalProps) {
    if (!produto) return null;

    const precoFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(produto.preco);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                {/* Cabeçalho */}
                <DialogHeader className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <DialogTitle className="text-3xl font-extrabold text-nutri-gray leading-tight">
                        Detalhes: {produto.nome}
                    </DialogTitle>
                </DialogHeader>

                {/* Conteúdo */}
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Foto */}
                    <div className="md:col-span-1 flex justify-center items-center bg-gray-50 rounded-xl overflow-hidden">
                        <img
                            src={produto.foto || ""}
                            alt={`Foto do produto ${produto.nome}`}
                            className="w-full h-auto object-cover max-h-96 rounded-xl transition duration-300 hover:scale-[1.03]"
                        />
                    </div>

                    {/* Informações */}
                    <div className="md:col-span-1 space-y-5">
                        {/* Preço + Estoque */}
                        <div className="flex justify-between items-end pb-3 border-b border-gray-100">
                            <p className="text-4xl font-black text-green-600">
                                {precoFormatado}
                            </p>
                        </div>

                        {/* Descrição */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">
                                Descrição
                            </h3>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {produto.descricao ||
                                    "Nenhuma descrição disponível."}
                            </p>
                        </div>

                        {/* Categoria + Usuário */}
                        <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-700">
                                    Categoria
                                </h4>
                                <p className="text-gray-800 font-medium">
                                    {produto.categoria?.nome ||
                                        "Não categorizado"}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-700">
                                    Cadastrado por
                                </h4>
                                <p className="text-gray-800 font-medium">
                                    {produto.usuario?.nome ||
                                        "Usuário Desconhecido"}
                                </p>
                            </div>
                        </div>

                        {/* Botão */}
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() =>
                                    console.log(
                                        `Produto ${produto.nome} selecionado!`
                                    )
                                }
                                disabled={produto.quantidade <= 0}
                                className="select-none rounded-lg bg-nutri-green-dark w-full py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
                            >
                                {produto.quantidade > 0
                                    ? "🛒 Adicionar ao Carrinho"
                                    : "❌ Produto Indisponível"}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
