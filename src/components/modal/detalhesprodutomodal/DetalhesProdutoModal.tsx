import { type Produto } from "../../../models/Produto";

interface DetalhesProdutoModalProps {
  produto: Produto;
  add: () => void;
}

const DetalhesProdutoModal = ({ produto, add }: DetalhesProdutoModalProps) => {
  return (
    <div
      className="rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100 sm:max-h-[90vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start p-4 sm:p-6 border-b border-gray-100 sticky top-0 z-1 bg-white">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-extrabold text-nutri-green-dark leading-tight pr-2 line-clamp-2">
          {produto.nome}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-8">
          <div className="flex justify-center items-center bg-nutri-green-light rounded-xl overflow-hidden h-48 sm:h-64 lg:h-auto lg:max-h-96">
            <img
              src={produto.foto || ""}
              alt={`Foto do produto ${produto.nome}`}
              className="w-full h-full object-contain rounded-xl transition duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="space-y-4 sm:space-y-5 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-3 border-b border-gray-100">
              <p className="text-3xl sm:text-4xl font-black text-green-600">
                R$
                {Number(produto.preco).toFixed(2).toString().replace(".", ",")}
              </p>
              <span
                className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                  produto.quantidade > 0
                    ? "bg-nutri-green-light text-nutri-green-dark"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Estoque: {produto.quantidade}{" "}
                {produto.quantidade > 0 ? "✅" : "🚫"}
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-nutri-green-dark mb-2">
                Descrição
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
                {produto.descricao || "Nenhuma descrição disponível."}
              </p>
            </div>

            <div className="pt-2 sm:pt-4 mt-auto">
              <button
                className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-nutri-green-dark text-white text-base sm:text-lg font-bold rounded-xl hover:bg-green-700 cursor-pointer transition duration-300 ease-in-out shadow-lg transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={add}
                disabled={produto.quantidade <= 0}
              >
                {produto.quantidade > 0
                  ? " Adicionar ao Carrinho"
                  : " Produto Indisponível"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProdutoModal;
