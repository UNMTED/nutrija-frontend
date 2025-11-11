import { FaMotorcycle, FaTruck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const heroImageURL =
    "https://ik.imagekit.io/yljuedpj1/Imagem%20Tela%20Apresenta%C3%A7%C3%A3o.png?updatedAt=1762805133474";

const Inicio = () => {
    return (
        <>
            <main className="w-full py-16 md:py-24 overflow-x-hidden">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-10">
                            <div className="text-4xl lg:text-5xl font-medium leading-tight">
                                <h1 className="text-gray-800">
                                    Mais que refeições, entregamos equilíbrio.
                                </h1>
                                <p className="text-gray-600">
                                    Porque cuidar de si
                                    <span className="text-[#88E31F] font-bold">
                                        {" "}
                                        também é um tipo de fome.
                                    </span>
                                </p>
                            </div>

                            <div className="w-full bg-white rounded-xl shadow-lg px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <FaMotorcycle className="text-[#88E31F] text-3xl shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-600 font-medium">
                                            Delivery feito em
                                        </span>
                                        <span className="text-sm text-gray-600 font-medium">
                                            30 minutos
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <FaTruck className="text-[#88E31F] text-3xl shrink-0" />
                                    <span className="text-sm text-gray-600 font-medium">
                                        Frete grátis
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <FiPlusCircle className="text-[#88E31F] text-3xl shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-600 font-medium">
                                            Comidas saudáveis e
                                        </span>
                                        <span className="text-sm text-gray-600 font-medium">
                                            Produtos Frescos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src={heroImageURL}
                                alt="Apresentação da página"
                                className="w-full h-auto md:transform md:scale-110 md:translate-x-12"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Inicio;
