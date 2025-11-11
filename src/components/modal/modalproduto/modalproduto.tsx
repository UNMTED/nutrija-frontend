import React from "react";
import { type Produto } from "../../../models/Produto";

interface DetalhesProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: Produto | null;
}

const DetalhesProdutoModal: React.FC<DetalhesProdutoModalProps> = ({
  isOpen,
  onClose,
  produto,
}) => {
  if (!isOpen || !produto) return null;

  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Detalhes: {produto.nome}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors text-3xl ml-4"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="md:col-span-1 flex justify-center items-center bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={produto.foto || ""}
              alt={`Foto do produto ${produto.nome}`}
              className="w-full h-auto object-cover max-h-96 rounded-xl transition duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="md:col-span-1 space-y-5">
            <div className="flex justify-between items-end pb-3 border-b border-gray-100">
              <p className="text-4xl font-black text-green-600">
                {precoFormatado}
              </p>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  produto.quantidade > 0
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Estoque: {produto.quantidade}{" "}
                {produto.quantidade > 0 ? "✅" : "🚫"}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                Descrição
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {produto.descricao || "Nenhuma descrição disponível."}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-500">Categoria</h4>
                <p className="text-gray-800 font-medium">
                  {produto.categoria?.nome || "Não categorizado"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-500">
                  Cadastrado por
                </h4>
                <p className="text-gray-800 font-medium">
                  {produto.usuario?.nome || "Usuário Desconhecido"}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                className="w-full py-3 px-6 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-[1.01]"
                onClick={() =>
                  console.log(`Produto ${produto.nome} selecionado!`)
                }
                disabled={produto.quantidade <= 0}
              >
                {produto.quantidade > 0
                  ? "🛒 Adicionar ao Carrinho"
                  : "❌ Produto Indisponível"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProdutoModal;
