import {
    Basket,
    Clock,
    CookingPot,
    Heart,
    Leaf,
    Lightbulb,
    Truck,
} from "@phosphor-icons/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {Carrossel} from "../../components/carrossel/Carrossel"

// URLs de imagens de exemplo (substitua pelas suas)
const heroImages = [
    "https://ik.imagekit.io/yljuedpj1/Group%2054.png",
    "https://ik.imagekit.io/yljuedpj1/Group%2052.png",
    "https://ik.imagekit.io/yljuedpj1/Group%2053%20(1).png",
    // Adicione mais URLs de imagens aqui
    // "https://exemplo.com/imagem2.jpg",
    // "https://exemplo.com/imagem3.jpg",
];
// CORRIGIDO: URL da missão é um vídeo .mp4
const missionVideoURL = "https://i.imgur.com/GPXOB2Z.mp4";

const Inicio = () => {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);

    return (
        <main className="w-full min-h-screen xl:min-h-[90vh] relative overflow-hidden">
            {/* Background Decorativo */}
            <div className="absolute inset-0 bg-linear-to-br from-primary-50 via-lime-50/40 to-earth-100/20 -z-10" />

            {/* Pattern Orgânico */}
            <div className="absolute inset-0 pattern-dots -z-10" />
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-nutri-green-light/30 to-transparent blur-3xl -z-10" />

            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28 space-y-20">
                {/* Seção 1: Hero / Conteúdo Principal (Cores mapeadas) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Coluna esquerda - Hero e CTA */}
                    <div
                        className="flex flex-col gap-8 animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <div className="space-y-4">
                            {/* Ajustado para um tamanho de fonte explícito (assumindo 5xl para o hero) */}
                            <h1 className="text-5xl font-extrabold text-nutri-gray leading-tight">
                                Mais que refeições,{" "}
                                <span className="text-nutri-green-dark relative inline-block">
                                    entregamos equilíbrio
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        height="8"
                                        viewBox="0 0 200 8"
                                    >
                                        <path
                                            d="M0,4 Q50,0 100,4 T200,4"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            className="text-nutri-green-light"
                                        />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                Porque cuidar de si{" "}
                                <span className="font-bold text-nutri-green-dark">
                                    também é um tipo de fome.
                                </span>
                            </p>
                        </div>

                        {/* Cards de Benefícios (Cores mapeadas) */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-nutri-green-light  p-4  sm:p-6  md:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                {/* Benefício 1 */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-nutri-green to-nutri-green-dark flex items-center justify-center shadow-lg shadow-nutri-green-light group-hover:scale-110 transition-transform shrink-0">
                                        <Clock
                                            size={24}
                                            weight="bold"
                                            className="text-white"
                                        />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-nutri-gray">
                                            Delivery em
                                        </span>
                                        <span className="text-sm font-bold text-nutri-green-dark">
                                            30 minutos
                                        </span>
                                    </div>
                                </div>

                                {/* Benefício 2 */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform shrink-0">
                                        <Truck
                                            size={24}
                                            weight="bold"
                                            className="text-nutri-gray"
                                        />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-nutri-gray">
                                            Frete grátis
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            acima de R$50
                                        </span>
                                    </div>
                                </div>

                                {/* Benefício 3 */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group sm:col-span-3 md:col-span-1">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12  rounded-xl bg-linear-to-br from-nutri-green to-nutri-green-dark flex items-center justify-center shadow-lg shadow-nutri-green-light/30 group-hover:scale-110 transition-transform shrink-0">
                                        <Basket
                                            size={24}
                                            weight="bold"
                                            className="text-white"
                                        />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-nutri-gray">
                                            Alimentos
                                        </span>
                                        <span className="text-sm font-bold text-nutri-green">
                                            frescos & saudáveis
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button (Cores mapeadas) */}
                        <div className="flex gap-3 sm:flex-row  sm:gap-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 sm:flex-initial px-8 py-4 bg-linear-to-br from-nutri-green-dark to-nutri-green text-white font-bold rounded-xl shadow-lg shadow-nutri-green-light hover:shadow-xl hover:shadow-nutri-green hover:scale-105 active:scale-95 transition-all text-xs md:text-lg "
                            >
                                Começar agora
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 sm:flex-initial px-8 py-4 bg-white text-nutri-green-dark font-bold rounded-xl shadow-lg border-2 border-nutri-green-light hover:border-nutri-green hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm md:text-lg"
                            >
                                Saiba mais
                            </button>
                        </div>
                    </div>

                 {/* Coluna direita - Carrossel de Imagens Hero */}
<div className="relative pb-12">
    <div className="absolute -inset-4 ... -z-10" />
    
    {/* Carrossel */}
    <div className="relative">
        <Carrossel images={heroImages} autoplayDelay={4000} />
    </div>

    <div className="hidden lg:block absolute -bottom-6 ... z-20"></div>
                        <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 border border-nutri-green-light animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg--to-br from-nutri-green to-nutri-green-dark flex items-center justify-center">
                                    <span className="text-2xl">🥗</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nutri-gray">
                                        +1.000 pedidos
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        entregues hoje
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção 2: Missão (CORRIGIDO: h1 -> h2) */}
                <section className="text-center py-12 md:py-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-nutri-gray leading-tight">
                        Nossa{" "}
                        <span className="text-nutri-green-dark">Missão</span> é
                        o Seu{" "}
                        <span className="text-nutri-green-dark">Bem-Estar</span>
                    </h2>
                    <p className="text-md md:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Acreditamos que uma vida saudável começa com a
                        alimentação, e estamos aqui para torná-la fácil e
                        saborosa.
                    </p>
                </section>

                {/* Seção 3: História e VÍDEO (CORRIGIDO: <img> -> <video>) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 space-y-6">
                        <h2 className="text-3xl font-bold text-nutri-gray">
                            O Começo de uma{" "}
                            <span className="text-nutri-green-dark">
                                Revolução Saudável
                            </span>
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            A NutriJá nasceu do desejo de simplificar a
                            alimentação saudável em um mundo corrido. Percebemos
                            que muitas pessoas lutam para manter uma dieta
                            balanceada devido à falta de tempo. Nossa resposta?
                            Refeições frescas, nutritivas e prontas para o
                            consumo, preparadas com ingredientes locais e muito
                            carinho.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            Não vendemos apenas comida; entregamos tempo, saúde
                            e a tranquilidade de saber que você está nutrindo
                            seu corpo da melhor forma possível, sem abrir mão do
                            sabor.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        {/* Renderiza o vídeo da missão */}
                        <video
                            src={missionVideoURL}
                            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-nutri-green-light object-cover aspect-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            Seu navegador não suporta a reprodução de vídeo.
                        </video>
                    </div>
                </section>

                {/* Seção 4: Valores (Cores mapeadas) */}
                <section className="space-y-10">
                    <h2 className="text-3xl font-bold text-center text-nutri-gray">
                        Pilares que nos{" "}
                        <span className="text-nutri-green-dark">Movem</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 transition-transform hover:scale-[1.03]">
                            <Heart
                                size={32}
                                weight="fill"
                                className="text-nutri-green-dark"
                            />
                            <h3 className="text-xl font-bold text-nutri-gray">
                                Nutrição de Verdade
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Priorizamos a qualidade e a densidade
                                nutricional. Nossas receitas são elaboradas por
                                nutricionistas para maximizar o seu bem-estar.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 transition-transform hover:scale-[1.03]">
                            <Leaf
                                size={32}
                                weight="fill"
                                className="text-nutri-green-dark"
                            />
                            <h3 className="text-xl font-bold text-nutri-gray">
                                Sustentabilidade
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Comprometimento com o planeta, utilizando
                                embalagens ecológicas e priorizando fornecedores
                                locais para reduzir nossa pegada de carbono.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 transition-transform hover:scale-[1.03]">
                            <CookingPot
                                size={32}
                                weight="fill"
                                className="text-nutri-green-dark"
                            />
                            <h3 className="text-xl font-bold text-nutri-gray">
                                Sabor e Praticidade
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Entregamos o máximo de sabor com a máxima
                                praticidade. Refeições que são um prazer,
                                prontas em minutos.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Seção 5: CTA Secundário (Cores mapeadas) */}
                <section className="p-8 md:p-10 bg-nutri-green-light/50 rounded-2xl shadow-xl border border-nutri-green-light text-center space-y-4">
                    <Lightbulb
                        size={36}
                        weight="fill"
                        className="text-nutri-green-dark mx-auto"
                    />
                    <h3 className="text-2xl font-bold text-nutri-gray">
                        Pronto para Mudar Seus Hábitos?
                    </h3>
                    <p className="text-gray-700">
                        Junte-se à comunidade NutriJá e comece a desfrutar de
                        uma alimentação que te apoia em todos os seus objetivos.
                    </p>
                    <a
                        href="/home"
                        className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-nutri-green-dark text-white font-bold rounded-full shadow-lg hover:bg-nutri-green transition-colors"
                    >
                        Ver Cardápio
                        <Truck
                            size={20}
                            weight="fill"
                        />
                    </a>
                </section>
            </div>

            <style>{`
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-float { animation: float 3s ease-in-out infinite; }
            `}</style>
        </main>
    );
};

export default Inicio;
