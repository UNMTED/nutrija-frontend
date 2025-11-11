import AuthCard from "../../components/FormAuth/AuthForm";

export default function Login() {

    return (
        <div className="flex flex-col">
            <div className="flex-1 flex items-start justify-center relative px-4 mt-20">
                <div className="w-full max-w-4xl  2xl:max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Coluna Esquerda - Texto e Formulário */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="text-center lg:text-left mb-8">
                            {/* Texto com espaçamento Figma (line-height: 50px, letter-spacing: 4%) */}
                            <div
                                className="text-3xl "
                                style={{
                                    letterSpacing: "4%",
                                    lineHeight: "50px",
                                }}
                            >
                                <span className="font-normal text-nutri-gray">
                                    Bem-vindo de volta ao sabor{" "}
                                    <span className="font-bold text-nutri-green">
                                        {" "}
                                        que te faz bem.
                                    </span>
                                </span>
                            </div>
                        </div>


                        {/* Formulário AuthCard  */}
                        <div className="w-full max-w-xs">
                            <AuthCard />
                        </div>
                    </div>

                    {/* Coluna Direita - Imagem */}
                    <div className="hidden lg:block">
                        <img
                            src="https://ik.imagekit.io/yljuedpj1/Imagem%20sanduiche.png?updatedAt=1762805309348"
                            alt="Sanduíche saudável"
                            className="w-full mx-auto object-contain"
                            style={{ maxWidth: "30rem", height: "35rem" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
