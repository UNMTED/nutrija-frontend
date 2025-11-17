import { useContext, useEffect } from "react";
import { Clock, Package, Truck } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const heroImageURL =
    "https://ik.imagekit.io/yljuedpj1/Imagem%20Tela%20Apresenta%C3%A7%C3%A3o.png?updatedAt=1762805133474";

const Inicio = () => {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);

    return (
        <main className="w-full relative overflow-hidden">
            {/* Background Decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-lime-50/40 to-earth-100/20 -z-10" />
            
            {/* Pattern Orgânico */}
            <div className="absolute inset-0 pattern-dots -z-10" />

            {/* Gradiente Radial */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-200/30 to-transparent blur-3xl -z-10" />

            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Coluna Esquerda - Conteúdo */}
                    <div 
                        className="flex flex-col gap-8 animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        {/* Hero Title */}
                        <div className="space-y-4">
                            <h1 className="heading-hero text-neutral-800 leading-tight">
                                Mais que refeições,{" "}
                                <span className="text-primary-600 relative inline-block">
                                    entregamos equilíbrio
                                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                                        <path d="M0,4 Q50,0 100,4 T200,4" stroke="currentColor" strokeWidth="3" fill="none" className="text-primary-300"/>
                                    </svg>
                                </span>
                            </h1>
                            
                            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                                Porque cuidar de si
                                <span className="font-bold text-primary-600"> também é um tipo de fome.</span>
                            </p>
                        </div>

                        {/* Cards de Benefícios */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-100 p-6 md:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Benefício 1 */}
                                <div 
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group"
                                    style={{
                                        animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                        animationDelay: '0.2s',
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform shrink-0">
                                        <Clock size={24} weight="bold" className="text-white" />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-neutral-800">Delivery em</span>
                                        <span className="text-sm font-bold text-primary-600">30 minutos</span>
                                    </div>
                                </div>

                                {/* Benefício 2 */}
                                <div 
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group"
                                    style={{
                                        animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                        animationDelay: '0.3s',
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center shadow-lg shadow-earth-200 group-hover:scale-110 transition-transform shrink-0">
                                        <Truck size={24} weight="bold" className="text-neutral-800" />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-neutral-800">Frete grátis</span>
                                        <span className="text-sm text-neutral-600">em compras acima de R$50</span>
                                    </div>
                                </div>

                                {/* Benefício 3 */}
                                <div 
                                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group sm:col-span-3 md:col-span-1"
                                    style={{
                                        animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                        animationDelay: '0.4s',
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fresh-mint to-fresh-sky flex items-center justify-center shadow-lg shadow-fresh-mint/30 group-hover:scale-110 transition-transform shrink-0">
                                        <Package size={24} weight="bold" className="text-white" />
                                    </div>
                                    <div className="flex flex-col text-center sm:text-left">
                                        <span className="text-sm font-bold text-neutral-800">Alimentos</span>
                                        <span className="text-sm font-bold text-fresh-mint">frescos & saudáveis</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div 
                            className="flex gap-4"
                            style={{
                                animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                animationDelay: '0.5s',
                                animationFillMode: 'both'
                            }}
                        >
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 sm:flex-initial px-8 py-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:scale-105 active:scale-95 transition-all text-base md:text-lg"
                            >
                                Começar agora
                            </button>
                            
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 sm:flex-initial px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-lg border-2 border-primary-200 hover:border-primary-400 hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-base md:text-lg"
                            >
                                Saiba mais
                            </button>
                        </div>
                    </div>

                    {/* Coluna Direita - Imagem Hero */}
                    <div 
                        className="relative"
                        style={{
                            animation: 'fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            animationDelay: '0.3s',
                            animationFillMode: 'both'
                        }}
                    >
                        {/* Decoração de Fundo */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/40 to-lime-200/40 rounded-3xl blur-3xl -z-10" />
                        
                        {/* Imagem Principal */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={heroImageURL}
                                alt="Refeições saudáveis NutriJá"
                                className="w-full h-auto lg:transform lg:scale-110 lg:translate-x-8"
                                style={{
                                    filter: 'contrast(1.05) saturate(1.1)'
                                }}
                            />
                        </div>

                        {/* Badge Flutuante */}
                        <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 border border-primary-100 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                    <span className="text-2xl">🥗</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-800">+1.000 pedidos</p>
                                    <p className="text-xs text-neutral-600">entregues hoje</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
};

export default Inicio;