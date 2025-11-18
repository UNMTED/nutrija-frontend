import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
    const data = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-br from-gray-50 to-nutri-green-light/30 border-t border-gray-200">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Coluna 1 - Logo (Ícone com Texto) e Descrição */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/Icon-nutrija.svg"
                                alt="NutriJa"
                            />

                            <span className="text-2xl font-bold">
                                <span className="text-nutri-green-dark">
                                    Nutri
                                </span>
                                <span className="text-nutri-gray">Já</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Alimentação saudável e equilibrada, entregue com
                            carinho na sua porta.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-nutri-gray">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/home"
                                    className="text-sm text-gray-600 hover:text-nutri-green-dark transition-colors"
                                >
                                    Cardápio
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-nutri-gray">
                            Siga-nos
                        </h3>
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-nutri-green-dark hover:border-nutri-green-light hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="LinkedIn"
                            >
                                <LinkedinLogo
                                    size={22}
                                    weight="bold"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="Instagram"
                            >
                                <InstagramLogo
                                    size={22}
                                    weight="bold"
                                />
                            </a>
                            <a
                                href="https://github.com/UNMTED"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#7dd3fc] hover:border-[#6ee7b7]/50 hover:shadow-lg hover:scale-110 transition-all"
                                aria-label="GitHub"
                            >
                                <GithubLogo
                                    size={22}
                                    weight="bold"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Linha de Separação */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            © {data}{" "}
                            <span className="font-bold text-nutri-green-dark">
                                NutriJá
                            </span>
                            . Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-gray-500">
                            Desenvolvido com 💚 por{" "}
                            <span className="font-bold">UNMUTED</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
