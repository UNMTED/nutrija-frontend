import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus, ShoppingBag } from "@phosphor-icons/react";
import type { Produto } from "../../models/Produto";

interface CartItem extends Produto {
    quantidadeCarrinho: number;
}

interface CarrinhoModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
    items: CartItem[];
    onRemove: (produtoId: number) => void;
    onUpdateQuantidade: (produtoId: number, quantidade: number) => void;
    onCheckout: () => void;
}

const CarrinhoModal = ({
    open,
    onClose,
    items,
    onUpdateQuantidade,
    onCheckout,
}: CarrinhoModalProps) => {
    const subtotal = items.reduce(
        (acc, item) => acc + Number(item.preco) * item.quantidadeCarrinho,
        0
    );
    const taxa = subtotal >= 50 ? 0 : subtotal * 0.1;
    const total = subtotal + taxa;
    const estaVazio = items.length === 0;

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-[85vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="border-b border-neutral-100 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 shrink-0 bg-linear-to-br from-primary-50 via-lime-50/50 to-earth-100/30">
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 flex items-center gap-2">
                            Carrinho de Compras
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                        {items.length === 0
                            ? "Seu carrinho está vazio"
                            : `${items.length} ${
                                  items.length === 1 ? "produto" : "produtos"
                              } adicionados`}
                    </p>
                </div>

                {/* Conteúdo */}
                <div className="overflow-y-auto flex-1 scrollbar-thin">
                    {estaVazio ? (
                        <div className="flex items-center justify-center h-full min-h-64">
                            <div className="text-center px-4 py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-100 mb-4">
                                    <ShoppingBag
                                        size={32}
                                        weight="bold"
                                        className="text-neutral-400 sm:size-40"
                                    />
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 mb-2">
                                    Carrinho Vazio
                                </h3>
                                <p className="text-xs sm:text-sm text-neutral-600">
                                    Comece a adicionar produtos para ver aqui!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-100 p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex xs:flex-row gap-3 sm:gap-4 py-3 sm:py-4 hover:bg-neutral-50/50 rounded-lg transition-colors duration-200 px-2 sm:px-3"
                                >
                                    {/* Imagem */}
                                    <div className="shrink-0">
                                        <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-primary-100 bg-linear-to-br from-primary-50 via-lime-50/50 to-earth-100/30">
                                            <img
                                                src={item.foto || ""}
                                                alt={item.nome}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Informações */}
                                    <div className="flex justify-between w-full items-start">
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-1 sm:space-y-2">
                                                <h4 className="text-xs sm:text-sm md:text-base font-bold text-neutral-800 line-clamp-2">
                                                    {item.nome}
                                                </h4>
                                                {item.categoria && (
                                                    <p className="text-xs text-neutral-500">
                                                        {item.categoria.nome}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 mt-2">
                                                {/* Preço */}
                                                <div className="flex items-baseline gap-0.5 sm:gap-1">
                                                    <span className="text-xs sm:text-sm text-neutral-400">
                                                        R$
                                                    </span>
                                                    <span className="text-lg xs:text-xl sm:text-2xl font-black text-primary-600">
                                                        {
                                                            Number(item.preco)
                                                                .toFixed(2)
                                                                .split(".")[0]
                                                        }
                                                    </span>
                                                    <span className="text-sm xs:text-base text-neutral-400">
                                                        ,
                                                        {
                                                            Number(item.preco)
                                                                .toFixed(2)
                                                                .split(".")[1]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Controle de Quantidade */}
                                        <div className="flex items-center gap-1 sm:gap-2  rounded-lg p-1">
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantidade(
                                                        item.id,
                                                        item.quantidadeCarrinho -
                                                            1
                                                    )
                                                }
                                                className="p-1 sm:p-1.5 border hover:border-nutri-green-dark hover:text-nutri-green-dark  rounded-lg transition-colors duration-200"
                                            >
                                                <Minus size={32} />
                                            </button>
                                            <span className="w-6 sm:w-8 text-center  font-bold text-neutral-800">
                                                {item.quantidadeCarrinho}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    onUpdateQuantidade(
                                                        item.id,
                                                        item.quantidadeCarrinho +
                                                            1
                                                    )
                                                }
                                                className="p-1 sm:p-1.5 border hover:border-nutri-green-dark hover:text-nutri-green-dark  rounded-lg transition-colors duration-200"
                                            >
                                                <Plus size={32} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer com Resumo */}
                {!estaVazio && (
                    <div className="border-t border-neutral-100 bg-linear-to-br from-primary-50 via-lime-50/50 to-earth-100/30 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 space-y-3 sm:space-y-4 shrink-0">
                        {/* Resumo de Preços */}
                        <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                            <div className="flex justify-between text-neutral-600">
                                <span>Subtotal:</span>
                                <span>
                                    R${" "}
                                    {subtotal
                                        .toFixed(2)
                                        .replace(".", ",")
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Taxa de Entrega (10%):</span>
                                {subtotal <= 50 ? (
                                    <span>
                                        R${" "}
                                        {taxa
                                            .toFixed(2)
                                            .replace(".", ",")
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                            )}
                                    </span>
                                ) : (
                                    <span>Entrega grátis</span>
                                )}
                            </div>
                            <div className="flex justify-between pt-2 sm:pt-2.5 border-t border-neutral-200 font-bold text-neutral-800 text-sm sm:text-base md:text-lg">
                                <span>Total:</span>
                                <span className="text-primary-600">
                                    R${" "}
                                    {total
                                        .toFixed(2)
                                        .replace(".", ",")
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </span>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3">
                            <button
                                onClick={() => onClose(false)}
                                className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-bold text-neutral-800 bg-neutral-200 hover:bg-neutral-300 transition-colors duration-300"
                            >
                                Continuar Comprando
                            </button>
                            <button
                                onClick={onCheckout}
                                className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-bold text-white bg-linear-to-br from-primary-500 to-primary-600 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>Finalizar Compra</span>
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CarrinhoModal;
