import { useContext, useEffect } from "react";
import { FaMotorcycle, FaTruck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
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
        <>
            <main className="w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-x-hidden">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                                <h1 className="text-gray-800">
                                    Mais que refeições, entregamos equilíbrio.
                                </h1>
                                <p className="text-gray-600 mt-2 sm:mt-3">
                                    Porque cuidar de si
                                    <span className="text-[#88E31F] font-bold">
                                        {" "}
                                        também é um tipo de fome.
                                    </span>
                                </p>
                            </div>

                            <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-lg px-4 sm:px-6 py-4 md:py-10 lg:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="flex items-center gap-2 sm:gap-3 justify-start px-10 md:px-0">
                                    <FaMotorcycle className="text-[#88E31F] text-2xl sm:text-3xl shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                            Delivery feito em
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                            30 minutos
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3 justify-start px-10 md:px-0">
                                    <FaTruck className="text-[#88E31F] text-2xl sm:text-3xl shrink-0" />
                                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                        Frete grátis
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3 justify-start px-10 md:px-0 sm:col-span-2 md:col-span-1">
                                    <FiPlusCircle className="text-[#88E31F] text-2xl sm:text-3xl shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                            Comidas saudáveis e
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                            Produtos Frescos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <img
                                src={heroImageURL}
                                alt="Apresentação da página"
                                className="w-full h-auto lg:transform lg:scale-110 lg:translate-x-12"
                            />
                        </div>

                        <div className="relative lg:hidden mt-6 sm:mt-8">
                            <img
                                src={heroImageURL}
                                alt="Apresentação da página"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Inicio;
